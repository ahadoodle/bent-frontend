export enum ChainId {
	Mainnet = 1,
}

export const SUPPORTED_CHAINS = [ChainId.Mainnet];

export const NETWORK_CONNECTIONS = {
	[ChainId.Mainnet]: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
}

export const NETWORK_NAMES = {
	[ChainId.Mainnet]: 'mainnet',
}

export const DEFAULT_CHAIN = ChainId.Mainnet;
export const DEFAULT_GAS_LIMIT = 200000
export const DEFAULT_GAS_PRICE = 5