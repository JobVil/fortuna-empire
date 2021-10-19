import Link from 'next/link';
import Head from 'next/head';
import React from 'react';
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

export default function Crafters() {
	return (
		<>
			<Flex height={'100%'} alignItems={'start'} justifyContent={'center'} background={'gray.800'}>
				<Button m={'10'}>
					<Link href="/">
						<a>Back to home</a>
					</Link>
				</Button>
				<Flex direction={'column'} p={12} m={10} rounded={6} alignItems={'center'} justifyContent={'center'} h={'100%'}>
					{Object.keys(crafters).map((key) => (
						<Crafter key={key + 'crafter-one'} playerName={key} skills={crafters[key].skills} />
					))}
				</Flex>
			</Flex>
		</>
	);
}
