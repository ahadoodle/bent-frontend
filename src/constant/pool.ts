import { TOKENS, TOKEN_LOGO } from 'constant';

export interface BentPool {
	LOGO: string;
	Name: string;
	POOL: string;
	DepositAsset: string;
	RewardsAssets: string[];
	CrvLpSYMBOL: string;
	isBentCvx?: boolean;
	crvPoolLink: string;
	isLegacy?: boolean;
	isCryptoPool?: boolean;
}

const BentPools: Record<string, BentPool> = {
	BENTCVX: {
		LOGO: TOKEN_LOGO.CVX,
		Name: 'bentcvx',
		POOL: '0xfeaea5e904d6e8b88888ea1101c59f4084a94557',
		DepositAsset: '0xf083fba98ded0f9c970e5a418500bad08d8b9732', // Curve.fi bentcvx/cvx
		RewardsAssets: ['BENT'],
		CrvLpSYMBOL: 'bentcvxCrv',
		isBentCvx: true,
		crvPoolLink: 'https://curve.fi/factory/76/deposit',
	},
	NEW_CRV: {
		LOGO: TOKEN_LOGO.CRV,
		Name: 'cvxcrv',
		POOL: '0xf5306c00648c8aA07b8e451E2B4176FbA971A7dA',
		DepositAsset: '0x9D0464996170c6B9e75eED71c68B99dDEDf279e8', // Curve.fi cvxCRV (CRV)
		RewardsAssets: ['BENT', 'CRV', 'CVX'],
		CrvLpSYMBOL: 'cvxcrvCrv',
		crvPoolLink: 'https://curve.fi/factory/22/deposit',
	},
	NEW_MIM: {
		LOGO: TOKEN_LOGO.MIM,
		Name: 'mim',
		POOL: '0x397DD120bF0e6d0f2Af2e12f29d57Fb1A58c041c',
		DepositAsset: '0x5a6A4D54456819380173272A5E8E9B9904BdF41B', // Curve.fi MIM-3LP3CRV (MIM)
		RewardsAssets: ['BENT', 'CRV', 'CVX', 'SPELL'],
		CrvLpSYMBOL: 'mimCrv',
		crvPoolLink: 'https://curve.fi/mim/deposit',
	},
	NEW_FRAX: {
		LOGO: TOKEN_LOGO.FRAX,
		Name: 'frax',
		POOL: '0xD714e4cB809759ECf37067cfF56feCA887E3C168',
		DepositAsset: '0xd632f22692FaC7611d2AA1C0D552930D43CAEd3B', // Curve.fi frax3crv (Frax)
		RewardsAssets: ['BENT', 'CRV', 'CVX', 'FXS'],
		CrvLpSYMBOL: 'fraxCrv',
		crvPoolLink: 'https://curve.fi/frax/deposit',
	},
	CVXETH: {
		LOGO: TOKEN_LOGO.CVX,
		Name: 'cvxeth',
		POOL: '0xade08f43c0ba6eaf8f7a100a8f773285b39cabb5',
		DepositAsset: '0x3A283D9c08E8b55966afb64C515f5143cf907611', // Curve.fi cvxeth/Crv
		RewardsAssets: ['BENT', 'CRV', 'CVX'],
		CrvLpSYMBOL: 'cvxethCrv',
		crvPoolLink: 'https://curve.fi/cvxeth/deposit',
		isCryptoPool: true,
	},
	CRVETH: {
		LOGO: TOKEN_LOGO.CRV,
		Name: 'crveth',
		POOL: '0x5D77b731803916cbcdec2BBdb3Ad0649C6a6EA17',
		DepositAsset: '0xed4064f376cb8d68f770fb1ff088a3d0f3ff5c4d',
		RewardsAssets: ['BENT', 'CRV', 'CVX'],
		CrvLpSYMBOL: 'crvethCrv',
		crvPoolLink: 'https://curve.fi/crveth/deposit',
		isCryptoPool: true,
	},
	NEW_D3POOL: {
		LOGO: TOKEN_LOGO.D3POOL,
		Name: 'd3pool',
		POOL: '0xA9E82F48e1cE96e3cE80e6b7E495831823a98AE9',
		DepositAsset: '0xBaaa1F5DbA42C3389bDbc2c9D2dE134F5cD0Dc89', // Curve.fi d3pool
		RewardsAssets: ['BENT', 'CRV', 'CVX'],
		CrvLpSYMBOL: 'd3poolCrv',
		crvPoolLink: 'https://curve.fi/factory/57/deposit',
	},
	NEW_MIMUST: {
		LOGO: TOKEN_LOGO.MIM,
		Name: 'mim-ust',
		POOL: '0x5D551CE7564b6D9B95559a70A5648af908a8AD09',
		DepositAsset: '0x55a8a39bc9694714e2874c1ce77aa1e599461e18', // Curve.fi mim-ust
		RewardsAssets: ['BENT', 'CRV', 'CVX'],
		CrvLpSYMBOL: 'mimustCrv',
		crvPoolLink: 'https://curve.fi/factory/48/deposit',
	},
	DOLA: {
		LOGO: TOKEN_LOGO.DOLA,
		Name: 'dola',
		POOL: '0xD6B8580a39A17b9fBea427fD50593970f4Ac31b6',
		DepositAsset: '0xaa5a67c256e27a5d80712c51971408db3370927d',
		RewardsAssets: ['BENT', 'CRV', 'CVX'],
		CrvLpSYMBOL: 'dolaCrv',
		crvPoolLink: 'https://curve.fi/factory/27/deposit',
	},
	NEW_TRICRYPTO2: {
		LOGO: TOKEN_LOGO.TRICRYPTO2,
		Name: 'tricrypto2',
		POOL: '0xb5a69B26920E1A430b1405Bc75a455d687328D67',
		DepositAsset: '0xc4AD29ba4B3c580e6D59105FFf484999997675Ff', // Curve.fi USD-BTC-ETH (crv3crypto)
		RewardsAssets: ['BENT', 'CRV', 'CVX'],
		CrvLpSYMBOL: '3CrvCrypto2',
		crvPoolLink: 'https://curve.fi/tricrypto2/deposit',
		isCryptoPool: true,
	},
	NEW_ALUSD: {
		LOGO: TOKEN_LOGO.ALUSD,
		Name: 'alusd',
		POOL: '0x16b385cc9959BbE83905eA5E71820b406804d037',
		DepositAsset: '0x43b4FdFD4Ff969587185cDB6f0BD875c5Fc83f8c', // Curve.fi alUSD3CRV (alusd)
		RewardsAssets: ['BENT', 'CRV', 'CVX', 'ALCX'],
		CrvLpSYMBOL: 'alusdCrv',
		crvPoolLink: 'https://curve.fi/alusd/deposit',
	},
	OUSD: {
		LOGO: TOKEN_LOGO.OUSD,
		Name: 'ousd',
		POOL: '0x519590c576D4e0aA49B7614492B64ADB8669F52A',
		DepositAsset: '0x87650d7bbfc3a9f10587d7778206671719d9910d',
		RewardsAssets: ['BENT', 'CRV', 'CVX', 'OGN'],
		CrvLpSYMBOL: 'ousdCrv',
		crvPoolLink: 'https://curve.fi/factory/9/deposit',
	},
	NEW_USTWORMHOLE: {
		LOGO: TOKEN_LOGO.UST,
		Name: 'ust-wormhole',
		POOL: '0x7c325F13395334a376D7D388FD3450d38488a1AF',
		DepositAsset: '0xceaf7747579696a2f0bb206a14210e3c9e6fb269', // Curve.fi USD-BTC-ETH (crv3crypto)
		RewardsAssets: ['BENT', 'CRV', 'CVX'],
		CrvLpSYMBOL: 'ustwCrv',
		crvPoolLink: 'https://curve.fi/factory/53/deposit',
	},
	NEW_STETH: {
		LOGO: TOKEN_LOGO.STETH,
		Name: 'steth',
		POOL: '0x9a50F371B262d8eE84879EEE70B8d41CBC904dd0',
		DepositAsset: '0x06325440d014e39736583c165c2963ba99faf14e', // Curve.fi ETH/stETH
		RewardsAssets: ['BENT', 'CRV', 'CVX', 'LDO'],
		CrvLpSYMBOL: 'stethCrv',
		crvPoolLink: 'https://curve.fi/steth/deposit',
	},
	FRAX: {
		LOGO: TOKEN_LOGO.FRAX,
		Name: 'frax',
		POOL: '0x8A95453170615F5D7eD93a86AA27A66942e98f6D',
		DepositAsset: '0xd632f22692FaC7611d2AA1C0D552930D43CAEd3B', // Curve.fi FRAX3CRV (Frax)
		RewardsAssets: ['BENT', 'CRV', 'CVX', 'FXS'],
		CrvLpSYMBOL: 'fraxCrv',
		crvPoolLink: 'https://curve.fi/frax/deposit',
		isLegacy: true,
	},
	D3POOL: {
		LOGO: TOKEN_LOGO.D3POOL,
		Name: 'd3pool',
		POOL: '0x9f5188c22b333d662ce18643530f799faf0db7c1',
		DepositAsset: '0xBaaa1F5DbA42C3389bDbc2c9D2dE134F5cD0Dc89', // Curve.fi USD-BTC-ETH (crv3crypto)
		RewardsAssets: ['BENT', 'CRV', 'CVX'],
		CrvLpSYMBOL: 'd3poolCrv',
		crvPoolLink: 'https://curve.fi/factory/57/deposit',
		isLegacy: true,
	},
	TRICRYPTO2: {
		LOGO: TOKEN_LOGO.TRICRYPTO2,
		Name: 'tricrypto2',
		POOL: '0xAcD9D131c5dA85F3a9C25d7a8e625E8260AA6Db2',
		DepositAsset: '0xc4AD29ba4B3c580e6D59105FFf484999997675Ff', // Curve.fi USD-BTC-ETH (crv3crypto)
		RewardsAssets: ['BENT', 'CRV', 'CVX'],
		CrvLpSYMBOL: '3CrvCrypto2',
		crvPoolLink: 'https://curve.fi/tricrypto2/deposit',
		isLegacy: true,
		isCryptoPool: true,
	},
	STETH: {
		LOGO: TOKEN_LOGO.STETH,
		Name: 'steth',
		POOL: '0xEAC2c97A6Fcd488617a7f1B00bC76CB03aD70b26',
		DepositAsset: '0x06325440d014e39736583c165c2963ba99faf14e', // Curve.fi ETH/stETH
		RewardsAssets: ['BENT', 'CRV', 'CVX', 'LDO'],
		CrvLpSYMBOL: 'stethCrv',
		crvPoolLink: 'https://curve.fi/steth/deposit',
		isLegacy: true,
	},
	ALUSD: {
		LOGO: TOKEN_LOGO.ALUSD,
		Name: 'alusd',
		POOL: '0x1B3e21Cd1Da43B9840f31b82D76B597c131E3e4B',
		DepositAsset: '0x43b4FdFD4Ff969587185cDB6f0BD875c5Fc83f8c', // Curve.fi alUSD3CRV (alusd)
		RewardsAssets: ['BENT', 'CRV', 'CVX', 'ALCX'],
		CrvLpSYMBOL: 'alusdCrv',
		crvPoolLink: 'https://curve.fi/alusd/deposit',
		isLegacy: true,
	},
}

export interface SushiPool {
	LOGO: string[];
	Name: string;
	PoolId: number;
	DepositAsset: string;
	RewardsAssets: string[];
	DepositLink: string;
	ReservePriceAsset: string;
}

const SushiPools: {
	MasterChef: string,
	Pools: Record<string, SushiPool>
} = {
	MasterChef: '0xd564b2FEEC19Df8F4D6CB52C0a4386d05A993583',
	Pools: {
		BENT_DAI: {
			LOGO: [TOKEN_LOGO.BENT, TOKEN_LOGO.DAI],
			Name: 'BENT/DAI',
			PoolId: 0,
			DepositAsset: '0x5fA4370164a2FaBEef159B893299D59fF5dC1e6d',
			RewardsAssets: ['BENT'],
			DepositLink: 'https://app.sushi.com/add/0x01597E397605Bf280674Bf292623460b4204C375/0x6b175474e89094c44da98b954eedeac495271d0f',
			ReservePriceAsset: TOKENS.DAI.ADDR
		}
	}
}

const BentStaking = {
	POOL: '0x07228C1820b4a3D75206a6E61F1AdD1BB157ce80',
	RewardAssets: ['CRV', 'CVX', 'SPELL', 'ALCX', 'LDO']
}

const BentCvxStaking = {
	BentCvxStaking: '0xe55C5069ED7F8fE2EA656aFf4551af52F8dbdeF7',
	BentCvxRewarderCvx: {
		Pool: '0xf7e8f63E453C5e2931AAdF263eD7FDB5F54eB4F2',
		RewardsAssets: ['CVXCRV', 'FXS', 'SPELL', 'CVX', 'LUNAWORM'],
		ClaimIndex: [0, 1, 2, 3, 5]
	},
	BentCvxRewarderBent: {
		Pool: '0x6c4F65d3e7DA3bc1F00194AA81FC00Fc4916f229',
		RewardsAssets: ['CRV', 'BENTCVX', 'SPELL', 'ALCX', 'LDO']
	},
	BentCvxRewarderMasterchef: {
		Pool: '0xE644710aAc3c23bFE8cD22fFef003792e4b1c15d',
		RewardsAssets: ['BENT']
	}
}

export const POOLS = {
	BentPools,
	SushiPools,
	BentStaking,
	BentCvxStaking,
	VlCvxLocker: '0xD18140b4B819b895A3dba5442F959fA44994AF50',
	Multisig: '0xe001452BeC9e7AC34CA4ecaC56e7e95eD9C9aa3b',
}