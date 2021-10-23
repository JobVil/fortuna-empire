import {
  Table,
  TabPanel,
  TabPanels,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Tab, TabList, Tabs } from "@chakra-ui/tabs";
import React, { FC } from "react";
import { TradeSkills } from "./memberContext";

type props = {
  skills: TradeSkills[];
  id: string;
};

export const SkillTable: FC<props> = (props) => {
  return (
    <Table
      variant="striped"
      colorScheme="purple"
      background={"gray.100"}
      borderBottomRadius={"md"}
    >
      <Thead>
        <Tr>
          <Th>Crafting Skill</Th>
          <Th>Level</Th>
          <Th>Crafting Gear</Th>
          <Th>Trophies</Th>
        </Tr>
      </Thead>
      <Tbody>
        {props.skills.map((skill) => (
          <Tr key={props.id + skill.name}>
            <Td>{skill.name}</Td>
            <Td>{skill.level}</Td>
            <Td>{`${skill.numOfCraftingGear}/6`}</Td>
            <Td>{`${skill.numOfTrophies}/3`}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
