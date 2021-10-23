import { Select } from "@chakra-ui/react";
import React, { FC, useContext } from "react";
import { MemberContext } from "./memberContext";

type EditableGuildMemberProps = {
  defaultValue: string;
  onChange: (nextValue: string) => void;
};

export const EditableGuildMember: FC<EditableGuildMemberProps> = (props) => {
  const { guildMembers } = useContext(MemberContext);
  const selectableUserNames = guildMembers.map(guildMembers => guildMembers.userName);
  const setRankWrapper = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.onChange(e.target.value);
  };
  return (
    <Select
    placeholder={props.defaultValue}
    colorScheme={"purple"}
    onChange={setRankWrapper}
  >
    {selectableUserNames.map((selectableUserNames) => (
      <option key={"add-member-rank-" + selectableUserNames}>{selectableUserNames}</option>
    ))}
  </Select>
  );
};
