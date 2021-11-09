import MimLogo from 'assets/images/token/MIM.png';
import AlusdLogo from 'assets/images/token/ALUSD.png';
import FraxLogo from 'assets/images/token/FRAX.png';
import TriCrypto2Logo from 'assets/images/token/TRICRYPTO2.png';

export const POOLS = {
	BentPools: {
		ALUSD: {
			LOGO: AlusdLogo,
			Name: 'alusd',
			POOL: '',
			DepositAsset: '0x43b4FdFD4Ff969587185cDB6f0BD875c5Fc83f8c', // Curve.fi alUSD3CRV (alusd)
			RewardsAssets: {
				BENT: '0x2910E325cf29dd912E3476B61ef12F49cb931096',
				CRV: '0xD533a949740bb3306d119CC777fa900bA034cd52',
				CVX: '0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B',
				ALCX: '0xdBdb4d16EdA451D0503b854CF79D55697F90c8DF',
			}
		},
		MIM: {
			LOGO: MimLogo,
			Name: 'mim',
			POOL: '0x2E2Ed0Cfd3AD2f1d34481277b3204d807Ca2F8c2',
			DepositAsset: '0x5a6A4D54456819380173272A5E8E9B9904BdF41B', // Curve.fi MIM-3LP3CRV (MIM)
			RewardsAssets: {
				BENT: '0x2910E325cf29dd912E3476B61ef12F49cb931096',
				CRV: '0xD533a949740bb3306d119CC777fa900bA034cd52',
				CVX: '0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B',
				SPELL: '0x090185f2135308BaD17527004364eBcC2D37e5F6',
			}
		},
		FRAX: {
			LOGO: FraxLogo,
			Name: 'frax',
			POOL: '',
			DepositAsset: '0xd632f22692FaC7611d2AA1C0D552930D43CAEd3B', // Curve.fi FRAX3CRV (Frax)
			RewardsAssets: {
				BENT: '0x2910E325cf29dd912E3476B61ef12F49cb931096',
				CRV: '0xD533a949740bb3306d119CC777fa900bA034cd52',
				CVX: '0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B',
				FXS: '0x3432B6A60D23Ca0dFCa7761B7ab56459D9C964D0',
			}
		},
		TRICRYPTO2: {
			LOGO: TriCrypto2Logo,
			Name: 'tricrypto2',
			POOL: '',
			DepositAsset: '0xc4AD29ba4B3c580e6D59105FFf484999997675Ff', // Curve.fi USD-BTC-ETH (crv3crypto)
			RewardsAssets: {
				BENT: '0x2910E325cf29dd912E3476B61ef12F49cb931096',
				CRV: '0xD533a949740bb3306d119CC777fa900bA034cd52',
				CVX: '0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B'
			}
		},
	},
}