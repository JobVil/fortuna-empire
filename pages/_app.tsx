import '../styles/globals.css';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { MemberContextProvider } from '../components/memberContext';

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
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
