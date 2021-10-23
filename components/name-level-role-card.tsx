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
  FormControl,
  FormLabel,
  CheckboxGroup,
  SimpleGrid,
  Checkbox,
} from "@chakra-ui/react";
import { Tab, TabList, Tabs } from "@chakra-ui/tabs";
import React, { FC } from "react";
import { SkillTable } from "./skill-tabel";

type props = {
  level: string;
  roles: string;
  playerName: string;
};

export const PlayerNameLevelRole: FC<props> = (props) => {
  return (
    <Box
      backgroundColor={"white"}
      p={12}
      m={4}
      borderRadius={"md"}
      minW={"600px"}
    >
      <Text fontSize={"3xl"} color={"purple.500"}>
        Player name: {props.playerName}
      </Text>
      <Text fontSize={"xl"}>Level: {props.level}</Text>
      <FormControl id="guild-members-role">
        <FormLabel>Member&apos;s role</FormLabel>
        <CheckboxGroup
          colorScheme="purple"
          defaultValue={props.roles.split(",")}
          isDisabled={true}
        >
          <SimpleGrid columns={5}>
            {props.roles.split(",").map((role) => {
              return (
                <Checkbox
                  key={"update-member-" + props.playerName + "-" + role}
                  value={role}
                >
                  {role}
                </Checkbox>
              );
            })}
          </SimpleGrid>
        </CheckboxGroup>
      </FormControl>
    </Box>
  );
};
