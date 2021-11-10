import React, { ReactNode } from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
// import theme from 'theme';
import { WalletProvider } from './wallet/provider';
import Updaters from 'state/Updater';
import store from 'state';
import Web3 from 'web3'

interface Props {
	children: ReactNode
}

const Providers = ({ children }: Props) => {
	const getLibrary = (provider): Web3 => {
		return provider;
	}
	return (
			<Web3ReactProvider getLibrary={getLibrary}>
				<WalletProvider>
					<Provider store={store}>
						<HelmetProvider>
							<Updaters />
							{children}
						</HelmetProvider>
					</Provider>
				</WalletProvider>
			</Web3ReactProvider>
	);
}

export default Providers;