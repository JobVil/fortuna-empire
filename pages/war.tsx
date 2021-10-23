import Link from 'next/link';

import React, { FC } from 'react';
import { Button } from '@chakra-ui/react';
import { Crafter } from '../components/crafter';
import Layout from '../components/layout';
import { GuildMember, MemberContext } from '../components/memberContext';
import { crafting, gathering, refining, memberRoles } from '../lib/constant';
import { PlayerNameLevelRole } from '../components/name-level-role-card';
import { GuildMemberTables } from '../components/guild-member-tables';

type tag = { id: number; name: string };

export const War: FC = () => {
	const warTags = [{ id: 0, name: 'War' }];
	return (
		<>
			<Layout>
				<Button m={'10'}>
					<Link href="/">
						<a>Back to home</a>
					</Link>
				</Button>
				<GuildMemberTables defaultTags={warTags} />
			</Layout>
		</>
	);
};

export default War;
