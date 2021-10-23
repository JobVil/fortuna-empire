import Link from "next/link";
import Head from "next/head";
import React, { FC, useContext, useEffect, useState } from "react";
import {
  Heading,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Flex,
  Button,
  UnorderedList,
  ListItem,
  Text,
  Box,
} from "@chakra-ui/react";
import TradeSkills from "./tradeskills";
import { SkillTable } from "../components/skill-tabel";
import { Crafter } from "../components/crafter";
import Layout from "../components/layout";
import { AddMemberForm } from "../components/add-member";
import { useSession } from "next-auth/react";
import { GuildMember, MemberContext } from "../components/memberContext";
import ReactTags from "react-tag-autocomplete";
import { crafting, gathering, refining, memberRoles } from "../lib/constant";
import { AddMemberSkillsForm } from "../components/add-member-skils";
import { UpdateMemberRoleForm } from "../components/update-members-role";
import { PlayerNameLevelRole } from "../components/name-level-role-card";

type tag = { id: number; name: string };
type TableProps = {
  defaultTags?: tag[];
};

const doesArraysIntersection = (array1: string[], array2: string[]) =>
  array1.filter((item1) => array2.includes(item1)).length > 0;

const applyFilterToMembers = (filters: tag[], guildMembers: GuildMember[]) => {
  const memberNames = guildMembers.map((member) => member.userName);
  const tradeSkillFilter = filters
    .filter(
      (filter) =>
        crafting.includes(filter.name) ||
        gathering.includes(filter.name) ||
        refining.includes(filter.name)
    )
    .map((filter) => filter.name);
  const roleFilters = filters
    .filter((filter) => memberRoles.includes(filter.name))
    ?.map((filter) => filter.name);
  const playerNames = filters.filter((filter) =>
    memberNames.includes(filter.name)
  );
  const appliedFilter = guildMembers.filter((member) => {
    if (playerNames.length > 0 && roleFilters.length > 0) {
      return (
        memberNames.includes(member.userName) &&
        doesArraysIntersection(roleFilters, member.role?.split(",") || [])
      );
    } else if (playerNames.length > 0) {
      return memberNames.includes(member.userName);
    } else if (roleFilters.length > 0) {
      return doesArraysIntersection(roleFilters, member.role?.split(",") || []);
    } else if (tradeSkillFilter.length > 0) {
      return (
        !!member.tradeSkills &&
        member.tradeSkills.filter((skill) =>
          tradeSkillFilter.includes(skill.name)
        ).length > 0
      );
    } else {
      return true;
    }
  });

  if (tradeSkillFilter.length > 0) {
    return appliedFilter
      .sort((a, b) => {
        const valueA = a
          .tradeSkills!.filter((skill) => tradeSkillFilter.includes(skill.name))
          .map((skill) => Number(skill.level))
          .reduce((accum, value) => accum + value);
        const valueB = b
          .tradeSkills!.filter((skill) => tradeSkillFilter.includes(skill.name))
          .map((skill) => Number(skill.level))
          .reduce((accum, value) => accum + value);
        console.log(valueA, valueB);
        if (valueA > valueB) {
          return -1;
        } else {
          return 1;
        }
      })
      .map((members, index) => {
        return (
          <Crafter
            key={members.userName + "tradeSkill-in-serach" + index}
            playerName={members.userName}
            skills={members.tradeSkills!.filter((skill) =>
              tradeSkillFilter.includes(skill.name)
            )}
          />
        );
      });
  } else {
    return appliedFilter.map((members, index) => {
      return (
        <PlayerNameLevelRole
          key={members.userName + "player-infor-in-serach" + index}
          level={members.level}
          playerName={members.userName}
          roles={members.role || ""}
        />
      );
    });
  }
};

export const GuildMemberTables: FC<TableProps> = (props) => {
  const { data: session } = useSession();
  const { guildMembers } = useContext(MemberContext);
  const [tags, setTags] = useState<tag[]>(props.defaultTags || []);
  const [suggestTags, setSuggestedTags] = useState<tag[]>([]);
  useEffect(() => {
    const guildMembersUsernames = guildMembers.map(
      (guildMember) => guildMember.userName
    );
    const defaultTags: tag[] = [];
    crafting.forEach((craft) => {
      defaultTags.push({ id: defaultTags.length, name: craft });
    });
    gathering.forEach((gather) => {
      defaultTags.push({ id: defaultTags.length, name: gather });
    });
    refining.forEach((refine) => {
      defaultTags.push({ id: defaultTags.length, name: refine });
    });
    memberRoles.forEach((role) => {
      defaultTags.push({ id: defaultTags.length, name: role });
    });
    guildMembersUsernames.forEach((userName) => {
      defaultTags.push({ id: defaultTags.length, name: userName });
    });
    setSuggestedTags(defaultTags);
  }, []);

  useEffect(() => console.log("re-render"));
  return (
    <>
      <Flex w={"625px"} justifyContent={"space-between"}>
        <Flex w={"100%"}>
          <Box
            backgroundColor={"white"}
            w={"100%"}
            p={2}
            m={2}
            borderRadius={"md"}
          >
            <ReactTags
              tags={tags}
              suggestions={suggestTags}
              onDelete={(oldTag) => {
                setTags((tags) => {
                  tags.splice(oldTag as number, 1);
                  const newTag = [...tags];
                  return newTag;
                });
              }}
              onAddition={(newTag) => {
                setTags((tag) => {
                  tag.push(newTag);
                  const newTagArray = [...tag];
                  return newTagArray;
                });
              }}
            />
          </Box>
        </Flex>
        {session && (
          <Flex direction={"column"} w={"140px"} alignSelf={"center"}>
            <Box marginBottom={2}>
              {guildMembers && <AddMemberSkillsForm />}
            </Box>
            <Box>{guildMembers && <UpdateMemberRoleForm />}</Box>
          </Flex>
        )}
      </Flex>
      <Flex
        direction={"column"}
        p={12}
        rounded={6}
        alignItems={"center"}
        justifyContent={"center"}
        h={"100%"}
      >
        {applyFilterToMembers(tags, guildMembers)}
      </Flex>
    </>
  );
};
