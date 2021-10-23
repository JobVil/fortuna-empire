import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import queryString from 'query-string';
import { ExposedGuildMember } from '../../../components/memberContext';

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') {
		res.status(405).json({ message: 'Method not allowed', success: false });
	}

	const member = queryString.parse(req.body) as unknown as ExposedGuildMember;

	const savedContact = await prisma.guildMember.create({
		data: member,
	});
	res.json(savedContact);
};
