import { Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Header from "./header";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div>
    <Flex
      minH={"100vh"}
      maxH={"100%"}
      alignItems={"start"}
      justifyContent={"center"}
      background={"gray.800"}
    >
      <Flex
        direction={"column"}
        p={12}
        rounded={6}
        alignItems={"center"}
        justifyContent={"center"}
        textColor={"purple.500"}
        minWidth={"4xl"}
      >
        <Header />
        {props.children}
      </Flex>
    </Flex>
  </div>
);

export default Layout;
