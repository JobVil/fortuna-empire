import { TabPanel, TabPanels } from "@chakra-ui/react";
import { Tab, TabList, Tabs } from "@chakra-ui/tabs";
import React, { FC } from "react";

export const Main:FC = () => {

  return <Tabs size="md" variant="enclosed" colorScheme="green">
  <TabList>
    <Tab>One</Tab>
    <Tab>Two</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <p>one!</p>
    </TabPanel>
    <TabPanel>
      <p>two!</p>
    </TabPanel>
    <TabPanel>
      <p>three!</p>
    </TabPanel>
  </TabPanels>
  </Tabs>;
}
