import Link from 'next/link';
import Head from 'next/head';
import React from 'react';
import { Heading, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, Flex, Button } from '@chakra-ui/react';

export default function Leadership() {
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
								<Th>Role</Th>
								<Th>Rank</Th>
							</Tr>
						</Thead>
						<Tbody>
							<Tr>
								<Td>PvPr</Td>
								<Td>Commander and chef</Td>
								<Td>Guild Leader</Td>
							</Tr>
							<Tr>
								<Td>RayningMist-healz</Td>
								<Td>Treasurer and Task Master</Td>
								<Td>Counselor</Td>
							</Tr>
							<Tr>
								<Td>MrWakeField</Td>
								<Td>1st Crafting Lead</Td>
								<Td>Counselor</Td>
							</Tr>
							<Tr>
								<Td>Joemadly</Td>
								<Td>Recruitment</Td>
								<Td>Officer</Td>
							</Tr>
							<Tr>
								<Td>Redhorn70</Td>
								<Td>2st Crafting Lead</Td>
								<Td>Officer</Td>
							</Tr>
							<Tr>
								<Td>Loewar</Td>
								<Td>PVE & Guild Diplomat</Td>
								<Td>Officer</Td>
							</Tr>
							<Tr>
								<Td>Graysus</Td>
								<Td>Guild Diplomat</Td>
								<Td>Officer</Td>
							</Tr>
							<Tr>
								<Td>Dakotax602</Td>
								<Td>PVP</Td>
								<Td>Officer</Td>
							</Tr>
							<Tr>
								<Td>Poptart</Td>
								<Td>PVP</Td>
								<Td>Officer</Td>
							</Tr>
							<Tr>
								<Td>Narbondel</Td>
								<Td>Raid</Td>
								<Td>Officer</Td>
							</Tr>
							<Tr>
								<Td>GreenVeggie</Td>
								<Td>General</Td>
								<Td>Officer</Td>
							</Tr>
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
