export enum ChainId {
	Mainnet = 1,
	LocalHost = 1337
}

export const SUPPORTED_CHAINS = [ChainId.Mainnet];

export const NETWORK_CONNECTIONS = {
	[ChainId.Mainnet]: 'https://mainnet.infura.io/v3/d242d48659e4423d9b2cf581e09774a2',
}

export const NETWORK_NAMES = {
	[ChainId.Mainnet]: 'mainnet',
	[ChainId.LocalHost]: 'localhost'
}

export const DEFAULT_CHAIN = ChainId.Mainnet;