import Link from 'next/link';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { Heading, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, Flex, Button } from '@chakra-ui/react';

type TradeSkills = {
	id: string;
	guildMemberId: string;
	name: string;
	level: string;
	numOfCraftingGear: number;
	numOfTrophies: number;
};

type GuildMember = {
	id: string;
	userName: string;
	title: string;
	role?: string;
	rank: string;
	tradeSkills?: TradeSkills[];
};

export default function Leadership() {
	const [guildLeaders, setGuildLeaders] = useState<GuildMember[]>([]);
	useEffect(() => {
		fetch('api/prisma/get', { method: 'GET' }).then((data) => {
			data.json().then((data2) => {
				console.log(data2);
				console.log(Object.entries(data2));
				setGuildLeaders(data2);
			});
		});
	}, []);

	const getRankInText = (rank: string) => {
		switch (rank) {
			case '4':
				return 'member';
			case '3':
				return 'Officer';
			case '2':
				return 'Counselor';
			case '1':
				return 'Guild Master';
			default:
				return 'guest';
		}
	};
	return (
		<>
			<Flex height={'100vh'} alignItems={'start'} justifyContent={'center'} background={'gray.800'}>
				<Button m={'10'}>
					<Link href="/">
						<a>Back to home</a>
					</Link>
				</Button>
				<Flex direction={'column'} p={12} rounded={6} alignItems={'center'} justifyContent={'center'}>
					<Heading mb={10} size={'2xl'}>
						Company Leaders
					</Heading>
					<Table variant="striped" colorScheme="purple" background={'gray.100'} borderBottomRadius={'md'}>
						<TableCaption placement={'top'} background={'gray.100'} borderTopRadius={'md'}>
							Company Leaders
						</TableCaption>
						<Thead>
							<Tr>
								<Th>Game Name</Th>
								<Th>Title</Th>
								<Th>Rank</Th>
							</Tr>
						</Thead>
						<Tbody>
							{guildLeaders.map((guildLeader) => {
								return (
									<Tr key={guildLeader.id + 'guild-leader-page'}>
										<Td>{guildLeader.userName}</Td>
										<Td>{guildLeader.title}</Td>
										<Td>{getRankInText(guildLeader.rank)}</Td>
									</Tr>
								);
							})}
						</Tbody>
						<Tfoot>
							<Tr>
								<Th>Game Name</Th>
								<Th>Role</Th>
								<Th>Rank</Th>
							</Tr>
						</Tfoot>
					</Table>
				</Flex>
			</Flex>
		</>
	);
}
