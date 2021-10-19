import {
  Box,
  Table,
  TabPanel,
  TabPanels,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
} from "@chakra-ui/react";
import { Tab, TabList, Tabs } from "@chakra-ui/tabs";
import React, { FC } from "react";
import { SkillTable } from "./skill-tabel";

type Skills = {
  skillName: string;
  level: string;
  trophies: number;
  craftingGear: number;
};

type props = {
  skills: Skills[];
  playerName: string;
};

export const Crafter: FC<props> = (props) => {
  return (
    <Box backgroundColor={"white"} p={12} m={4} borderRadius={"md"}>
      <Text fontSize={"3xl"} color={"purple.500"}>
        Player name: {props.playerName}
      </Text>
      <Text fontSize={"xl"}>TOP SKILLS</Text>
      <SkillTable id={props.playerName} skills={props.skills} />
    </Box>
  );
};
