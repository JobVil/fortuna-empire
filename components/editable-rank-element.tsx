import { Select } from "@chakra-ui/react";
import React, { FC } from "react";

type EditableRankElementProps = {
  defaultValue?: string;
  onChange: (nextValue: string) => void;
};

export const EditableRankElement: FC<EditableRankElementProps> = (props) => {
  const ranks = ["Settler", "Officer", "Counselor", "Governor"];
  const setRankWrapper = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const rankIndex = ranks.reverse().indexOf(e.target.value);
    if (rankIndex !== -1) {
      props.onChange(String(rankIndex + 1));
    }
  };
  return (
    <Select
      defaultValue={props.defaultValue || ranks[0]}
      colorScheme={"purple"}
      onChange={setRankWrapper}
    >
      {ranks.map((rank) => (
        <option key={"add-member-rank-" + rank}>{rank}</option>
      ))}
    </Select>
  );
};
