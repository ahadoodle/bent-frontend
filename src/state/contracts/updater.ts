/* eslint-disable @typescript-eslint/no-explicit-any*/
import { ethers, BigNumber, utils } from 'ethers';
import { POOLS, TOKENS } from 'constant';
import { useActiveWeb3React, useBlockNumber, useCrvFiLps, useMulticallProvider } from 'hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
	CrvFiLp,
	getMultiBentPool,
	getMultiCvxRewardPool,
	getMultiERC20Contract,
	getTokenDecimals,
	getAnnualReward,
	getMultiSushiPair,
	getMultiBentMasterChef,
	getPrice,
	getTokenPrice,
} from 'utils';
import {
	updateBentPrice,
	updateTokenPrice,
	updatePrices,
	updateBalance,
	updateBentPoolRewardsInfo,
	updateCrvDeposit,
	updateCrvLpAllowance,
	updateCrvPoolApr,
	updateCrvPoolDepositedUsd,
	updateCrvPoolEarnedUsd,
	updateCrvPoolRewards,
	updateCrvPoolTVL,
	updateCvxLpBalance,
	updateSushiLpDeposited,
	updateSushiLpDepositedUsd,
	updateSushiPoolApr,
	updateSushiPoolEarnedUsd,
	updateSushiPoolTVL,
	updateTotalSupply,
	updateSushiPoolRewards,
} from './actions';

export default function Updater(): null {
	const dispatch = useDispatch();
	const blockNumber = useBlockNumber();
	const multicall = useMulticallProvider();
	const { account } = useActiveWeb3React();
	const crvDepositLps = useCrvFiLps();

	useEffect(() => {
		const tokenAddrs = Object.keys(TOKENS).map(token => TOKENS[token].ADDR);
		getPrice(tokenAddrs).then(tokenPrices => {
			dispatch(updatePrices(tokenPrices))

			const accAddr = account || ethers.constants.AddressZero;
			const contractCalls: any[] = [];

			// Add Sushi contract calls
			const bentMasterChefMC = getMultiBentMasterChef(POOLS.SushiPools.MasterChef);
			contractCalls.push(bentMasterChefMC.rewardPerBlock());
			contractCalls.push(bentMasterChefMC.totalAllocPoint());
			Object.keys(POOLS.SushiPools.Pools).forEach(poolKey => {
				const sushiPair = getMultiSushiPair(POOLS.SushiPools.Pools[poolKey].DepositAsset);

				contractCalls.push(sushiPair.getReserves());
				contractCalls.push(sushiPair.totalSupply());
				contractCalls.push(sushiPair.balanceOf(accAddr));
				contractCalls.push(sushiPair.allowance(accAddr, POOLS.SushiPools.MasterChef));
				contractCalls.push(bentMasterChefMC.userInfo(POOLS.SushiPools.Pools[poolKey].PoolId, accAddr));
				contractCalls.push(sushiPair.balanceOf(POOLS.SushiPools.MasterChef));
				contractCalls.push(bentMasterChefMC.poolInfo(POOLS.SushiPools.Pools[poolKey].PoolId));
				contractCalls.push(bentMasterChefMC.pendingReward(POOLS.SushiPools.Pools[poolKey].PoolId, accAddr));
			});

			// Add Curve contract calls
			contractCalls.push(getMultiERC20Contract(TOKENS['BENT'].ADDR).totalSupply());
			Object.keys(POOLS.BentPools).forEach(poolKey => {
				const lpTokenContract = getMultiERC20Contract(POOLS.BentPools[poolKey].DepositAsset);
				const bentPoolMC = getMultiBentPool(poolKey);
				const cvxRewardPool = getMultiCvxRewardPool(POOLS.BentPools[poolKey].CvxRewardsAddr);

				contractCalls.push(lpTokenContract.balanceOf(accAddr));
				contractCalls.push(lpTokenContract.allowance(accAddr, POOLS.BentPools[poolKey].POOL));
				contractCalls.push(lpTokenContract.totalSupply());
				contractCalls.push(cvxRewardPool.balanceOf(POOLS.BentPools[poolKey].POOL))
				contractCalls.push(bentPoolMC.balanceOf(accAddr));
				contractCalls.push(bentPoolMC.pendingReward(accAddr));
				contractCalls.push(bentPoolMC.rewardPools(0));
				contractCalls.push(bentPoolMC.rewardPools(1));
				contractCalls.push(bentPoolMC.rewardPools(2));
			});

			multicall.all(contractCalls).then(results => {
				dispatch(updateTotalSupply({ tokenAddr: TOKENS['BENT'].ADDR, supply: results[0] }));
				const lpTotalSupplies = {};
				const depositedLpBalance = {};
				const rewardsInfo = {};
				let startIndex = 0;

				// Update Sushi Pool Infos
				const rewardPerBlock = results[startIndex++];
				const totalAllocPoint = results[startIndex++];
				let bentPrice = 0;
				let bentPriceBN = ethers.constants.Zero;
				Object.keys(POOLS.SushiPools.Pools).forEach(poolKey => {
					// Update Lp Price
					const tokenAddr = POOLS.SushiPools.Pools[poolKey].DepositAsset;
					const reserves = results[startIndex];
					const totalSupply = results[startIndex + 1];
					if (poolKey === 'BENT_DAI') {
						bentPrice = BigNumber.from(reserves.reserve0).isZero() ? 0 : BigNumber.from(reserves.reserve1).mul(10 ** 6).div(reserves.reserve0).toNumber() / 10 ** 6;
						dispatch(updateBentPrice(bentPrice));
					}
					const lpPrice = BigNumber.from(totalSupply).isZero() ? 0 : BigNumber.from(reserves.reserve1).mul(2).mul(10 ** 6).div(totalSupply).toNumber() / 10 ** 6;
					dispatch(updateTokenPrice({ tokenAddr, price: lpPrice }));

					// Update Sushi Pool Infos
					dispatch(updateBalance({ tokenAddr, balance: results[startIndex + 2] }))
					dispatch(updateCrvLpAllowance({ poolKey, allowance: results[startIndex + 3] }));
					dispatch(updateSushiLpDeposited({ poolKey, deposited: results[startIndex + 4].amount }));

					// Update Sushi Pool TVL
					bentPriceBN = utils.parseUnits(bentPrice.toString());
					const poolLpBalance = results[startIndex + 5];
					const lpPriceBN = utils.parseUnits(lpPrice.toString());
					const tvl = lpPriceBN.mul(poolLpBalance).div(BigNumber.from(10).pow(18))
					dispatch(updateSushiPoolTVL({ poolKey, tvl }))

					// Update Sushi Pool APR
					const poolAllocPoint = results[startIndex + 6].allocPoint;
					const apr = (BigNumber.from(poolLpBalance).isZero() || BigNumber.from(totalAllocPoint).isZero() || lpPriceBN.isZero()) ? 0 :
						bentPriceBN.mul(rewardPerBlock).mul(poolAllocPoint).mul(6400).mul(365).mul(100)
							.div(lpPriceBN).div(poolLpBalance).div(totalAllocPoint).toNumber();
					dispatch(updateSushiPoolApr({ poolKey, apr }));

					// Update Sushi Pool Rewards
					const pendingRewards = results[startIndex + 7];
					const earnedUsd = bentPriceBN.mul(pendingRewards).div(BigNumber.from(10).pow(TOKENS['BENT'].DECIMALS));
					dispatch(updateSushiPoolRewards({ poolKey, rewards: pendingRewards }));
					dispatch(updateSushiPoolEarnedUsd({ poolKey, earned: earnedUsd }));

					const depositedUsd = lpPriceBN.mul(results[startIndex + 4].amount).div(BigNumber.from(10).pow(18))
					dispatch(updateSushiLpDepositedUsd({ poolKey, deposited: depositedUsd }));
					startIndex += 8;
				});

				const bentSupply = results[startIndex++];
				const crvPoolLpBalances = {};
				// Update Curve Pool Infos
				Object.keys(POOLS.BentPools).forEach((poolKey, index) => {
					dispatch(updateBalance({ tokenAddr: POOLS.BentPools[poolKey].DepositAsset, balance: results[startIndex] }))
					dispatch(updateCrvLpAllowance({ poolKey, allowance: results[startIndex + 1] }));
					dispatch(updateTotalSupply({ tokenAddr: POOLS.BentPools[poolKey].DepositAsset, supply: results[startIndex + 2] }));
					crvPoolLpBalances[poolKey] = results[startIndex + 3]
					dispatch(updateCvxLpBalance({ poolKey, deposit: crvPoolLpBalances[poolKey] }))
					dispatch(updateCrvDeposit({ poolKey, deposit: results[startIndex + 4] }))
					dispatch(updateCrvPoolRewards({ poolKey, rewards: results[startIndex + 5] }));
					rewardsInfo[poolKey] = [
						results[startIndex + 6],
						results[startIndex + 7],
						results[startIndex + 8]
					];
					dispatch(updateBentPoolRewardsInfo({ poolKey, rewardsInfo: rewardsInfo[poolKey] }));

					let curvePoolEarned = ethers.constants.Zero;
					POOLS.BentPools[poolKey].RewardsAssets.forEach((key, index) => {
						const addr = TOKENS[key].ADDR.toLowerCase();
						const tokenPrice = addr.toLowerCase() === TOKENS['BENT'].ADDR.toLowerCase() ? bentPriceBN : getTokenPrice(tokenPrices, addr);
						curvePoolEarned = (results[startIndex + 5][index]) ?
							tokenPrice.mul(results[startIndex + 5][index]).add(curvePoolEarned) : curvePoolEarned
					});
					dispatch(updateCrvPoolEarnedUsd({ poolKey, earned: curvePoolEarned.div(BigNumber.from(10).pow(18)) }));
					lpTotalSupplies[poolKey] = results[startIndex + 2];
					depositedLpBalance[poolKey] = results[startIndex + 4];
					startIndex += 9;
				});

				const lpFiContractCalls: any[] = [];
				Object.keys(POOLS.BentPools).forEach(poolKey => {
					const lpFiContract = crvDepositLps[poolKey];
					for (let i = 0; i < POOLS.BentPools[poolKey].CrvCoinsLength; i++) {
						lpFiContractCalls.push(CrvFiLp.getCoins(lpFiContract, i));
						lpFiContractCalls.push(CrvFiLp.getBalances(lpFiContract, i));
					}
				})

				// Calculate TVL of each crv pools
				// Can't use multicall for crv contracts (due to invalid ABI of Vyper contracts)
				Promise.all(lpFiContractCalls).then((lpFiResults) => {
					let lpResIndex = 0;
					Object.keys(POOLS.BentPools).forEach(poolKey => {
						const lpTotalSupply = lpTotalSupplies[poolKey];
						if (BigNumber.from(lpTotalSupply).isZero()) {
							return;
						}
						let totalUsd = ethers.constants.Zero;
						for (let i = 0; i < POOLS.BentPools[poolKey].CrvCoinsLength; i++) {
							const addr = lpFiResults[lpResIndex++];
							const bal = lpFiResults[lpResIndex++];
							const lpPrice = getTokenPrice(tokenPrices, addr);
							totalUsd = lpPrice.mul(bal).div(BigNumber.from(10).pow(getTokenDecimals(addr)))
								.add(totalUsd);
						}
						const poolLpBalance = crvPoolLpBalances[poolKey]
						const tvl = totalUsd.mul(poolLpBalance).div(lpTotalSupply)
						dispatch(updateCrvPoolTVL({ poolKey, tvl }))
						dispatch(updateCrvPoolDepositedUsd({
							poolKey,
							deposited: totalUsd.mul(depositedLpBalance[poolKey]).div(lpTotalSupply)
						}))

						const [rewardsInfo1, rewardsInfo2, rewardsInfo3] = rewardsInfo[poolKey];
						let annualRewardsUsd = getAnnualReward(rewardsInfo1.rewardRate, rewardsInfo1.rewardToken, tokenPrices[rewardsInfo1.rewardToken.toLowerCase()]);
						annualRewardsUsd = getAnnualReward(rewardsInfo2.rewardRate, rewardsInfo2.rewardToken, tokenPrices[rewardsInfo2.rewardToken.toLowerCase()]).add(annualRewardsUsd);
						if (rewardsInfo3.rewardToken !== ethers.constants.AddressZero)
							annualRewardsUsd = getAnnualReward(rewardsInfo3.rewardRate, rewardsInfo3.rewardToken, tokenPrices[rewardsInfo3.rewardToken.toLowerCase()]).add(annualRewardsUsd);
						// Bent Rewards
						const bentMaxSupply = BigNumber.from(10).pow(8 + 18);
						const bentRewardRate = rewardsInfo2.rewardRate.mul(20).mul(bentMaxSupply.sub(bentSupply)).div(bentMaxSupply);
						annualRewardsUsd = getAnnualReward(bentRewardRate, TOKENS['BENT'].ADDR, bentPrice);
						const apr = (tvl.isZero() ? 0 : annualRewardsUsd.mul(10000).div(tvl).toNumber()) / 100;
						dispatch(updateCrvPoolApr({ poolKey, apr }))
					})
				})
			})
		})
	}, [dispatch, blockNumber, account, multicall, crvDepositLps])

	return null;
}