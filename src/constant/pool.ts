import { TOKENS, TOKEN_LOGO } from 'constant';

export interface BentPool {
	LOGO: string;
	Name: string;
	POOL: string;
	DepositAsset: string;
	CvxRewardsPool: string;
	CvxExtraReward?: string;				// CVX token
	ExtCvxRewardPool?: string;			// Extra token
	RewardsAssets: string[];
	CrvLpSYMBOL: string;
	isBentCvx?: boolean;
	crvPoolLink: string;
	isLegacy?: boolean;
	isCryptoPool?: boolean;
	isExternal?: boolean;
	liveTime?: number;
}

const BentPools: Record<string, BentPool> = {
	BENTCVX: {
		LOGO: TOKEN_LOGO.CVX,
		Name: 'bentcvx',
		POOL: '0xfeaea5e904d6e8b88888ea1101c59f4084a94557',
		DepositAsset: '0xf083fba98ded0f9c970e5a418500bad08d8b9732', // Curve.fi bentcvx/cvx
		CvxRewardsPool: '',
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
		CvxRewardsPool: '0x0392321e86f42c2f94fbb0c6853052487db521f0',
		CvxExtraReward: '0xbE4DEa8E5d1E53FAd661610E47501f858F25852D',
		RewardsAssets: ['BENT', 'CRV', 'CVX'],
		CrvLpSYMBOL: 'cvxcrvCrv',
		crvPoolLink: 'https://curve.fi/factory/22/deposit',
	},
	NEW_MIM: {
		LOGO: TOKEN_LOGO.MIM,
		Name: 'mim',
		POOL: '0x397DD120bF0e6d0f2Af2e12f29d57Fb1A58c041c',
		DepositAsset: '0x5a6A4D54456819380173272A5E8E9B9904BdF41B', // Curve.fi MIM-3LP3CRV (MIM)
		CvxRewardsPool: '0xfd5abf66b003881b88567eb9ed9c651f14dc4771',
		ExtCvxRewardPool: '0x69a92f1656cd2e193797546cFe2EaF32EACcf6f7',
		RewardsAssets: ['BENT', 'CRV', 'CVX', 'SPELL'],
		CrvLpSYMBOL: 'mimCrv',
		crvPoolLink: 'https://curve.fi/mim/deposit',
	},
	NEW_FRAX: {
		LOGO: TOKEN_LOGO.FRAX,
		Name: 'frax',
		POOL: '0xD714e4cB809759ECf37067cfF56feCA887E3C168',
		DepositAsset: '0xd632f22692FaC7611d2AA1C0D552930D43CAEd3B', // Curve.fi frax3crv (Frax)
		CvxRewardsPool: '0xb900ef131301b307db5efcbed9dbb50a3e209b2e',
		ExtCvxRewardPool: '0xcDEC6714eB482f28f4889A0c122868450CDBF0b0',
		RewardsAssets: ['BENT', 'CRV', 'CVX', 'FXS'],
		CrvLpSYMBOL: 'fraxCrv',
		crvPoolLink: 'https://curve.fi/frax/deposit',
	},
	CVXETH: {
		LOGO: TOKEN_LOGO.CVX,
		Name: 'cvxeth',
		POOL: '0xade08f43c0ba6eaf8f7a100a8f773285b39cabb5',
		DepositAsset: '0x3A283D9c08E8b55966afb64C515f5143cf907611', // Curve.fi cvxeth/Crv
		CvxRewardsPool: '0xb1Fb0BA0676A1fFA83882c7F4805408bA232C1fA',
		CvxExtraReward: '0x834B9147Fd23bF131644aBC6e557Daf99C5cDa15',
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
		CvxRewardsPool: '0x085A2054c51eA5c91dbF7f90d65e728c0f2A270f',
		CvxExtraReward: '0xE1eCBB4181378E2346EAC90Eb5606c01Aa08f052',
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
		CvxRewardsPool: '0x329cb014b562d5d42927cfF0dEdF4c13ab0442EF',
		CvxExtraReward: '0x880c2c5c4eA8cef892a90E3f714eB60144C08c30',
		RewardsAssets: ['BENT', 'CRV', 'CVX'],
		CrvLpSYMBOL: 'd3poolCrv',
		crvPoolLink: 'https://curve.fi/factory/57/deposit',
	},
	NEW_MIMUST: {
		LOGO: TOKEN_LOGO.MIM,
		Name: 'mim-ust',
		POOL: '0x5D551CE7564b6D9B95559a70A5648af908a8AD09',
		DepositAsset: '0x55a8a39bc9694714e2874c1ce77aa1e599461e18', // Curve.fi mim-ust
		CvxRewardsPool: '0xc62de533ea77d46f3172516ab6b1000daf577e89',
		CvxExtraReward: '0x27801399D60594BFeDe955D54c3e85B2f00179c5',
		RewardsAssets: ['BENT', 'CRV', 'CVX'],
		CrvLpSYMBOL: 'mimustCrv',
		crvPoolLink: 'https://curve.fi/factory/48/deposit',
	},
	DOLA: {
		LOGO: TOKEN_LOGO.DOLA,
		Name: 'dola',
		POOL: '0xD6B8580a39A17b9fBea427fD50593970f4Ac31b6',
		DepositAsset: '0xaa5a67c256e27a5d80712c51971408db3370927d',
		CvxRewardsPool: '0x835f69e58087E5B6bffEf182fe2bf959Fe253c3c',
		RewardsAssets: ['BENT', 'CRV', 'CVX'],
		CrvLpSYMBOL: 'dolaCrv',
		crvPoolLink: 'https://curve.fi/factory/27/deposit',
	},
	NEW_TRICRYPTO2: {
		LOGO: TOKEN_LOGO.TRICRYPTO2,
		Name: 'tricrypto2',
		POOL: '0xb5a69B26920E1A430b1405Bc75a455d687328D67',
		DepositAsset: '0xc4AD29ba4B3c580e6D59105FFf484999997675Ff', // Curve.fi USD-BTC-ETH (crv3crypto)
		CvxRewardsPool: '0x9d5c5e364d81dab193b72db9e9be9d8ee669b652',
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
		CvxRewardsPool: '0x02e2151d4f351881017abdf2dd2b51150841d5b3',
		ExtCvxRewardPool: '0xd731495bb78a4250bC094686788F3fF890dEe0f4',
		RewardsAssets: ['BENT', 'CRV', 'CVX', 'ALCX'],
		CrvLpSYMBOL: 'alusdCrv',
		crvPoolLink: 'https://curve.fi/alusd/deposit',
	},
	OUSD: {
		LOGO: TOKEN_LOGO.OUSD,
		Name: 'ousd',
		POOL: '0x519590c576D4e0aA49B7614492B64ADB8669F52A',
		DepositAsset: '0x87650d7bbfc3a9f10587d7778206671719d9910d',
		CvxRewardsPool: '0x7D536a737C13561e0D2Decf1152a653B4e615158',
		CvxExtraReward: '0x08EDE581D9B9ae55FA7deCc4E4331D191BbBF9dB',
		ExtCvxRewardPool: '0x8A05801c1512F6018e450b0F69e9Ca7b985fCea3',
		RewardsAssets: ['BENT', 'CRV', 'CVX', 'OGN'],
		CrvLpSYMBOL: 'ousdCrv',
		crvPoolLink: 'https://curve.fi/factory/9/deposit',
	},
	THREEPOOL: {
		LOGO: TOKEN_LOGO.CRV,
		Name: '3pool',
		POOL: '0x9a9606a399c62d20d7ba11028ed1218ed3f8f244',
		DepositAsset: '0x6c3f90f043a72fa612cbac8115ee7e52bde6e490',
		CvxRewardsPool: '0x689440f2ff927e1f24c72f1087e1faf471ece1c8',
		RewardsAssets: ['BENT', 'CRV', 'CVX'],
		CrvLpSYMBOL: '3poolCrv',
		crvPoolLink: 'https://curve.fi/3pool/deposit',
	},
	NEW_USTWORMHOLE: {
		LOGO: TOKEN_LOGO.UST,
		Name: 'ust-wormhole',
		POOL: '0x7c325F13395334a376D7D388FD3450d38488a1AF',
		DepositAsset: '0xceaf7747579696a2f0bb206a14210e3c9e6fb269', // Curve.fi USD-BTC-ETH (crv3crypto)
		CvxRewardsPool: '0x7e2b9b5244bcfa5108a76d5e7b507cfd5581ad4a',
		CvxExtraReward: '0x28a68d9c58086dAeB32d5c9297366cc91e50215D',
		RewardsAssets: ['BENT', 'CRV', 'CVX'],
		CrvLpSYMBOL: 'ustwCrv',
		crvPoolLink: 'https://curve.fi/factory/53/deposit',
	},
	NEW_STETH: {
		LOGO: TOKEN_LOGO.STETH,
		Name: 'steth',
		POOL: '0x9a50F371B262d8eE84879EEE70B8d41CBC904dd0',
		DepositAsset: '0x06325440d014e39736583c165c2963ba99faf14e', // Curve.fi ETH/stETH
		CvxRewardsPool: '0x0a760466e1b4621579a82a39cb56dda2f4e70f03',
		ExtCvxRewardPool: '0x008aEa5036b819B4FEAEd10b2190FBb3954981E8',
		RewardsAssets: ['BENT', 'CRV', 'CVX', 'LDO'],
		CrvLpSYMBOL: 'stethCrv',
		crvPoolLink: 'https://curve.fi/steth/deposit',
	},
	SPELLETH: {
		LOGO: TOKEN_LOGO.SPELL,
		Name: 'spelleth',
		POOL: '0xb8fbf1ecCDbB50a3E8838C5b4Cbb5575f1ee8288',
		DepositAsset: '0x8282BD15dcA2EA2bDf24163E8f2781B30C43A2ef', // Curve.fi SPELL-ETH
		CvxRewardsPool: '0xb2f0bB6352417c1Bf017862aC165E67623611aF3',
		RewardsAssets: ['BENT', 'CRV', 'CVX'],
		CrvLpSYMBOL: 'spellethCrv',
		crvPoolLink: 'https://curve.fi/spelleth/deposit',
		isCryptoPool: true,
		liveTime: 1646872641,
	},
	TETH: {
		LOGO: TOKEN_LOGO.T,
		Name: 'teth',
		POOL: '0x5Ac451D745EFb91683090Fa9aEFf12fe22202C5A',
		DepositAsset: '0xCb08717451aaE9EF950a2524E33B6DCaBA60147B',
		CvxRewardsPool: '0x3E91E7c822AC8b4b7905d108c3faCF22A3ee5d2c',
		RewardsAssets: ['BENT', 'CRV', 'CVX'],
		CrvLpSYMBOL: 'tethCrv',
		crvPoolLink: 'https://curve.fi/teth/deposit',
		isCryptoPool: true,
		liveTime: 1646872641,
	},
	ALETH: {
		LOGO: TOKEN_LOGO.ALUSD,
		Name: 'aleth',
		POOL: '0x6CD14B515Ed53bA4d007EeacB37D27cB61A2EfbB',
		DepositAsset: '0xC4C319E2D4d66CcA4464C0c2B32c9Bd23ebe784e',
		CvxRewardsPool: '0x48Bc302d8295FeA1f8c3e7F57D4dDC9981FEE410',
		CvxExtraReward: '0xCEc9a6efFf1daF52aF12beeBf87F81bda7b95c0b',
		RewardsAssets: ['BENT', 'CRV', 'CVX'],
		CrvLpSYMBOL: 'alethCrv',
		crvPoolLink: 'https://curve.fi/factory/38/deposit',
		liveTime: 1646872641,
	},
	FXSETH: {
		LOGO: TOKEN_LOGO.FXS,
		Name: 'fxseth',
		POOL: '0x7Baef5C4a3915CEc12e520DBda95798b3BF7A9ea',
		DepositAsset: '0x90244F43D548a4f8dFecfAD91a193465B1fad6F7',
		CvxRewardsPool: '0xAA0e8Ef60BaBda02Ef11c89a061D82b1D61a462C',
		RewardsAssets: ['BENT', 'CRV', 'CVX'],
		CrvLpSYMBOL: 'fxsethCrv',
		crvPoolLink: 'https://curve.fi/factory-crypto/3/deposit',
		isExternal: true,
		liveTime: 1646872641,
	},
	YFIETH: {
		LOGO: TOKEN_LOGO.YFI,
		Name: 'yfieth',
		POOL: '0x49597e73FD372aC6195c6B0D035E5aA5D0ecA7d9',
		DepositAsset: '0x29059568bB40344487d62f7450E78b8E6C74e0e5',
		CvxRewardsPool: '0x3207bDc327aB67f182B82948fd3DF757F8771324',
		RewardsAssets: ['BENT', 'CRV', 'CVX'],
		CrvLpSYMBOL: 'yfiethCrv',
		crvPoolLink: 'https://curve.fi/factory-crypto/8/deposit',
		isExternal: true,
		liveTime: 1646872641,
	},
	CVXFXS: {
		LOGO: TOKEN_LOGO.FXS,
		Name: 'cvxfxs',
		POOL: '0xDb3b9Bd106B689A10895dBC9f695B6f28Da01414',
		DepositAsset: '0xF3A43307DcAFa93275993862Aae628fCB50dC768',
		CvxRewardsPool: '0xf27AFAD0142393e4b3E5510aBc5fe3743Ad669Cb',
		CvxExtraReward: '0xE2585F27bf5aaB7756f626D6444eD5Fc9154e606',
		ExtCvxRewardPool: '0x28120D9D49dBAeb5E34D6B809b842684C482EF27',
		RewardsAssets: ['BENT', 'CRV', 'CVX', 'FXS'],
		CrvLpSYMBOL: 'cvxfxsCrv',
		crvPoolLink: 'https://curve.fi/factory-crypto/18/deposit',
		isExternal: true,
		liveTime: 1646872641,
	},
	FRAX: {
		LOGO: TOKEN_LOGO.FRAX,
		Name: 'frax',
		POOL: '0x8A95453170615F5D7eD93a86AA27A66942e98f6D',
		DepositAsset: '0xd632f22692FaC7611d2AA1C0D552930D43CAEd3B', // Curve.fi FRAX3CRV (Frax)
		CvxRewardsPool: '0xb900ef131301b307db5efcbed9dbb50a3e209b2e',
		ExtCvxRewardPool: '0xcDEC6714eB482f28f4889A0c122868450CDBF0b0',
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
		CvxRewardsPool: '0x329cb014b562d5d42927cfF0dEdF4c13ab0442EF',
		ExtCvxRewardPool: '0x880c2c5c4eA8cef892a90E3f714eB60144C08c30',
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
		CvxRewardsPool: '0x9d5c5e364d81dab193b72db9e9be9d8ee669b652',
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
		CvxRewardsPool: '0x0a760466e1b4621579a82a39cb56dda2f4e70f03',
		ExtCvxRewardPool: '0x008aEa5036b819B4FEAEd10b2190FBb3954981E8',
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
		CvxRewardsPool: '0x02e2151d4f351881017abdf2dd2b51150841d5b3',
		ExtCvxRewardPool: '0xd731495bb78a4250bC094686788F3fF890dEe0f4',
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
		RewardsAssets: ['CRV', 'BENTCVX', 'SPELL', 'ALCX', 'LDO', 'FXS'],
		ClaimIndex: [0, 1, 2, 3, 4, 5]
	},
	BentCvxRewarderMasterchef: {
		Pool: '0xE644710aAc3c23bFE8cD22fFef003792e4b1c15d',
		RewardsAssets: ['BENT']
	}
}

const weBENT = {
	Addr: '0x04637d61F538911929ff96E755B589C014fD9ce2',
	RewardAssets: ['BENTCVX', 'SPELL', 'FXS', 'CVX', 'LUNAWORM', 'LDO', 'ALCX', 'TRIBE'],
	ClaimIndex: [0, 1, 2, 3, 4, 5, 6, 7]
}

const SnapshotDelegation = {
	Addr: '0x469788fE6E9E9681C6ebF3bF78e7Fd26Fc015446',
	BentDelegator: '0x58F1CaC30786754d8128CA7a1e5Cf8F29A780044'
};

export const POOLS = {
	BentPools,
	SushiPools,
	BentStaking,
	BentCvxStaking,
	VlCvxLocker: '0x72a19342e8f1838460ebfccef09f6585e32db86e',
	Multisig: '0xe001452BeC9e7AC34CA4ecaC56e7e95eD9C9aa3b',
	weBENT,
	SnapshotDelegation,
}