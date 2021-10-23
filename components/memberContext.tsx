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
  tradeSkills?: TradeSkills[];
};

export type ExposedGuildMember = Omit<GuildMember, "id">;

export type MemberContextValue = {
  guildMembers: GuildMember[];
  addGuildMember: (member: ExposedGuildMember) => void;
  updateGuildMember: (member: GuildMember) => void;
  upsertTradeSkills: (tradeSkills: TradeSkills[]) => void;
};

export const MemberContext = createContext<MemberContextValue>(
  {} as MemberContextValue
);

export const MemberContextProvider: FC = (props) => {
  const [guildMembers, setGuildMembers] = useState<GuildMember[]>([]);
  const tempId = "FakeId";
  const fetchUser = () => {
    fetch("api/prisma/get", { method: "GET" }).then((data) => {
      data.json().then((data2) => {
        setGuildMembers(data2);
      });
    });
  };

  const addMemberInDb = async (member: ExposedGuildMember) => {
    fetch("api/prisma/add-guildmember", {
      method: "POST",
      body: queryString.stringify(member),
    }).then((data) => {
      data.json().then((updateGuildMember) => {
        setGuildMembers((guildMembers) => {
          const newGuildMembers = cloneDeep(
            guildMembers.filter((guildMembers) => guildMembers.id !== tempId)
          );
          newGuildMembers.push(updateGuildMember);
          return newGuildMembers;
        });
      });
    });
  };

  const updateGuildMemberInDB = async (member: GuildMember) => {
    fetch("api/prisma/update-guildmember", {
      method: "POST",
      body: queryString.stringify(member),
    }).then((data) => {
      data.json().then((updateGuildMember) => {
        setGuildMembers((guildMembers) => {
          const newGuildMembers = guildMembers.map((guildMember) =>
            guildMember.id === updateGuildMember.id
              ? updateGuildMember
              : guildMember
          );
          return newGuildMembers;
        });
      });
    });
  };

  const updateGuildMember = (member: GuildMember) => {
    updateGuildMemberInDB(member);
    setGuildMembers((guildMembers) => {
      const newGuildMembers = guildMembers.map((guildMember) =>
        guildMember.id === member.id ? member : guildMember
      );
      return newGuildMembers;
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const addGuildMember = (member: ExposedGuildMember) => {
    addMemberInDb(member);
    setGuildMembers((guildMembers) => {
      const newGuildMembers = cloneDeep(guildMembers);
      const newMember = { ...{ id: tempId }, ...member };
      newGuildMembers.push(newMember);
      return newGuildMembers;
    });
  };

  const upsertTradeSkills = (tradeSkills: TradeSkills[]) => {
    setGuildMembers((guildMembers) => {
      const newGuildMembers = cloneDeep(guildMembers).map((guildMember) => {
        if (guildMember.id === tradeSkills[0].guildMemberId) {
          guildMember.tradeSkills = tradeSkills;
        }
        return guildMember;
      });
      return newGuildMembers;
    });
    tradeSkills.forEach((skill) => {
      fetch("api/prisma/upsert-trade-skills", {
        method: "POST",
        body: queryString.stringify(skill),
      });
    });
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
