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
	const savedContact = await prisma.guildMember.upsert({
		where: { id: member.id },
		update: member,
		create: member,
	});
	res.json(savedContact);
};
