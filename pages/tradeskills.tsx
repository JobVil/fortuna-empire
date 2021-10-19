import Link from 'next/link';
import Head from 'next/head';
import React from 'react';
import { Button, Flex, HStack, Stack } from '@chakra-ui/react';
import { onClick } from '.';

export default function TradeSkills() {
	return (
		<>
			<Flex height={'100vh'} alignItems={'start'} justifyContent={'center'} background={'gray.800'}>
				<Button m={'10'}>
					<Link href="/">
						<a>Back to home</a>
					</Link>
				</Button>
				<Flex direction={'column'} p={12} rounded={6} alignItems={'center'} justifyContent={'center'}>
					<Stack>
						<HStack>
							<Button w={'200px'} h={'200px'} onClick={() => onClick('/leader')} colorScheme={'purple'}>
								Weapon Smiting
							</Button>
							<Button w={'200px'} h={'200px'} onClick={() => onClick('/leader')} colorScheme={'purple'}>
								Armoring
							</Button>
							<Button w={'200px'} h={'200px'} onClick={() => onClick('/leader')} colorScheme={'purple'}>
								Engineering
							</Button>
							<Button w={'200px'} h={'200px'} onClick={() => onClick('/leader')} colorScheme={'purple'}>
								Jewel Crafting
							</Button>
							<Button w={'200px'} h={'200px'} onClick={() => onClick('/leader')} colorScheme={'purple'}>
								Arcana
							</Button>
						</HStack>
						<HStack>
							<Button w={'200px'} h={'200px'} onClick={() => onClick('/leader')} colorScheme={'purple'}>
								Cooking
							</Button>
							<Button w={'200px'} h={'200px'} onClick={() => onClick('/leader')} colorScheme={'purple'}>
								Furnishing
							</Button>
							<Button w={'200px'} h={'200px'} onClick={() => onClick('/leader')} colorScheme={'purple'}>
								Smelting
							</Button>
							<Button w={'200px'} h={'200px'} onClick={() => onClick('/leader')} colorScheme={'purple'}>
								Wood Working
							</Button>
							<Button w={'200px'} h={'200px'} onClick={() => onClick('/leader')} colorScheme={'purple'}>
								Leather Working
							</Button>
						</HStack>
						<HStack>
							<Button w={'200px'} h={'200px'} onClick={() => onClick('/leader')} colorScheme={'purple'}>
								Weaving
							</Button>
							<Button w={'200px'} h={'200px'} onClick={() => onClick('/leader')} colorScheme={'purple'}>
								Stone Cutting
							</Button>
							<Button w={'200px'} h={'200px'} onClick={() => onClick('/leader')} colorScheme={'purple'}>
								Logging
							</Button>
							<Button w={'200px'} h={'200px'} onClick={() => onClick('/leader')} colorScheme={'purple'}>
								Mining
							</Button>
							<Button w={'200px'} h={'200px'} onClick={() => onClick('/leader')} colorScheme={'purple'}>
								Fishing
							</Button>
						</HStack>
						<HStack>
							<Button w={'200px'} h={'200px'} onClick={() => onClick('/leader')} colorScheme={'purple'}>
								Harvesting
							</Button>
							<Button w={'200px'} h={'200px'} onClick={() => onClick('/leader')} colorScheme={'purple'}>
								Tracking & Skinning
							</Button>
						</HStack>
					</Stack>
				</Flex>
			</Flex>
		</>
	);
}
