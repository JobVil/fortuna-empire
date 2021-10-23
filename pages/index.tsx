import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import React from 'react';
import { Main } from '../components/main';
import { Box, Container, Flex, Heading, HStack, Stack } from '@chakra-ui/layout';
import { Button, PinInput, PinInputField, Text } from '@chakra-ui/react';
import Router from 'next/router';
import Layout from '../components/layout';

export const onClick = (route: string) => {
	Router.push(route);
};

export default function Home() {
	return (
		<Layout>
			<Heading mb={10} size={'4xl'}>
				Welcome To Fortuna Empire!
			</Heading>
			<Heading mb={10} size={'2xl'}>
				The Kingdom of the lucky
			</Heading>
			<Container maxW="container.lg" mb={10}>
				<Heading mb={5} size={'sm'} textAlign={'center'}>
					A little about us
				</Heading>
				<Text fontSize="lg" textAlign={'center'}>
					Originally we were a guild that came from a game called Chronichles of Elyria. We were the kingdom of the
					lucky called Fortuna. A small community of us have hopped over the years as the game fell through, and the
					company disbanded, and we have come back together as a guild after a long time. We are veterans of gaming, and
					have been working hard to be a competitive guild, but one that is kind to one another. We love our casual
					folks who have a life, and longer work hours or familys ,and we are devoted to just have fun in games. We play
					to win, but we play to have fun as well. If you join us here your joining a family of players who might be a
					bit rough around the edges, but ones that will have your back through thick, and thin.
				</Text>
			</Container>
			<Stack>
				<HStack>
					<Button w={'200px'} h={'200px'} onClick={() => onClick('/leader')} colorScheme={'purple'}>
						Leadership
					</Button>
					<Button w={'200px'} h={'200px'} onClick={() => onClick('/war')} colorScheme={'purple'}>
						War
					</Button>
					<Button w={'200px'} h={'200px'} onClick={() => onClick('/crafters')} colorScheme={'purple'}>
						Crafter&apos;s
					</Button>
					<Button w={'200px'} h={'200px'} onClick={() => onClick('/gathers')} colorScheme={'purple'}>
						Gathers
					</Button>
					<Button w={'200px'} h={'200px'} onClick={() => onClick('/refiners')} colorScheme={'purple'}>
						Refiners
					</Button>
				</HStack>
				<HStack>
					<Button w={'200px'} h={'200px'} onClick={() => onClick('/pvp')} colorScheme={'purple'}>
						PVP Members
					</Button>
					<Button w={'200px'} h={'200px'} onClick={() => onClick('/pve')} colorScheme={'purple'}>
						PVE Members
					</Button>

					<Button w={'200px'} h={'200px'} colorScheme={'purple'}>
						*TBD
					</Button>
					<Button w={'200px'} h={'200px'} colorScheme={'purple'}>
						*TBD
					</Button>
					<Button w={'200px'} h={'200px'} colorScheme={'purple'}>
						*TBD
					</Button>
				</HStack>
			</Stack>
		</Layout>
	);
}
