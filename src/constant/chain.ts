export enum ChainId {
	Mainnet = 1,
	LocalHost = 1337
}

export const SUPPORTED_CHAINS = [ChainId.Mainnet];

export const NETWORK_CONNECTIONS = {
	[ChainId.Mainnet]: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
}

export const NETWORK_NAMES = {
	[ChainId.Mainnet]: 'mainnet',
	[ChainId.LocalHost]: 'localhost'
}

export const DEFAULT_CHAIN = ChainId.Mainnet;