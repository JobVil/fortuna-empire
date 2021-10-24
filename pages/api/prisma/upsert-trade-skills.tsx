import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import queryString from 'query-string';
import { ExposedGuildMember, GuildMember, TradeSkills } from '../../../components/memberContext';

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method !== 'POST') {
			res.status(405).json({ message: 'Method not allowed', success: false });
		}

		const tradeSkills = queryString.parse(req.body) as unknown as TradeSkills;

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
			include: {
				tradeSkills: true,
			},
		});

		res.json(createdTradeSkills2);
	} catch (error) {
		res.status(405).json({ message: error, success: false });
	}
};
