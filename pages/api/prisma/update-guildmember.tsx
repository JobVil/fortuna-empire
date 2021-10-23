import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import queryString from 'query-string';
import { ExposedGuildMember, GuildMember } from '../../../components/memberContext';
import TradeSkills from '../../tradeskills';

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') {
		res.status(405).json({ message: 'Method not allowed', success: false });
	}

	const member = queryString.parse(req.body) as unknown as GuildMember;

	if (member.tradeSkills) {
		res.status(200).json(req.body);
		const updateSkills = member.tradeSkills.filter((tradeSkill) => !!tradeSkill.id);

		const createdSkills = member.tradeSkills.filter((tradeSkill) => !tradeSkill.id);
		const savedTradeSkills = await prisma.tradeSkills.updateMany({
			where: {
				guildMemberId: member.id,
			},
			data: updateSkills,
		});
		const createdTradeSkills = await prisma.tradeSkills.createMany({
			data: createdSkills,
		});
		res.json(createdTradeSkills);
	} else {
		const savedContact = await prisma.guildMember.upsert({
			where: { id: member.id },
			update: member,
			create: member,
		});
		res.json(savedContact);
	}
};
