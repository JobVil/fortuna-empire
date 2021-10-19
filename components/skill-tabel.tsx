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

type Skills = {
  skillName: string;
  level: string;
  trophies: number;
  craftingGear: number;
};

type props = {
  skills: Skills[];
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
          <Tr key={props.id + skill.skillName}>
            <Td>{skill.skillName}</Td>
            <Td>{skill.level}</Td>
            <Td>{`${skill.craftingGear}/6`}</Td>
            <Td>{`${skill.craftingGear}/6`}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
