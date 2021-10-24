import { GuildMember } from ".prisma/client";
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
  Table,
  TableCaption,
  TabPanel,
  TabPanels,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Tab, TabList, Tabs } from "@chakra-ui/tabs";
import React, { FC, useContext, useState } from "react";
import { crafting, gathering, refining } from "../lib/constant";
import { EditableGuildMember } from "./editable-guild-member";
import { EditableRankElement } from "./editable-rank-element";
import { EditableRow } from "./editable-row";
import {
  ExposedGuildMember,
  MemberContext,
  TradeSkills,
} from "./memberContext";
import { CustomModal } from "./modal";

type skill = {
  [key: string]: {
    level: string;
    numOfCraftingGear: number;
    numOfTrophies: number;
  };
};

type SimpleGridTradeSkills = Omit<TradeSkills, "id">;

export const AddMemberSkillsForm: FC = () => {
  const { guildMembers, upsertTradeSkills } = useContext(MemberContext);
  const [userName, setUserName] = useState<string>(
    guildMembers[0]?.userName || ""
  );
  const [updatedSkills, setUpdatedSkills] = useState<skill>({});
  const skills = [...crafting, ...gathering, ...refining];
  const existingTradeSkillObjMain: { [key in string]: TradeSkills } = {};
  guildMembers
    ?.filter((gm) => gm.userName === userName)[0]
    ?.tradeSkills.forEach((existingTradeSkill) => {
      existingTradeSkillObjMain[existingTradeSkill.name] = {
        ...existingTradeSkill,
      };
    });

  const onAddMemberSkills = async () => {
    try {
      const editEditingGuildMember = guildMembers.filter(
        (guildMember) => guildMember.userName === userName
      )[0];
      if (!editEditingGuildMember) {
        return new Promise((resolve, reject) => {
          return reject("unable to update member");
        });
      }
      const existingTradeSkillObj: { [key in string]: { id: string } } = {};
      editEditingGuildMember.tradeSkills.forEach((existingTradeSkill) => {
        existingTradeSkillObj[existingTradeSkill.name] = {
          id: existingTradeSkill.id,
        };
      });
      const newTradeSkills = Object.keys(updatedSkills).map(
        (skill): SimpleGridTradeSkills | TradeSkills => {
          if (existingTradeSkillObj[skill]) {
            return {
              id: existingTradeSkillObj[skill].id,
              guildMemberId: editEditingGuildMember.id,
              name: skill,
              level: updatedSkills[skill].level || "0",
              numOfCraftingGear: updatedSkills[skill].numOfCraftingGear || 0,
              numOfTrophies: updatedSkills[skill].numOfTrophies || 0,
            };
          }
          return {
            guildMemberId: editEditingGuildMember.id,
            name: skill,
            level: updatedSkills[skill].level || "0",
            numOfCraftingGear: updatedSkills[skill].numOfCraftingGear || 0,
            numOfTrophies: updatedSkills[skill].numOfTrophies || 0,
          };
        }
      ) as TradeSkills[];
      upsertTradeSkills(newTradeSkills);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CustomModal
      modalTitle={"Add Member's Skills"}
      closeBtnText={"Add Skills"}
      triggerBtnText={"Add Member's Skills"}
      onClose={onAddMemberSkills}
      body={
        <Container
          colorScheme={"purple"}
          backgroundColor={"white"}
          p={12}
          m={4}
          borderRadius={"md"}
        >
          <Table
            variant="striped"
            colorScheme="purple"
            background={"gray.100"}
            borderBottomRadius={"md"}
          >
            <TableCaption placement={"top"}>
              <EditableGuildMember
                defaultValue={userName || ""}
                onChange={setUserName}
              />
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Crafting Skill</Th>
                <Th>Level</Th>
                <Th>Crafting Gear</Th>
                <Th>Trophies</Th>
              </Tr>
            </Thead>
            <Tbody>
              {skills.map((skill) => (
                <Tr key={skill + "adding-skill-model" + userName}>
                  <Td>{skill}</Td>
                  <Td>
                    <EditableRow
                      defaultValue={
                        existingTradeSkillObjMain[skill]?.level || "0"
                      }
                      onChange={(newLevel) =>
                        setUpdatedSkills((updatedSkills) => {
                          updatedSkills[skill] = {
                            ...updatedSkills[skill],
                            ...{ level: newLevel },
                          };
                          return updatedSkills;
                        })
                      }
                    />
                  </Td>
                  <Td>
                    <EditableRow
                      defaultValue={
                        existingTradeSkillObjMain[skill]?.numOfCraftingGear ||
                        "0"
                      }
                      onChange={(newGearNumber) =>
                        setUpdatedSkills((updatedSkills) => {
                          updatedSkills[skill] = {
                            ...updatedSkills[skill],
                            ...{ numOfCraftingGear: Number(newGearNumber) },
                          };
                          return updatedSkills;
                        })
                      }
                    />
                    /6
                  </Td>
                  <Td>
                    <EditableRow
                      defaultValue={
                        existingTradeSkillObjMain[skill]?.numOfTrophies || "0"
                      }
                      onChange={(newTrophiesNumber) =>
                        setUpdatedSkills((updatedSkills) => {
                          updatedSkills[skill] = {
                            ...updatedSkills[skill],
                            ...{ numOfTrophies: Number(newTrophiesNumber) },
                          };
                          return updatedSkills;
                        })
                      }
                    />
                    /3
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Container>
      }
    />
  );
};
