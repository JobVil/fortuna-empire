import React, { FC, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";
import {
  Button,
  Flex,
  Heading,
  ModalContent,
  ModalBody,
  Box,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  useDisclosure,
  ModalFooter,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";

type ModelProps = {
  modalTitle: string;
  triggerBtnText: string;
  closeBtnText: string;
  body: unknown;
  onClose: () => Promise<unknown>;
  onOpen?: () => void;
};

export const CustomModal: FC<ModelProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [errorMsg, setErrorMsg] = useState("");

  const onCloseWrapper = () => {
    setErrorMsg("");
    onClose();
  };
  const onModalAction = () => {
    props
      .onClose()
      .then(() => onCloseWrapper())
      .catch((error) => {
        setErrorMsg(error);
      });
  };

  const openModal = () => {
    onOpen();
    props.onOpen && props.onOpen();
  };

  return (
    <>
      <Button onClick={openModal} colorScheme={"purple"} size={"sm"}>
        {props.triggerBtnText}
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onCloseWrapper}
        colorScheme={"purple"}
        size={"2xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {props.body}
            {errorMsg && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle mr={2}>Unable to add member</AlertTitle>
                <AlertDescription>{errorMsg}</AlertDescription>
                <CloseButton position="absolute" right="8px" top="8px" />
              </Alert>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme={"purple"} mr={3} onClick={onModalAction}>
              {props.closeBtnText}
            </Button>
            <Button variant="ghost" onClick={onCloseWrapper}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
