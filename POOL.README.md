# Bent Pool Configuration Guide

## 1. Crv Pool Configs
```
export interface BentPool {
	LOGO: string;
	Name: string;
	POOL: string;
	DepositAsset: string;
	CvxRewardsPool: string;
	CvxExtraReward?: string;
	ExtCvxRewardPool?: string;
	RewardsAssets: string[];
	CrvLpSYMBOL: string;
	isBentCvx?: boolean;
	crvPoolLink: string;
	isLegacy?: boolean;
	isCryptoPool?: boolean;
	isExternal?: boolean;
	liveTime?: number;
}
```
| Fields           | Description                                         |
| ---------------- | --------------------------------------------------- |
| LOGO             | Logo of Pool. e.g `TOKEN_LOGO.CRV`                  |
| Name             | Name of Pool. e.g `cvxcrv`                          |
| POOL             | Contract address of Bent Pool                       |
| DepositAsset     | Crv Lp Token contract address                       |
| CvxRewardsPool   | Convex Reward pool contract address                 |
| CvxExtraReward   | Extra CVX reward pool contract address              |
| ExtCvxRewardPool | Extra token reward pool contract address            |
| RewardsAssets    | Token key array of rewards e.g `['BENT', 'CRV']`    |
| CrvLpSYMBOL      | Shorten form of Crv Lp Token Symbol e.g `cvxcrvCrv` |
| isBentCvx        | Whether BentCvx pool or Convex's crv pool           |
| crvPoolLink      | Add liquidity page on Curve finance                 |
| isLegacy         | V1 or V2                                            |
| isCryptoPool     | Stablecoin pool or CryptoPool                       |
| isExternal       | If it needs to fetch lpPrice info from bent backend |
| liveTime         | Bent pool live time (affects `new` tag on FE)       |

### How to find contract addresses?
Lets see how we can find it for `cvxfxs` pool.
1. Goto Convex Finance Stake page
2. Under `Stake Curve Lp Token` table, find `cvxfxs` pool and expand it.
3. Under `DEPOSIT` nav, click `Curve cvxfxs pool` link.
4. Copy the link and put it to `crvPoolLink`.
5. Back to convex, in `My Deposits` column, copy symbol and paste to `CrvLpSYMBOL`
6. Open `INFO` nav on convex, copy `LP token address` -> `DepositAsset`
7. Copy `Rewards contract address` -> `CvxRewardsPool`
8. Open rewards contract address on etherscan
9. Go to `Read Contract`, put 0 in `extraRewards` and Query.
10. Open the contract address and if the reward token is `CVX`, put that contract address to `CvxExtraReward`
11. If the reward token is not `CVX`, then put it to `ExtCvxRewardPool`.
12. Do the same for all extraRewards, in most cases, 0 & 1.
13. Put all rewards tokens and extra tokens to `RewardAssets`
14. That's it.