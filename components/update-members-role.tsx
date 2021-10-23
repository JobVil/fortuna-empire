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
  Spinner,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { Tab, TabList, Tabs } from "@chakra-ui/tabs";
import React, { FC, useContext, useEffect, useState } from "react";
import { memberRoles } from "../lib/constant";
import { getRankInText } from "../pages/leader";
import { EditableGuildMember } from "./editable-guild-member";
import { EditableRankElement } from "./editable-rank-element";
import { ExposedGuildMember, MemberContext } from "./memberContext";
import { CustomModal } from "./modal";

export const UpdateMemberRoleForm: FC = () => {
  const { guildMembers, updateGuildMember } = useContext(MemberContext);
  const [userName, setUserName] = useState<string>(
    guildMembers[0]?.userName || ""
  );
  const activeGuildMember = guildMembers.filter(
    (guildMember) => guildMember.userName === userName
  )[0];
  const [rank, setRank] = useState<string>(null);
  const [title, setTitle] = useState<string>(null);
  const [level, setLevel] = useState<string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [roles, setRoles] = useState<string[]>(null);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  }, [userName]);

  const onAddMemberClick = async () => {
    if (!activeGuildMember || !activeGuildMember.rank) {
      return new Promise((resolve, reject) => {
        return reject("unable to update this user");
      });
    }
    if (level) {
      activeGuildMember.level = level;
    }
    if (rank) {
      activeGuildMember.rank = rank;
    }
    if (title) {
      activeGuildMember.title = title;
    }
    if (roles !== null) {
      activeGuildMember.role = roles.join(",");
    }

    updateGuildMember(activeGuildMember);
  };

  return (
    <CustomModal
      modalTitle={"Update Member"}
      closeBtnText={"Update Member"}
      triggerBtnText={"Update Members Role"}
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
            <EditableGuildMember
              defaultValue={userName || ""}
              onChange={setUserName}
            />
          </FormControl>
          {isLoading ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="purple.500"
              size="xl"
            />
          ) : (
            <>
              <FormControl id="guild-members-rank" isRequired marginBottom={3}>
                <FormLabel>Member&apos;s Rank</FormLabel>
                <EditableRankElement
                  defaultValue={getRankInText(activeGuildMember?.rank || "4")}
                  onChange={setRank}
                />
              </FormControl>
              <FormControl id="guild-members-title" marginBottom={3}>
                <FormLabel>Member&apos;s title</FormLabel>
                <Input
                  key={"update-member-" + userName + "-title"}
                  defaultValue={activeGuildMember?.title || "4"}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
              <FormControl id="guild-members-level" marginBottom={3}>
                <FormLabel>Member&apos;s level</FormLabel>
                <Input
                  defaultValue={activeGuildMember?.level || "0"}
                  onChange={(e) => setLevel(e.target.value)}
                />
              </FormControl>
              <FormControl id="guild-members-role">
                <FormLabel>Member&apos;s role</FormLabel>
                <CheckboxGroup
                  colorScheme="purple"
                  onChange={(e) => setRoles(e as string[])}
                  defaultValue={activeGuildMember?.role?.split(",") || []}
                >
                  <SimpleGrid columns={5}>
                    {memberRoles.map((role) => {
                      return (
                        <Checkbox
                          key={"update-member-" + userName + "-" + role}
                          value={role}
                        >
                          {role}
                        </Checkbox>
                      );
                    })}
                  </SimpleGrid>
                </CheckboxGroup>
              </FormControl>
            </>
          )}
        </Container>
      }
    />
  );
};
