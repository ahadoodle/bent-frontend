import { TOKEN_LOGO } from 'constant';

interface TokenInfo {
	LOGO: string;
	EXT_LOGO?: string;
	ADDR: string;
	DECIMALS: number;
	SYMBOL?: string;
}

export const TOKENS: Record<string, TokenInfo> = {
	ALCX: {
		LOGO: TOKEN_LOGO.ALCX,
		ADDR: '0xdBdb4d16EdA451D0503b854CF79D55697F90c8DF',
		DECIMALS: 18,
		SYMBOL: 'ALCX'
	},
	ALUSD: {
		LOGO: TOKEN_LOGO.ALUSD,
		ADDR: '0xBC6DA0FE9aD5f3b0d58160288917AA56653660E9',
		DECIMALS: 18,
	},
	BENT: {
		LOGO: TOKEN_LOGO.BENT,
		EXT_LOGO: 'https://assets.coingecko.com/coins/images/21274/small/bent-logo-200x200.png?1638861325',
		ADDR: '0x01597e397605bf280674bf292623460b4204c375',
		DECIMALS: 18,
	},
	BENTCVX: {
		LOGO: TOKEN_LOGO.BENTCVX,
		ADDR: '0x9e0441e084f5db0606565737158aa6ab6b970fe0',
		DECIMALS: 18,
		SYMBOL: 'bentCVX'
	},
	CRV: {
		LOGO: TOKEN_LOGO.CRV,
		ADDR: '0xD533a949740bb3306d119CC777fa900bA034cd52',
		DECIMALS: 18,
	},
	CURVE3: {
		LOGO: TOKEN_LOGO.CVX,
		ADDR: '0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490',
		DECIMALS: 18,
	},
	CVX: {
		LOGO: TOKEN_LOGO.CVX,
		EXT_LOGO: 'https://assets.coingecko.com/coins/images/15585/small/convex.png?1621256328',
		ADDR: '0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B',
		DECIMALS: 18,
		SYMBOL: 'CVX'
	},
	CVXCRV: {
		LOGO: TOKEN_LOGO.CRV,
		ADDR: '0x62b9c7356a2dc64a1969e19c23e4f579f9810aa7',
		DECIMALS: 18,
		SYMBOL: 'cvxCrv'
	},
	DAI: {
		LOGO: TOKEN_LOGO.DAI,
		ADDR: '0x6b175474e89094c44da98b954eedeac495271d0f',
		DECIMALS: 18,
	},
	DOLA: {
		LOGO: TOKEN_LOGO.DOLA,
		ADDR: '0x865377367054516e17014ccded1e7d814edc9ce4',
		DECIMALS: 18,
		SYMBOL: 'DOLA'
	},
	FEI: {
		LOGO: TOKEN_LOGO.FEI,
		ADDR: '0x956F47F50A910163D8BF957Cf5846D573E7f87CA',
		DECIMALS: 18,
	},
	FRAX: {
		LOGO: TOKEN_LOGO.FRAX,
		ADDR: '0x853d955aCEf822Db058eb8505911ED77F175b99e',
		DECIMALS: 18,
		SYMBOL: 'FRAX'
	},
	FXS: {
		LOGO: TOKEN_LOGO.FXS,
		ADDR: '0x3432B6A60D23Ca0dFCa7761B7ab56459D9C964D0',
		DECIMALS: 18,
		SYMBOL: 'FXS'
	},
	LDO: {
		LOGO: TOKEN_LOGO.LDO,
		ADDR: '0x5a98fcbea516cf06857215779fd812ca3bef1b32',
		DECIMALS: 18,
		SYMBOL: 'LDO'
	},
	LUNAWORM: {
		LOGO: TOKEN_LOGO.LUNA,
		ADDR: '0xbd31ea8212119f94a611fa969881cba3ea06fa3d',
		DECIMALS: 6,
		SYMBOL: 'LUNA'
	},
	MIM: {
		LOGO: TOKEN_LOGO.MIM,
		ADDR: '0x99D8a9C45b2ecA8864373A26D1459e3Dff1e17F3',
		DECIMALS: 18,
	},
	OGN: {
		LOGO: TOKEN_LOGO.OGN,
		ADDR: '0x8207c1ffc5b6804f6024322ccf34f29c3541ae26',
		DECIMALS: 18,
		SYMBOL: 'OGN'
	},
	OUSD: {
		LOGO: TOKEN_LOGO.OUSD,
		ADDR: '0x2a8e1e676ec238d8a992307b495b45b3feaa5e86',
		DECIMALS: 18,
		SYMBOL: 'OUSD'
	},
	SPELL: {
		LOGO: TOKEN_LOGO.SPELL,
		ADDR: '0x090185f2135308BaD17527004364eBcC2D37e5F6',
		DECIMALS: 18,
		SYMBOL: 'SPELL'
	},
	STETH: {
		LOGO: TOKEN_LOGO.STETH,
		ADDR: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
		DECIMALS: 18
	},
	T: {
		LOGO: TOKEN_LOGO.T,
		ADDR: '0xcdf7028ceab81fa0c6971208e83fa7872994bee5',
		DECIMALS: 18
	},
	TRIBE: {
		LOGO: TOKEN_LOGO.TRIBE,
		ADDR: '0xc7283b66Eb1EB5FB86327f08e1B5816b0720212B',
		DECIMALS: 18,
		SYMBOL: 'TRIBE'
	},
	USDT: {
		LOGO: '',
		ADDR: '0xdac17f958d2ee523a2206206994597c13d831ec7',
		DECIMALS: 6,
	},
	UST: {
		LOGO: TOKEN_LOGO.UST,
		ADDR: '0xa47c8bf37f92abed4a126bda807a7b7498661acd',
		DECIMALS: 18,
	},
	UST_WORMHOLE: {
		LOGO: TOKEN_LOGO.UST,
		ADDR: '0xa693B19d2931d498c5B318dF961919BB4aee87a5',
		DECIMALS: 6,
		SYMBOL: 'UST',
	},
	WBTC: {
		LOGO: TOKEN_LOGO.BTC,
		ADDR: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
		DECIMALS: 8,
	},
	WETH: {
		LOGO: TOKEN_LOGO.ETH,
		ADDR: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
		DECIMALS: 18,
	},
	WLUNA: {
		LOGO: TOKEN_LOGO.LUNA,
		ADDR: '0xd2877702675e6cEb975b4A1dFf9fb7BAF4C91ea9',
		DECIMALS: 18,
		SYMBOL: 'LUNA'
	},
	YFI: {
		LOGO: TOKEN_LOGO.YFI,
		EXT_LOGO: 'https://assets.coingecko.com/coins/images/11849/small/yfi-192x192.png?1598325330',
		ADDR: '0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e',
		DECIMALS: 18,
		SYMBOL: 'YFI',
	},
}