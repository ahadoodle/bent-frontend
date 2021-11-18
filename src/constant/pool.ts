import { TOKEN_LOGO } from 'constant';

export interface BentPool {
	LOGO: string;
	Name: string;
	POOL: string;
	DepositAsset: string;
	RewardsAssets: string[];
}

const BentPools: Record<string, BentPool> = {
	ALUSD: {
		LOGO: TOKEN_LOGO.ALUSD,
		Name: 'alusd',
		POOL: '0x68BfD5c8029AC691c0dD999794eB9372C947daBa',
		DepositAsset: '0x43b4FdFD4Ff969587185cDB6f0BD875c5Fc83f8c', // Curve.fi alUSD3CRV (alusd)
		RewardsAssets: ['BENT', 'CRV', 'CVX', 'ALCX']
	},
	MIM: {
		LOGO: TOKEN_LOGO.MIM,
		Name: 'mim',
		POOL: '0x5Fe16667ec60fbB56ff016cA684fd9800dC77B11',
		DepositAsset: '0x5a6A4D54456819380173272A5E8E9B9904BdF41B', // Curve.fi MIM-3LP3CRV (MIM)
		RewardsAssets: ['BENT', 'CRV', 'CVX', 'SPELL']
	},
	CRV: {
		LOGO: TOKEN_LOGO.CRV,
		Name: 'cvxCrv',
		POOL: '0xD138Ad715B8F03A15303bF6733A655922652911b',
		DepositAsset: '0x9D0464996170c6B9e75eED71c68B99dDEDf279e8', // Curve.fi cvxCRV (CRV)
		RewardsAssets: ['BENT', 'CRV', 'CVX']
	},
	FRAX: {
		LOGO: TOKEN_LOGO.FRAX,
		Name: 'frax',
		POOL: '0xC04A2f6854D51833b68fC05E061d5eF8e078F5F4',
		DepositAsset: '0xd632f22692FaC7611d2AA1C0D552930D43CAEd3B', // Curve.fi FRAX3CRV (Frax)
		RewardsAssets: ['BENT', 'CRV', 'CVX', 'FXS']
	},
	TRICRYPTO2: {
		LOGO: TOKEN_LOGO.TRICRYPTO2,
		Name: 'tricrypto2',
		POOL: '0xe95C967d222Df9ecb1D14f74192754f008bB6e36',
		DepositAsset: '0xc4AD29ba4B3c580e6D59105FFf484999997675Ff', // Curve.fi USD-BTC-ETH (crv3crypto)
		RewardsAssets: ['BENT', 'CRV', 'CVX']
	},
}

export interface SushiPool {
	LOGO: string[];
	Name: string;
	PoolId: number;
	DepositAsset: string;
	RewardsAssets: string[];
	DepositLink: string;
}

const SushiPools: {
	MasterChef: string,
	Pools: Record<string, SushiPool>
} = {
	MasterChef: '0x5343068e12E397bc67Bfd2509C703feBAA60b342',
	Pools: {
		BENT_ETH: {
			LOGO: [TOKEN_LOGO.CRV, TOKEN_LOGO.ETH],
			Name: 'CRV/ETH',
			PoolId: 0,
			DepositAsset: '0x58Dc5a51fE44589BEb22E8CE67720B5BC5378009',
			RewardsAssets: ['BENT'],
			DepositLink: 'https://app.sushi.com/add/0xD533a949740bb3306d119CC777fa900bA034cd52/ETH'
		}
	}
}

export const POOLS = {
	BentPools,
	SushiPools
}