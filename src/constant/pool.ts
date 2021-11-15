import MimLogo from 'assets/images/token/MIM.png';
import AlusdLogo from 'assets/images/token/ALUSD.png';
import FraxLogo from 'assets/images/token/FRAX.png';
import TriCrypto2Logo from 'assets/images/token/TRICRYPTO2.png';
import BentLogo from 'assets/images/token/BENT.png';
import CrvLogo from 'assets/images/token/CRV.png';
import EthLogo from 'assets/images/token/ETH.png';

export interface BentPool {
	LOGO: string;
	Name: string;
	POOL: string;
	DepositAsset: string;
	RewardsAssets: Record<string, string>
}

const BentPools: Record<string, BentPool> = {
	ALUSD: {
		LOGO: AlusdLogo,
		Name: 'alusd',
		POOL: '0x68BfD5c8029AC691c0dD999794eB9372C947daBa',
		DepositAsset: '0x43b4FdFD4Ff969587185cDB6f0BD875c5Fc83f8c', // Curve.fi alUSD3CRV (alusd)
		RewardsAssets: {
			BENT: '0xdc28c42f65d9f15a7fdadacc4ca78a3b6c894bef',
			CRV: '0xD533a949740bb3306d119CC777fa900bA034cd52',
			CVX: '0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B',
			ALCX: '0xdBdb4d16EdA451D0503b854CF79D55697F90c8DF',
		}
	},
	MIM: {
		LOGO: MimLogo,
		Name: 'mim',
		POOL: '0x5Fe16667ec60fbB56ff016cA684fd9800dC77B11',
		DepositAsset: '0x5a6A4D54456819380173272A5E8E9B9904BdF41B', // Curve.fi MIM-3LP3CRV (MIM)
		RewardsAssets: {
			BENT: '0xdc28c42f65d9f15a7fdadacc4ca78a3b6c894bef',
			CRV: '0xD533a949740bb3306d119CC777fa900bA034cd52',
			CVX: '0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B',
			SPELL: '0x090185f2135308BaD17527004364eBcC2D37e5F6',
		}
	},
	CRV: {
		LOGO: CrvLogo,
		Name: 'crv',
		POOL: '0xD138Ad715B8F03A15303bF6733A655922652911b',
		DepositAsset: '0x9D0464996170c6B9e75eED71c68B99dDEDf279e8', // Curve.fi cvxCRV (CRV)
		RewardsAssets: {
			BENT: '0xdc28c42f65d9f15a7fdadacc4ca78a3b6c894bef',
			CRV: '0xD533a949740bb3306d119CC777fa900bA034cd52',
			CVX: '0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B',
		}
	},
	FRAX: {
		LOGO: FraxLogo,
		Name: 'frax',
		POOL: '0xC04A2f6854D51833b68fC05E061d5eF8e078F5F4',
		DepositAsset: '0xd632f22692FaC7611d2AA1C0D552930D43CAEd3B', // Curve.fi FRAX3CRV (Frax)
		RewardsAssets: {
			BENT: '0xdc28c42f65d9f15a7fdadacc4ca78a3b6c894bef',
			CRV: '0xD533a949740bb3306d119CC777fa900bA034cd52',
			CVX: '0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B',
			FXS: '0x3432B6A60D23Ca0dFCa7761B7ab56459D9C964D0',
		}
	},
	TRICRYPTO2: {
		LOGO: TriCrypto2Logo,
		Name: 'tricrypto2',
		POOL: '0xe95C967d222Df9ecb1D14f74192754f008bB6e36',
		DepositAsset: '0xc4AD29ba4B3c580e6D59105FFf484999997675Ff', // Curve.fi USD-BTC-ETH (crv3crypto)
		RewardsAssets: {
			BENT: '0xdc28c42f65d9f15a7fdadacc4ca78a3b6c894bef',
			CRV: '0xD533a949740bb3306d119CC777fa900bA034cd52',
			CVX: '0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B'
		}
	},
}

export interface SushiPool {
	LOGO: string[];
	Name: string;
	PoolId: number;
	DepositAsset: string;
	RewardsAssets: Record<string, string>
}

const SushiPools: {
	MasterChef: string,
	Pools: Record<string, SushiPool>
} = {
	MasterChef: '0x5343068e12E397bc67Bfd2509C703feBAA60b342',
	Pools: {
		BENT_ETH: {
			LOGO: [BentLogo, EthLogo],
			Name: 'BENT/ETH',
			PoolId: 0,
			DepositAsset: '0x1c85638e118b37167e9298c2268758e058DdfDA0',
			RewardsAssets: {
				BENT: "0xdc28c42f65d9f15a7fdadacc4ca78a3b6c894bef"
			}
		}
	}
}

export const POOLS = {
	BentPools,
	SushiPools
}