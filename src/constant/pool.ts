import { TOKENS, TOKEN_LOGO } from 'constant';

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
		POOL: '0x1B3e21Cd1Da43B9840f31b82D76B597c131E3e4B',
		DepositAsset: '0x43b4FdFD4Ff969587185cDB6f0BD875c5Fc83f8c', // Curve.fi alUSD3CRV (alusd)
		RewardsAssets: ['BENT', 'CRV', 'CVX', 'ALCX']
	},
	MIM: {
		LOGO: TOKEN_LOGO.MIM,
		Name: 'mim',
		POOL: '0xa7Bd556C005e17f83cdD3303e380e2D0ebA11eF4',
		DepositAsset: '0x5a6A4D54456819380173272A5E8E9B9904BdF41B', // Curve.fi MIM-3LP3CRV (MIM)
		RewardsAssets: ['BENT', 'CRV', 'CVX', 'SPELL']
	},
	CRV: {
		LOGO: TOKEN_LOGO.CRV,
		Name: 'cvxCrv',
		POOL: '0x270B6AFF561284ef380cDD6d8B036f4981049A86',
		DepositAsset: '0x9D0464996170c6B9e75eED71c68B99dDEDf279e8', // Curve.fi cvxCRV (CRV)
		RewardsAssets: ['BENT', 'CRV', 'CVX']
	},
	FRAX: {
		LOGO: TOKEN_LOGO.FRAX,
		Name: 'frax',
		POOL: '0x8A95453170615F5D7eD93a86AA27A66942e98f6D',
		DepositAsset: '0xd632f22692FaC7611d2AA1C0D552930D43CAEd3B', // Curve.fi FRAX3CRV (Frax)
		RewardsAssets: ['BENT', 'CRV', 'CVX', 'FXS']
	},
	TRICRYPTO2: {
		LOGO: TOKEN_LOGO.TRICRYPTO2,
		Name: 'tricrypto2',
		POOL: '0xAcD9D131c5dA85F3a9C25d7a8e625E8260AA6Db2',
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
			DepositAsset: '0x5fa4370164a2fabeef159b893299d59ff5dc1e6d',
			RewardsAssets: ['BENT'],
			DepositLink: 'https://app.sushi.com/add/0x01597E397605Bf280674Bf292623460b4204C375/0x6b175474e89094c44da98b954eedeac495271d0f',
			ReservePriceAsset: TOKENS.DAI.ADDR
		}
	}
}

export const POOLS = {
	BentPools,
	SushiPools
}