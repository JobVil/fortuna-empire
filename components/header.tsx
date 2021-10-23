import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { CustomModal } from "./modal";
import { AddMemberForm } from "./add-member";

const Header: React.FC = () => {
  const { data: session } = useSession();
  const loginBtn = (
    <Button colorScheme="purple" size="md" onClick={() => signIn()}>
      Log in
    </Button>
  );

  const userInfo = (
    <Heading size="sm" marginRight={4}>
      {session?.user.name} ({session?.user.email})
    </Heading>
  );

  const logoutBtn = (
    <Button colorScheme="purple" onClick={() => signOut()}>
      <a>Log out</a>
    </Button>
  );

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"space-between"}
      w={"85vw"}
      marginBottom={10}
    >
      <Head>
        <title>Fortuna Empire - New World</title>
      </Head>
      <Flex alignItems={"center"}>{session && <AddMemberForm />}</Flex>
      <Flex alignItems={"center"}>
        {!session && loginBtn}
        {session && (
          <>
            {userInfo}
            {logoutBtn}
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
