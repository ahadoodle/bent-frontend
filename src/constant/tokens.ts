import { TOKEN_LOGO } from 'constant';

interface TokenInfo {
	LOGO: string;
	ADDR: string;
	DECIMALS: number;
}

export const TOKENS: Record<string, TokenInfo> = {
	BENT: {
		LOGO: TOKEN_LOGO.BENT,
		ADDR: '0x01597e397605bf280674bf292623460b4204c375',
		DECIMALS: 18,
	},
	CRV: {
		LOGO: TOKEN_LOGO.CRV,
		ADDR: '0xD533a949740bb3306d119CC777fa900bA034cd52',
		DECIMALS: 18,
	},
	CVX: {
		LOGO: TOKEN_LOGO.CVX,
		ADDR: '0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B',
		DECIMALS: 18,
	},
	ALCX: {
		LOGO: TOKEN_LOGO.ALCX,
		ADDR: '0xdBdb4d16EdA451D0503b854CF79D55697F90c8DF',
		DECIMALS: 18,
	},
	ALUSD: {
		LOGO: '',
		ADDR: '0xBC6DA0FE9aD5f3b0d58160288917AA56653660E9',
		DECIMALS: 18,
	},
	SPELL: {
		LOGO: TOKEN_LOGO.SPELL,
		ADDR: '0x090185f2135308BaD17527004364eBcC2D37e5F6',
		DECIMALS: 18,
	},
	FXS: {
		LOGO: TOKEN_LOGO.FXS,
		ADDR: '0x3432B6A60D23Ca0dFCa7761B7ab56459D9C964D0',
		DECIMALS: 18,
	},
	FRAX: {
		LOGO: '',
		ADDR: '0x853d955aCEf822Db058eb8505911ED77F175b99e',
		DECIMALS: 18,
	},
	DAI: {
		LOGO: TOKEN_LOGO.DAI,
		ADDR: '0x6b175474e89094c44da98b954eedeac495271d0f',
		DECIMALS: 18,
	},
	MIM: {
		LOGO: '',
		ADDR: '0x99D8a9C45b2ecA8864373A26D1459e3Dff1e17F3',
		DECIMALS: 18,
	},
	CURVE3: {
		LOGO: '',
		ADDR: '0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490',
		DECIMALS: 18,
	},
	ConvexCrv: {
		LOGO: '',
		ADDR: '0x62b9c7356a2dc64a1969e19c23e4f579f9810aa7',
		DECIMALS: 18,
	},
	USDT: {
		LOGO: '',
		ADDR: '0xdac17f958d2ee523a2206206994597c13d831ec7',
		DECIMALS: 6,
	},
	WBTC: {
		LOGO: '',
		ADDR: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
		DECIMALS: 8,
	},
	WETH: {
		LOGO: '',
		ADDR: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
		DECIMALS: 18,
	},
	LDO: {
		LOGO: TOKEN_LOGO.LDO,
		ADDR: '0x5a98fcbea516cf06857215779fd812ca3bef1b32',
		DECIMALS: 18
	}
}