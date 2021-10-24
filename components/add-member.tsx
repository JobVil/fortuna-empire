import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Container,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  SimpleGrid,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { Tab, TabList, Tabs } from "@chakra-ui/tabs";
import React, { FC, useContext, useState } from "react";
import { guildRanks, memberRoles } from "../lib/constant";
import { EditableRankElement } from "./editable-rank-element";
import { ExposedGuildMember, MemberContext } from "./memberContext";
import { CustomModal } from "./modal";

export const AddMemberForm: FC = () => {
  const { guildMembers, addGuildMember } = useContext(MemberContext);
  const [userName, setUserName] = useState<string>();
  const [rank, setRank] = useState<string>(guildRanks[0]);
  const [title, setTitle] = useState<string>();
  const [roles, setRoles] = useState<string[]>();
  const [level, setLevel] = useState<string>("0");

  const onAddMemberClick = async () => {
    try {
      if (!rank || !userName) {
        return new Promise((resolve, reject) => {
          return reject("Username and Rank are required");
        });
      }

      const guildMemberWithThisUsername = guildMembers.filter(
        (guildMember) =>
          guildMember.userName.toLocaleLowerCase() ===
          userName.trim().toLocaleLowerCase()
      );

      if (guildMemberWithThisUsername.length > 0) {
        return new Promise((resolve, reject) => {
          return reject("member with that name already exists");
        });
      }
      const guildMember: ExposedGuildMember = {
        userName: userName.trim(),
        rank,
        title,
        level,
        discordName: "",
        role: roles?.join(",") || "",
      };
      addGuildMember(guildMember);
      setUserName("");
      setRank(null);
      setTitle(null);
      setLevel(null);
      setRoles(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CustomModal
      modalTitle={"Add Member"}
      closeBtnText={"Add member"}
      triggerBtnText={"Add New Member"}
      onClose={onAddMemberClick}
      body={
        <Container
          colorScheme={"purple"}
          backgroundColor={"white"}
          p={12}
          m={4}
          borderRadius={"md"}
        >
          <FormControl id="guild-members-name" isRequired marginBottom={3}>
            <FormLabel>Member&apos;s game name</FormLabel>
            <Input
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Member's Name"
            />
          </FormControl>
          <FormControl id="guild-members-rank" isRequired marginBottom={3}>
            <FormLabel>Member&apos;s Rank</FormLabel>
            <EditableRankElement onChange={setRank} />
          </FormControl>
          <FormControl id="guild-members-title" marginBottom={3}>
            <FormLabel>Member&apos;s title</FormLabel>
            <Input
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Recruiting officer"
            />
          </FormControl>
          <FormControl id="guild-members-level" marginBottom={3}>
            <FormLabel>Member&apos;s level</FormLabel>
            <Input
              onChange={(e) => setLevel(e.target.value)}
              placeholder="ex: 60"
            />
          </FormControl>
          <FormControl id="guild-members-role">
            <FormLabel>Member&apos;s role</FormLabel>
            <CheckboxGroup
              colorScheme="purple"
              onChange={(e) => setRoles(e as string[])}
            >
              <SimpleGrid columns={5}>
                {memberRoles.map((role) => {
                  return (
                    <Checkbox
                      key={"add-member-" + userName + "-" + role}
                      value={role}
                    >
                      {role}
                    </Checkbox>
                  );
                })}
              </SimpleGrid>
            </CheckboxGroup>
          </FormControl>
        </Container>
      }
    />
  );
};
