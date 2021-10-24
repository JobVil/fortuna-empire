import { cloneDeep } from "lodash";
import React, { createContext, FC, useEffect, useState } from "react";
import queryString from "query-string";

export type TradeSkills = {
  id: string;
  guildMemberId: string;
  name: string;
  level: string;
  numOfCraftingGear: number;
  numOfTrophies: number;
};

export type GuildMember = {
  id: string;
  userName: string;
  title: string;
  role?: string;
  rank: string;
  level: string;
  discordName: string;
  tradeSkills?: TradeSkills[];
};

export type ExposedGuildMember = Omit<GuildMember, "id">;

export type MemberContextValue = {
  guildMembers: GuildMember[];
  addGuildMember: (member: ExposedGuildMember) => void;
  updateGuildMember: (member: GuildMember) => void;
  upsertTradeSkills: (tradeSkills: TradeSkills[]) => void;
};

const defaultMembers = {
  id: "ckv2ss4dg0019d6m0922fl977",
  userName: "Redhorn70",
  title: "Crafter Officer #2",
  role: "PVE,Gatherer,Healer,Crafter",
  rank: "3",
  level: "60",
  discordName: "Redhorn70",
  tradeSkills: [],
};

export const MemberContext = createContext<MemberContextValue>({
  guildMembers: [defaultMembers],
} as MemberContextValue);

export const MemberContextProvider: FC = (props) => {
  const [guildMembers, setGuildMembers] = useState<GuildMember[]>([]);
  const tempId = "FakeId";
  const fetchUser = async () => {
    fetch("api/prisma/get", { method: "GET" })
      .then((data) => {
        data
          .json()
          .then((data2) => {
            setGuildMembers(data2);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addMemberInDb = async (member: ExposedGuildMember) => {
    fetch("api/prisma/add-guildmember", {
      method: "POST",
      body: queryString.stringify(member),
    })
      .then((data) => {
        data
          .json()
          .then((updateGuildMember) => {
            setGuildMembers((guildMembers) => {
              const newGuildMembers = cloneDeep(
                guildMembers.filter(
                  (guildMembers) => guildMembers.id !== tempId
                )
              );
              newGuildMembers.push(updateGuildMember);
              return newGuildMembers;
            });
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateGuildMemberInDB = async (member: GuildMember) => {
    try {
      fetch("api/prisma/update-guildmember", {
        method: "POST",
        body: queryString.stringify(member),
      })
        .then((data) => {
          data
            .json()
            .then((updateGuildMember) => {
              setGuildMembers((guildMembers) => {
                const newGuildMembers = guildMembers.map((guildMember) =>
                  guildMember.id === updateGuildMember.id
                    ? updateGuildMember
                    : guildMember
                );
                return newGuildMembers;
              });
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const updateGuildMember = (member: GuildMember) => {
    try {
      updateGuildMemberInDB(member);
      setGuildMembers((guildMembers) => {
        const newGuildMembers = guildMembers.map((guildMember) =>
          guildMember.id === member.id ? member : guildMember
        );
        return newGuildMembers;
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const addGuildMember = (member: ExposedGuildMember) => {
    try {
      addMemberInDb(member);
      setGuildMembers((guildMembers) => {
        const newGuildMembers = cloneDeep(guildMembers);
        const newMember = { ...{ id: tempId }, ...member };
        newGuildMembers.push(newMember);
        return newGuildMembers;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const upsertTradeSkills = (tradeSkills: TradeSkills[]) => {
    try {
      tradeSkills.forEach((skill) => {
        fetch("api/prisma/upsert-trade-skills", {
          method: "POST",
          body: queryString.stringify(skill),
        }).then((data) => {
          data.json().then((guildMember) => {
            const guildMemberCastedObject = guildMember as GuildMember;
            setGuildMembers((guildMembers) => {
              const newGuildMembers = guildMembers.map((guildMember) => {
                if (guildMember.id === guildMemberCastedObject.id) {
                  guildMember.tradeSkills = guildMemberCastedObject.tradeSkills;
                }
                return guildMember;
              });
              return newGuildMembers;
            });
          });
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MemberContext.Provider
      value={{
        guildMembers,
        addGuildMember,
        updateGuildMember,
        upsertTradeSkills,
      }}
    >
      {props.children}
    </MemberContext.Provider>
  );
};
