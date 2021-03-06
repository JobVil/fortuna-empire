import '../styles/globals.css';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { MemberContextProvider } from '../components/memberContext';
import { useEffect } from 'react';
import { fullstoryInit } from '../vanila_javascripts/fullstory';

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	useEffect(() => {
		fullstoryInit();
	}, []);

	return (
		<SessionProvider session={session}>
			<MemberContextProvider>
				<ChakraProvider>
					<Component {...pageProps} />
				</ChakraProvider>
			</MemberContextProvider>
		</SessionProvider>
	);
}

export default App;
