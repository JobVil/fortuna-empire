import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import queryString from 'query-string';
import { ExposedGuildMember, GuildMember } from '../../../components/memberContext';
import TradeSkills from '../../tradeskills';

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method !== 'POST') {
			res.status(405).json({ message: 'Method not allowed', success: false });
		}

		const member = queryString.parse(req.body) as unknown as GuildMember;
		const savedContact = await prisma.guildMember.upsert({
			where: { id: member.id },
			update: {
				level: member.level,
				rank: member.rank,
				role: member.role,
				title: member.title,
				userName: member.userName,
			},
			create: {
				level: member.level,
				rank: member.rank,
				role: member.role,
				title: member.title,
				userName: member.userName,
			},
			include: {
				tradeSkills: true,
			},
		});
		res.json(savedContact);
	} catch (error) {
		res.status(405).json({ message: error, success: false });
	}
};
