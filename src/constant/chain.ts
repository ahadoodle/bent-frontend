export enum ChainId {
	Mainnet = 1,
	LocalHost = 1337
}

export const SUPPORTED_CHAINS = [ChainId.Mainnet];

export const RPC_NODE_KEY = 'p7zwMl-PuYfW0agQvcDzMo7bvnXX-Hqj';
export const NETWORK_CONNECTIONS = {
	[ChainId.Mainnet]: `https://eth-mainnet.alchemyapi.io/v2/${RPC_NODE_KEY}`,
}

export const NETWORK_NAMES = {
	[ChainId.Mainnet]: 'mainnet',
	[ChainId.LocalHost]: 'localhost'
}

export const DEFAULT_CHAIN = ChainId.Mainnet;
