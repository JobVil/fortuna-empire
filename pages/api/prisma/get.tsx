import { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../../../lib/prisma';

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (req: VercelRequest, res: VercelResponse) => {
	try {
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
	} catch (error) {
		res.status(405).json({ message: error, success: false });
	}
};
