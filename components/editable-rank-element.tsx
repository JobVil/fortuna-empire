import { Select } from "@chakra-ui/react";
import React, { FC } from "react";
import { guildRanks } from "../lib/constant";

type EditableRankElementProps = {
  defaultValue?: string;
  onChange: (nextValue: string) => void;
};

export const EditableRankElement: FC<EditableRankElementProps> = (props) => {
  const setRankWrapper = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const rankIndex = guildRanks.reverse().indexOf(e.target.value);
    if (rankIndex !== -1) {
      props.onChange(String(rankIndex + 1));
    }
  };
  return (
    <Select
      defaultValue={props.defaultValue || guildRanks[0]}
      colorScheme={"purple"}
      onChange={setRankWrapper}
    >
      {guildRanks.map((rank) => (
        <option key={"add-member-rank-" + rank}>{rank}</option>
      ))}
    </Select>
  );
};
