import { Select, Td, Tr } from "@chakra-ui/react";
import React, { FC, useContext, useState } from "react";
import { getRankInText } from "../pages/leader";
import { EditableGuildMember } from "./editable-guild-member";
import { EditableRankElement } from "./editable-rank-element";
import { EditableRow } from "./editable-row";
import { GuildMember, MemberContext } from "./memberContext";

type EditableGuildColProps = {
  guildMember: GuildMember;
};

export const EditableGuildCol: FC<EditableGuildColProps> = (props) => {
  const { guildMembers, updateGuildMember } = useContext(MemberContext);

  const onRenameUser = (newName: string) => {
    if (newName) {
      const guildMemberClone = {
        ...props.guildMember,
        ...{ userName: newName },
      };
      updateGuildMember(guildMemberClone);
    }
  };
  const onRenameTitle = (newTile: string) => {
    if (newTile) {
      const guildMemberClone = {
        ...props.guildMember,
        ...{ title: newTile },
      };
      updateGuildMember(guildMemberClone);
    }
  };
  const onRankChange = (newRank: string) => {
    if (newRank) {
      const guildMemberClone = {
        ...props.guildMember,
        ...{ rank: newRank },
      };
      updateGuildMember(guildMemberClone);
    }
  };
  return (
    <>
      <Tr key={props.guildMember.id + "guild-leader-page"}>
        <Td>
          <EditableRow
            defaultValue={props.guildMember.userName}
            onChange={onRenameUser}
          />
        </Td>
        <Td>
          <EditableRow
            defaultValue={props.guildMember.title}
            onChange={onRenameTitle}
          />
        </Td>
        <Td>
          <EditableRankElement
            defaultValue={getRankInText(props.guildMember.rank)}
            onChange={onRankChange}
          />
        </Td>
      </Tr>
    </>
  );
};
