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
	getEthBalanceOf,
	getMultiBentSingleStaking,
} from 'utils';
import {
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
	updateSushiLpDeposited,
	updateSushiLpDepositedUsd,
	updateSushiPoolApr,
	updateSushiPoolEarnedUsd,
	updateSushiPoolTVL,
	updateTotalSupply,
	updateSushiPoolRewards,
	updateStakingPoolDeposited,
	updateStakingPoolTvl,
	updateStakingPoolAllowance,
	updateStakingPoolDepositedUsd,
	updateStakingPoolApr,
	updateStakingPoolAvgApr,
	updateStakingPoolEarningUsd,
	updateStakingPoolRewards,
	updateStakingPoolRewardsUsd,
	updateStakingPoolStakedBent,
	updateBentCvxAllowance,
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

			const bentPrice = tokenPrices[TOKENS['BENT'].ADDR.toLowerCase()];
			const bentPriceBN = utils.parseUnits(bentPrice.toString());

			console.log(`Updating contract states\nTime: ${Date.now()}\nAccount: ${account}\nBlockNumber: ${blockNumber}\nBent Price: ${bentPrice}`);

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

			// Add Bent Single Staking Calls
			const bentToken = getMultiERC20Contract(TOKENS['BENT'].ADDR);
			const bentSingleStaking = getMultiBentSingleStaking(POOLS.BentStaking.POOL);
			contractCalls.push(bentToken.balanceOf(accAddr));
			contractCalls.push(bentToken.allowance(accAddr, POOLS.BentStaking.POOL));
			contractCalls.push(bentSingleStaking.balanceOf(accAddr));
			contractCalls.push(bentSingleStaking.totalSupply());
			POOLS.BentStaking.RewardAssets.forEach((rewardToken, index) => {
				contractCalls.push(bentSingleStaking.rewardPools(index));
			})
			contractCalls.push(bentSingleStaking.pendingReward(accAddr));

			// Add BentCVX staking calls
			const cvxToken = getMultiERC20Contract(TOKENS['CVX'].ADDR);
			contractCalls.push(cvxToken.balanceOf(accAddr));
			contractCalls.push(cvxToken.allowance(accAddr, TOKENS['BENTCVX'].ADDR));

			// Add Curve contract calls
			contractCalls.push(bentToken.totalSupply());
			Object.keys(POOLS.BentPools).forEach(poolKey => {
				const lpTokenContract = getMultiERC20Contract(POOLS.BentPools[poolKey].DepositAsset);
				contractCalls.push(lpTokenContract.balanceOf(accAddr));
				contractCalls.push(lpTokenContract.allowance(accAddr, POOLS.BentPools[poolKey].POOL));
				contractCalls.push(lpTokenContract.totalSupply());
				if (!POOLS.BentPools[poolKey].isBentCvx) {
					const bentPoolMC = getMultiBentPool(poolKey);
					const cvxRewardPool = getMultiCvxRewardPool(POOLS.BentPools[poolKey].CvxRewardsAddr);

					contractCalls.push(cvxRewardPool.balanceOf(POOLS.BentPools[poolKey].POOL))
					contractCalls.push(bentPoolMC.balanceOf(accAddr));
					contractCalls.push(bentPoolMC.pendingReward(accAddr));
					contractCalls.push(bentPoolMC.rewardPools(0));
					contractCalls.push(bentPoolMC.rewardPools(1));
					contractCalls.push(bentPoolMC.rewardPools(2));
				} else {
					const masterChef = getMultiBentMasterChef(POOLS.BentPools[poolKey].POOL);
					// contractCalls.push(cvxRewardPool.balanceOf(POOLS.BentPools[poolKey].POOL))
					contractCalls.push(lpTokenContract.balanceOf(POOLS.BentPools[poolKey].POOL));
					contractCalls.push(masterChef.userInfo(0, accAddr));
					contractCalls.push(masterChef.pendingReward(0, accAddr));
					contractCalls.push(masterChef.poolInfo(0));
					contractCalls.push(masterChef.rewardPerBlock());
					contractCalls.push(masterChef.totalAllocPoint());
				}
			});

			multicall.all(contractCalls).then(results => {
				const lpTotalSupplies = {};
				const depositedLpBalance = {};
				const rewardsInfo = {};
				let startIndex = 0;

				// Update Sushi Pool Infos
				const rewardPerBlock = results[startIndex++];
				const totalAllocPoint = results[startIndex++];
				Object.keys(POOLS.SushiPools.Pools).forEach(poolKey => {
					// Update Lp Price
					const tokenAddr = POOLS.SushiPools.Pools[poolKey].DepositAsset;
					const reserves = results[startIndex];
					const totalSupply = results[startIndex + 1];
					const lpPrice = BigNumber.from(totalSupply).isZero() ? 0 : BigNumber.from(reserves.reserve1).mul(2).mul(10 ** 6).div(totalSupply).toNumber() / 10 ** 6;
					dispatch(updateTokenPrice({ tokenAddr, price: lpPrice }));

					// Update Sushi Pool Infos
					dispatch(updateBalance({ tokenAddr, balance: results[startIndex + 2] }))
					dispatch(updateCrvLpAllowance({ poolKey, allowance: results[startIndex + 3] }));
					dispatch(updateSushiLpDeposited({ poolKey, deposited: results[startIndex + 4].amount }));

					// Update Sushi Pool TVL
					const poolLpBalance = results[startIndex + 5];
					const lpPriceBN = utils.parseUnits(lpPrice.toString());
					const tvl = lpPriceBN.mul(poolLpBalance).div(BigNumber.from(10).pow(18))
					dispatch(updateSushiPoolTVL({ poolKey, tvl }))

					// Update Sushi Pool APR
					const poolAllocPoint = results[startIndex + 6].allocPoint;
					const apr = (BigNumber.from(poolLpBalance).isZero() || BigNumber.from(totalAllocPoint).isZero() || lpPriceBN.isZero()) ? 0 :
						bentPriceBN.mul(rewardPerBlock).mul(poolAllocPoint).mul(6400).mul(365).mul(10000)
							.div(lpPriceBN).div(poolLpBalance).div(totalAllocPoint).toNumber() / 100;
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

				// Update Bent Staking Pool Infos
				dispatch(updateBalance({ tokenAddr: TOKENS['BENT'].ADDR, balance: results[startIndex++] }));
				dispatch(updateStakingPoolAllowance(results[startIndex++]));

				const bentStaked = results[startIndex++];
				const totalBentStaked = results[startIndex++];
				const bentPoolTVL = bentPriceBN.mul(totalBentStaked).div(BigNumber.from(10).pow(18));
				dispatch(updateStakingPoolDeposited(bentStaked));
				dispatch(updateStakingPoolStakedBent(totalBentStaked));
				dispatch(updateStakingPoolDepositedUsd(bentPriceBN.mul(bentStaked).div(BigNumber.from(10).pow(18))))
				dispatch(updateStakingPoolTvl(bentPoolTVL));

				let bentRewardsUsd = ethers.constants.Zero;
				POOLS.BentStaking.RewardAssets.forEach((rewardToken, index) => {
					const rewardsInfo = results[startIndex++];
					const rewardUsd = getAnnualReward(rewardsInfo.rewardRate, rewardsInfo.rewardToken, tokenPrices[rewardsInfo.rewardToken.toLowerCase()]);
					const apr = (bentPoolTVL.isZero() ? 0 : rewardUsd.mul(10000).div(bentPoolTVL).toNumber()) / 100;
					dispatch(updateStakingPoolApr({ tokenAddr: TOKENS[rewardToken].ADDR.toLowerCase(), apr }))
					bentRewardsUsd = bentRewardsUsd.add(rewardUsd);
				})
				const bentAvgApr = (bentPoolTVL.isZero() ? 0 : bentRewardsUsd.mul(10000).div(bentPoolTVL).toNumber()) / 100;
				dispatch(updateStakingPoolAvgApr(bentAvgApr));

				let bentTotalEarned = ethers.constants.Zero;
				const bentPendingRewards = results[startIndex++];
				POOLS.BentStaking.RewardAssets.forEach((rewardToken, index) => {
					const rewardUsd = utils.parseEther(tokenPrices[TOKENS[rewardToken].ADDR.toLowerCase()].toString())
						.mul(bentPendingRewards[index]).div(BigNumber.from(10).pow(getTokenDecimals(TOKENS[rewardToken].ADDR)));
					bentTotalEarned = bentTotalEarned.add(rewardUsd);
					dispatch(updateStakingPoolRewardsUsd({ tokenAddr: TOKENS[rewardToken].ADDR.toLowerCase(), rewardUsd }));
					dispatch(updateStakingPoolRewards({ tokenAddr: TOKENS[rewardToken].ADDR.toLowerCase(), reward: bentPendingRewards[index] }));
				});
				dispatch(updateStakingPoolEarningUsd(bentTotalEarned));

				// Update BentCVX Staking Pool Infos
				dispatch(updateBalance({ tokenAddr: TOKENS['CVX'].ADDR, balance: results[startIndex++] }));
				dispatch(updateBentCvxAllowance(results[startIndex++]));

				// Update Curve Pool Infos
				const bentSupply = results[startIndex++];
				const crvPoolLpBalances = {};
				let pendingRewards: BigNumber[] = [];
				const bentCvxChefTotalAllocPoint = {};
				const bentCvxChefRewardPerBlock = {};
				const bentCvxChefPoolInfo = {};
				Object.keys(POOLS.BentPools).forEach((poolKey, index) => {
					dispatch(updateBalance({ tokenAddr: POOLS.BentPools[poolKey].DepositAsset, balance: results[startIndex] }))
					dispatch(updateCrvLpAllowance({ poolKey, allowance: results[startIndex + 1] }));
					lpTotalSupplies[poolKey] = results[startIndex + 2];
					crvPoolLpBalances[poolKey] = results[startIndex + 3];
					if (POOLS.BentPools[poolKey].isBentCvx) {
						depositedLpBalance[poolKey] = results[startIndex + 4].amount;
						pendingRewards = [results[startIndex + 5]];
						rewardsInfo[poolKey] = [TOKENS['BENT'].ADDR.toLowerCase()];
						bentCvxChefPoolInfo[poolKey] = results[startIndex + 6]
						bentCvxChefRewardPerBlock[poolKey] = results[startIndex + 7]
						bentCvxChefTotalAllocPoint[poolKey] = results[startIndex + 8]
					} else {
						depositedLpBalance[poolKey] = results[startIndex + 4];
						pendingRewards = results[startIndex + 5]
						rewardsInfo[poolKey] = [
							results[startIndex + 6],
							results[startIndex + 7],
							results[startIndex + 8]
						];
					}
					dispatch(updateTotalSupply({ tokenAddr: POOLS.BentPools[poolKey].DepositAsset, supply: lpTotalSupplies[poolKey] }));
					dispatch(updateCrvDeposit({ poolKey, deposit: depositedLpBalance[poolKey] }))
					dispatch(updateCrvPoolRewards({ poolKey, rewards: pendingRewards }));
					dispatch(updateBentPoolRewardsInfo({ poolKey, rewardsInfo: rewardsInfo[poolKey] }));
					let curvePoolEarned = ethers.constants.Zero;
					POOLS.BentPools[poolKey].RewardsAssets.forEach((key, index) => {
						const addr = TOKENS[key].ADDR.toLowerCase();
						const tokenPrice = getTokenPrice(tokenPrices, addr);
						curvePoolEarned = (pendingRewards[index]) ?
							tokenPrice.mul(pendingRewards[index]).add(curvePoolEarned) : curvePoolEarned
					});
					dispatch(updateCrvPoolEarnedUsd({ poolKey, earned: curvePoolEarned.div(BigNumber.from(10).pow(18)) }));
					startIndex += 9;
				});

				const lpFiContractCalls: any[] = [];
				Object.keys(POOLS.BentPools).forEach(poolKey => {
					const lpFiContract = crvDepositLps[poolKey];
					for (let i = 0; i < POOLS.BentPools[poolKey].CrvCoinsLength; i++) {
						lpFiContractCalls.push(CrvFiLp.getCoins(lpFiContract, i));
						lpFiContractCalls.push(CrvFiLp.getBalances(lpFiContract, i));
						lpFiContractCalls.push(getEthBalanceOf(lpFiContract.options.address));
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
							const bal = addr === '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' ? lpFiResults[lpResIndex++ + 1] : lpFiResults[lpResIndex++];
							const tokenPrice = getTokenPrice(tokenPrices, addr);
							totalUsd = tokenPrice.mul(bal).div(BigNumber.from(10).pow(getTokenDecimals(addr))).add(totalUsd);
							lpResIndex++;
						}
						const poolLpBalance = crvPoolLpBalances[poolKey]
						const tvl = totalUsd.mul(poolLpBalance).div(lpTotalSupply)
						const lpPrice = totalUsd.div(lpTotalSupply);
						dispatch(updateCrvPoolTVL({ poolKey, tvl }))
						dispatch(updateCrvPoolDepositedUsd({
							poolKey,
							deposited: totalUsd.mul(depositedLpBalance[poolKey]).div(lpTotalSupply)
						}))

						if (POOLS.BentPools[poolKey].isBentCvx) {
							const apr = (BigNumber.from(poolLpBalance).isZero() || lpPrice.isZero()) ? 0 :
								bentPriceBN.mul(bentCvxChefRewardPerBlock[poolKey]).mul(6400).mul(365).mul(10000)
									.div(tvl).div(BigNumber.from(10).pow(18)).toNumber() / 100;
							dispatch(updateCrvPoolApr({ poolKey, apr }));
						} else {
							const [rewardsInfo1, rewardsInfo2, rewardsInfo3] = rewardsInfo[poolKey];
							let annualRewardsUsd = getAnnualReward(rewardsInfo1.rewardRate, rewardsInfo1.rewardToken, tokenPrices[rewardsInfo1.rewardToken.toLowerCase()]);
							annualRewardsUsd = getAnnualReward(rewardsInfo2.rewardRate, rewardsInfo2.rewardToken, tokenPrices[rewardsInfo2.rewardToken.toLowerCase()]).add(annualRewardsUsd);
							if (rewardsInfo3.rewardToken !== ethers.constants.AddressZero)
								annualRewardsUsd = getAnnualReward(rewardsInfo3.rewardRate, rewardsInfo3.rewardToken, tokenPrices[rewardsInfo3.rewardToken.toLowerCase()]).add(annualRewardsUsd);

							// Bent Rewards
							const bentMaxSupply = BigNumber.from(10).pow(8 + 18);
							const bentRewardRate = rewardsInfo2.rewardRate.mul(20).mul(bentMaxSupply.sub(bentSupply)).div(bentMaxSupply);
							annualRewardsUsd = getAnnualReward(bentRewardRate, TOKENS['BENT'].ADDR, bentPrice).add(annualRewardsUsd);
							const apr = (tvl.isZero() ? 0 : annualRewardsUsd.mul(10000).div(tvl).toNumber()) / 100;
							dispatch(updateCrvPoolApr({ poolKey, apr }))
						}
					})
				})
			})
		})
	}, [dispatch, blockNumber, account, multicall, crvDepositLps])

	return null;
}