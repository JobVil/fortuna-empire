import Link from 'next/link';
import Head from 'next/head';
import React, { useContext, useEffect, useState } from 'react';
import { Heading, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, Flex, Button } from '@chakra-ui/react';
import Layout from '../components/layout';
import { ExposedGuildMember, MemberContext } from '../components/memberContext';
import { useSession } from 'next-auth/react';
import { EditableGuildCol } from '../components/editable-leader-col';
import { EditIcon, SmallAddIcon } from '@chakra-ui/icons';

export const getRankInText = (rank: string) => {
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

export default function Leadership() {
	const { data: session } = useSession();
	const { guildMembers } = useContext(MemberContext);
	const [isEditing, setIsEditing] = useState(false);
	const guildLeaders = guildMembers.filter((member) => Number(member.rank) <= 3);

	return (
		<>
			<Layout>
				<Button>
					<Link href="/">
						<a>Back to home</a>
					</Link>
				</Button>

				<Flex direction={'column'} p={12} rounded={6} alignItems={'center'} justifyContent={'center'}>
					<Heading mb={10} size={'2xl'}>
						Company Leaders
					</Heading>
					<Table variant="striped" colorScheme="purple" background={'gray.100'} borderBottomRadius={'md'}>
						<TableCaption placement={'top'} background={'gray.100'} borderTopRadius={'md'} position={'relative'}>
							Company Leaders
							{session && (
								<Flex position={'absolute'} right={0} top={0}>
									<Button size={'sm'} color={'red.600'} onClick={() => setIsEditing((isEditing) => !isEditing)}>
										<EditIcon />
										{isEditing ? 'Save Table' : 'Edit Table'}
									</Button>
								</Flex>
							)}
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
								if (isEditing) {
									return <EditableGuildCol guildMember={guildLeader} />;
								}
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
			</Layout>
		</>
	);
}
