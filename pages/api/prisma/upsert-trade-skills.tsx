import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import queryString from 'query-string';
import { ExposedGuildMember, GuildMember, TradeSkills } from '../../../components/memberContext';

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') {
		res.status(405).json({ message: 'Method not allowed', success: false });
	}

	const tradeSkills = queryString.parse(req.body) as unknown as TradeSkills;
	// const updateSkills = tradeSkills.filter((tradeSkill) => !!tradeSkill.id);

	// const createdSkills = tradeSkills.filter((tradeSkill) => !tradeSkill.id);
	// const savedTradeSkills = await prisma.tradeSkills.updateMany({
	// 	where: {
	// 		guildMemberId: tradeSkills[0].guildMemberId,
	// 	},
	// 	data: updateSkills,
	// });

	// const cts = await prisma.tradeSkills.update({
	// 	where: {
	// 		id: 'ckv3lkfeh0009som090iqv7ll',
	// 	},
	// 	data: {
	// 		level: '180',
	// 	},
	// });

	const createdTradeSkills2 = await prisma.guildMember.update({
		where: {
			id: tradeSkills.guildMemberId,
		},
		data: {
			tradeSkills: {
				upsert: {
					where: {
						guildMemberId_name: { guildMemberId: tradeSkills.guildMemberId, name: tradeSkills.name },
					},
					update: {
						level: tradeSkills.level,
						numOfCraftingGear: Number(tradeSkills.numOfCraftingGear),
						numOfTrophies: Number(tradeSkills.numOfTrophies),
					},
					create: {
						name: tradeSkills.name,
						level: tradeSkills.level,
						numOfCraftingGear: Number(tradeSkills.numOfCraftingGear),
						numOfTrophies: Number(tradeSkills.numOfTrophies),
					},
				},
			},
		},
	});

	// const createdTradeSkills = await prisma.tradeSkills.create({
	// 	data: {
	// 		guildMemberId: 'ckv2ss4dg0019d6m0922fl977',
	// 		name: 'Test',
	// 		level: '200',
	// 		numOfCraftingGear: 4,
	// 		numOfTrophies: 2,
	// 	},
	// });
	res.json(createdTradeSkills2);
};
