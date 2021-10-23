import Link from 'next/link';
import Head from 'next/head';
import React, { useContext, useEffect, useState } from 'react';
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
} from '@chakra-ui/react';
import TradeSkills from './tradeskills';
import { SkillTable } from '../components/skill-tabel';
import { Crafter } from '../components/crafter';
import Layout from '../components/layout';
import { AddMemberForm } from '../components/add-member';
import { useSession } from 'next-auth/react';
import { MemberContext } from '../components/memberContext';
import ReactTags from 'react-tag-autocomplete';
import { crafting, gathering, refining } from '../lib/constant';
import { AddMemberSkillsForm } from '../components/add-member-skils';

const crafters = {
	Redhorn70: {
		skills: [
			{
				skillName: 'Harvesting',
				level: '180',
				craftingGear: 0,
				trophies: 0,
			},
			{
				skillName: 'Cooking',
				level: '176',
				craftingGear: 0,
				trophies: 0,
			},
			{
				skillName: 'Wood Working',
				level: '171',
				craftingGear: 0,
				trophies: 0,
			},
		],
	},
	Chuuni: {
		skills: [
			{
				skillName: 'Armoring',
				level: '200',
				craftingGear: 3,
				trophies: 0,
			},
			{
				skillName: 'Cooking',
				level: '200',
				craftingGear: 0,
				trophies: 0,
			},
			{
				skillName: 'Leather Working',
				level: '200',
				craftingGear: 0,
				trophies: 0,
			},
		],
	},
	Joemandly: {
		skills: [
			{
				skillName: 'Armoring',
				level: '200',
				craftingGear: 0,
				trophies: 0,
			},
		],
	},
	BusinessDog: {
		skills: [
			{
				skillName: 'Armor Crafting',
				level: '150',
				craftingGear: 0,
				trophies: 0,
			},
		],
	},
	JBoberooski: {
		skills: [
			{
				skillName: 'Engineering',
				level: '162',
				craftingGear: 4,
				trophies: 1,
			},
		],
	},
	Wakefield: {
		skills: [
			{
				skillName: 'Engineering',
				level: 'test',
				craftingGear: 1,
				trophies: 0,
			},
		],
	},
	Poptart: {
		skills: [
			{
				skillName: 'Jewelry',
				level: '115',
				craftingGear: 1,
				trophies: 0,
			},
		],
	},
	GyroSando: {
		skills: [
			{
				skillName: 'Jewelry',
				level: '130',
				craftingGear: 0,
				trophies: 0,
			},
		],
	},
	Dakotac602: {
		skills: [
			{
				skillName: 'Cooking',
				level: '162',
				craftingGear: 0,
				trophies: 0,
			},
			{
				skillName: 'Woodcutting',
				level: '166',
				craftingGear: 0,
				trophies: 0,
			},
		],
	},
	Zoroichi: {
		skills: [
			{
				skillName: 'Smelting',
				level: '150',
				craftingGear: 0,
				trophies: 0,
			},
			{
				skillName: 'Furnishing',
				level: '122',
				craftingGear: 0,
				trophies: 0,
			},
		],
	},
	Solorn: {
		skills: [
			{
				skillName: 'Furnishing',
				level: '115',
				craftingGear: 0,
				trophies: 0,
			},
		],
	},
};

type tag = { id: number; name: string };

export default function Crafters() {
	const { data: session } = useSession();
	const { guildMembers } = useContext(MemberContext);
	const [tags, setTags] = useState<tag[]>([]);
	const [suggestTags, setSuggestedTags] = useState<tag[]>([]);
	useEffect(() => {
		const guildMembersUsernames = guildMembers.map((guildMember) => guildMember.userName);
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
		guildMembersUsernames.forEach((userName) => {
			defaultTags.push({ id: defaultTags.length, name: userName });
		});
		setSuggestedTags(defaultTags);
	}, []);
	return (
		<>
			<Layout>
				<Button m={'10'}>
					<Link href="/">
						<a>Back to home</a>
					</Link>
				</Button>
				<Flex w={'625px'} justifyContent={'space-between'}>
					<Flex w={'100%'}>
						<Box backgroundColor={'white'} w={'100%'} p={2} m={2} borderRadius={'md'}>
							<ReactTags
								tags={tags}
								suggestions={suggestTags}
								onDelete={(oldTag) => {
									setTags((tags) => {
										tags.splice(oldTag as number, 1);
										return tags;
									});
								}}
								onAddition={(newTag) => {
									setTags((tag) => {
										tag.push(newTag as tag);
										return tag;
									});
								}}
							/>
						</Box>
					</Flex>
					{session && (
						<Flex direction={'column'} w={'140px'} alignSelf={'center'}>
							<AddMemberSkillsForm />
							<Button size={'xs'}>Edit Members Skills</Button>
						</Flex>
					)}
				</Flex>
				<Flex direction={'column'} p={12} rounded={6} alignItems={'center'} justifyContent={'center'} h={'100%'}>
					{Object.keys(crafters).map((key) => (
						<Crafter key={key + 'crafter-one'} playerName={key} skills={crafters[key].skills} />
					))}
				</Flex>
			</Layout>
		</>
	);
}
