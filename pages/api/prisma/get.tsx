import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '.prisma/client';

const prisma = new PrismaClient();

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'GET') {
		res.status(405).json({ message: 'Method not allowed', success: false });
	}

	const { id } = req.query;

	if (id && typeof id === 'string') {
		const member = await prisma.guildMember.findUnique({ where: { id: id }, include: { tradeSkills: true } });
		res.json(member);
	} else {
		const members = await prisma.guildMember.findMany({ include: { tradeSkills: true }, orderBy: { rank: 'asc' } });
		res.json(members);
	}
};
