export type CrvFactoryPool = {
	id: string;
	address: string;
	coins: {
		address: string,
		usdPrice: number,
		decimals: number,
		symbol: string,
		poolBalance: string,
	}[];
	decimals: number[];
	underlyingDecimals: number[];
	implementationAddress: string;
	assetType: number;
	name: string;
	symbol: string;
	totalSupply: string;
	usdTotal: string;
}

export type CrvCryptoFactoryPool = {
	address: string;
	token: string;
	coins: number;
	keys: string[];
	decimals: string[];
	tvl: string;
	lpPrice: string;
}