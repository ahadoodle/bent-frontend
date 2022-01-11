/* eslint-disable @typescript-eslint/no-explicit-any*/
import { ethers, BigNumber, utils } from 'ethers';
import { POOLS, TOKENS } from 'constant';
import { useActiveWeb3React, useBlockNumber } from 'hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
	getMultiBentPool,
	getMultiERC20Contract,
	getTokenDecimals,
	getAnnualReward,
	getMultiSushiPair,
	getMultiBentMasterChef,
	getPrice,
	getTokenPrice,
	getMultiBentSingleStaking,
	getCirculatingSupply,
	getMultiCvxLocker,
	getMultiBentCvxStaking,
	getMultiBentCvxRewarderCvx,
	getMultiBentCvxRewarderBent,
	getMultiBentCvxRewarderMC,
	getCrvFactoryInfo,
	getCrvCryptoFactoryInfo,
	MulticallProvider,
	getMultiCvxRewardPool,
	getMultiCvxToken,
	getCrvApys,
} from 'utils';
import {
	updateContractInfo,
} from './actions';
import { BentPoolReward } from './reducer';

export default function Updater(): null {
	const dispatch = useDispatch();
	const blockNumber = useBlockNumber();
	const multicall = MulticallProvider;
	const { account } = useActiveWeb3React();

	useEffect(() => {
		const tokenAddrs = Object.keys(TOKENS).map(token => TOKENS[token].ADDR);
		Promise.all([
			getPrice(tokenAddrs),
			getCirculatingSupply(),
			getCrvFactoryInfo(),
			getCrvCryptoFactoryInfo(),
			getCrvApys(),
		]).then(([tokenPrices, bentCirculatingSupply, crvPoolsInfo, crvCryptoPoolsInfo, crvApys]) => {
			const bentPrice = tokenPrices[TOKENS['BENT'].ADDR.toLowerCase()];
			const bentPriceBN = utils.parseUnits(bentPrice.toString());
			const balances: Record<string, BigNumber> = {};
			const totalSupplies: Record<string, BigNumber> = {};
			const crvDeposit: Record<string, BigNumber> = {};
			const bentPoolRewardsInfo: Record<string, BentPoolReward[]> = {};
			const crvLpAllowance: Record<string, BigNumber> = {};
			const crvTvl: Record<string, BigNumber> = {};
			const crvApr: Record<string, number> = {};
			const crvPoolRewards: Record<string, BigNumber[]> = {};
			const crvEarnedUsd: Record<string, BigNumber> = {};
			const crvDepositedUsd: Record<string, BigNumber> = {};
			const crvProjectedApr: Record<string, {
				baseCrvvApr: BigNumber;
				crvvApr: BigNumber;
				cvxvApr: BigNumber;
				bentApr: BigNumber;
				additionalRewardvApr: BigNumber;
			}> = {};

			const sushiTvl: Record<string, BigNumber> = {};
			const sushiApr: Record<string, number> = {};
			const sushiLpDeposited: Record<string, BigNumber> = {};
			const sushiDepositedUsd: Record<string, BigNumber> = {};
			const sushiEarnedUsd: Record<string, BigNumber> = {};
			const sushiRewards: Record<string, BigNumber> = {};

			let bentStaked: BigNumber = ethers.constants.Zero;
			let bentStakedUsd: BigNumber = ethers.constants.Zero;
			let bentTvl: BigNumber = ethers.constants.Zero;
			let bentTotalStaked: BigNumber = ethers.constants.Zero;
			let bentAllowance: BigNumber = ethers.constants.Zero;
			let bentEarnedUsd: BigNumber = ethers.constants.Zero;
			let bentAvgApr = 0;
			const bentAprs: Record<string, number> = {};
			const bentRewards: Record<string, BigNumber> = {};
			const bentRewardsUsd: Record<string, BigNumber> = {};

			let bentCvxAllowance = ethers.constants.Zero;
			let vlCvxBalance = ethers.constants.Zero;
			let bentCvxStakingAllowance = ethers.constants.Zero;
			let bentCvxStaked = ethers.constants.Zero;
			let bentCvxTotalStaked = ethers.constants.Zero;
			let bentCvxTvl = ethers.constants.Zero;
			const bentCvxRewards: Record<string, BigNumber[]> = {};
			const bentCvxRewardsUsd: Record<string, BigNumber[]> = {};
			const bentCvxEarned: Record<string, BigNumber> = {};
			const bentCvxAprs: Record<string, number[]> = {};
			const bentCvxPoolAprs: Record<string, number> = {};
			let bentCvxAvgApr = 0;

			console.log(`Updating contract states\nTime: ${Date.now()}\nAccount: ${account}\nBlockNumber: ${blockNumber}\nBent Price: ${bentPrice}`);

			const accAddr = account || ethers.constants.AddressZero;
			const contractCalls: any[] = [];

			const vlCvxLocker = getMultiCvxLocker();
			contractCalls.push(vlCvxLocker.lockedBalanceOf(POOLS.Multisig))

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
			const cvxToken = getMultiCvxToken();
			const bentCvxToken = getMultiERC20Contract(TOKENS['BENTCVX'].ADDR);
			const bentCvxStaking = getMultiBentCvxStaking();
			const bentCvxRewarderCvx = getMultiBentCvxRewarderCvx();
			const bentCvxRewarderBent = getMultiBentCvxRewarderBent();
			const bentCvxRewarderMC = getMultiBentCvxRewarderMC();
			contractCalls.push(cvxToken.balanceOf(accAddr));
			contractCalls.push(cvxToken.allowance(accAddr, TOKENS['BENTCVX'].ADDR));
			contractCalls.push(bentCvxToken.balanceOf(accAddr));
			contractCalls.push(bentCvxToken.allowance(accAddr, POOLS.BentCvxStaking.BentCvxStaking));
			contractCalls.push(bentCvxStaking.balanceOf(accAddr));
			contractCalls.push(bentCvxStaking.totalSupply());
			contractCalls.push(bentCvxRewarderCvx.pendingReward(accAddr));
			contractCalls.push(bentCvxRewarderBent.pendingReward(accAddr));
			POOLS.BentCvxStaking.BentCvxRewarderCvx.RewardsAssets.forEach((rewardToken, index) => {
				contractCalls.push(bentCvxRewarderCvx.rewardPools(POOLS.BentCvxStaking.BentCvxRewarderCvx.ClaimIndex[index]));
			})
			POOLS.BentCvxStaking.BentCvxRewarderBent.RewardsAssets.forEach((rewardToken, index) => {
				contractCalls.push(bentCvxRewarderBent.rewardPools(index));
			})
			contractCalls.push(bentCvxRewarderMC.pendingReward(accAddr));
			contractCalls.push(bentCvxRewarderMC.rewardPerBlock());

			// Add Curve contract calls
			contractCalls.push(bentToken.totalSupply());
			contractCalls.push(cvxToken.maxSupply());
			contractCalls.push(cvxToken.totalSupply());
			Object.keys(POOLS.BentPools).forEach(poolKey => {
				const lpTokenContract = getMultiERC20Contract(POOLS.BentPools[poolKey].DepositAsset);
				contractCalls.push(lpTokenContract.balanceOf(accAddr));
				contractCalls.push(lpTokenContract.allowance(accAddr, POOLS.BentPools[poolKey].POOL));
				contractCalls.push(lpTokenContract.totalSupply());
				if (!POOLS.BentPools[poolKey].isBentCvx) {
					const bentPoolMC = getMultiBentPool(poolKey);

					contractCalls.push(bentPoolMC.totalSupply());
					contractCalls.push(bentPoolMC.balanceOf(accAddr));
					contractCalls.push(bentPoolMC.pendingReward(accAddr));
					contractCalls.push(bentPoolMC.rewardPools(0));
					contractCalls.push(bentPoolMC.rewardPools(1));
					contractCalls.push(bentPoolMC.rewardPools(2));
					contractCalls.push(bentPoolMC.endRewardBlock());

					const cvxRewardPool = getMultiCvxRewardPool(POOLS.BentPools[poolKey].CvxRewardsPool);
					contractCalls.push(cvxRewardPool.rewardRate());
					contractCalls.push(cvxRewardPool.rewardToken());
					contractCalls.push(cvxRewardPool.totalSupply());
					contractCalls.push(cvxRewardPool.periodFinish());
					if (POOLS.BentPools[poolKey].ExtCvxRewardPool) {
						const cvxExtRewardPool = getMultiCvxRewardPool(POOLS.BentPools[poolKey].ExtCvxRewardPool || '');
						contractCalls.push(cvxExtRewardPool.rewardRate());
						contractCalls.push(cvxExtRewardPool.rewardToken());
						contractCalls.push(cvxExtRewardPool.periodFinish());
					}
				} else {
					const masterChef = getMultiBentMasterChef(POOLS.BentPools[poolKey].POOL);
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

				vlCvxBalance = results[startIndex++];

				// Update Sushi Pool Infos
				const rewardPerBlock = results[startIndex++];
				const totalAllocPoint = results[startIndex++];
				Object.keys(POOLS.SushiPools.Pools).forEach(poolKey => {
					// Update Lp Price
					const tokenAddr = POOLS.SushiPools.Pools[poolKey].DepositAsset;
					const reserves = results[startIndex];
					const totalSupply = results[startIndex + 1];
					const lpPrice = BigNumber.from(totalSupply).isZero() ? 0 : BigNumber.from(reserves.reserve1).mul(2).mul(10 ** 6).div(totalSupply).toNumber() / 10 ** 6;
					tokenPrices[tokenAddr.toLowerCase()] = lpPrice;

					// Update Sushi Pool Infos
					balances[tokenAddr.toLowerCase()] = results[startIndex + 2];
					crvLpAllowance[poolKey] = results[startIndex + 3];
					sushiLpDeposited[poolKey] = results[startIndex + 4].amount;

					// Update Sushi Pool TVL
					const poolLpBalance = results[startIndex + 5];
					const lpPriceBN = utils.parseUnits(lpPrice.toString());
					sushiTvl[poolKey] = lpPriceBN.mul(poolLpBalance).div(BigNumber.from(10).pow(18))

					// Update Sushi Pool APR
					const poolAllocPoint = results[startIndex + 6].allocPoint;
					sushiApr[poolKey] = (BigNumber.from(poolLpBalance).isZero() || BigNumber.from(totalAllocPoint).isZero() || lpPriceBN.isZero()) ? 0 :
						bentPriceBN.mul(rewardPerBlock).mul(poolAllocPoint).mul(6400).mul(365).mul(10000)
							.div(lpPriceBN).div(poolLpBalance).div(totalAllocPoint).toNumber() / 100;

					// Update Sushi Pool Rewards
					const pendingRewards = results[startIndex + 7];
					sushiRewards[poolKey] = pendingRewards;
					sushiEarnedUsd[poolKey] = bentPriceBN.mul(pendingRewards).div(BigNumber.from(10).pow(TOKENS['BENT'].DECIMALS));
					sushiDepositedUsd[poolKey] = lpPriceBN.mul(results[startIndex + 4].amount).div(BigNumber.from(10).pow(18))
					startIndex += 8;
				});

				// Update Bent Staking Pool Infos
				balances[TOKENS['BENT'].ADDR.toLowerCase()] = results[startIndex++];
				bentAllowance = results[startIndex++];
				bentStaked = results[startIndex++];
				bentStakedUsd = bentPriceBN.mul(bentStaked).div(BigNumber.from(10).pow(18));
				bentTotalStaked = results[startIndex++];
				bentTvl = bentPriceBN.mul(bentTotalStaked).div(BigNumber.from(10).pow(18));

				let bentTokenRewardsUsd = ethers.constants.Zero;
				POOLS.BentStaking.RewardAssets.forEach((rewardToken, index) => {
					const rewardsInfo = results[startIndex++];
					const rewardUsd = getAnnualReward(rewardsInfo.rewardRate, rewardsInfo.rewardToken, tokenPrices[rewardsInfo.rewardToken.toLowerCase()]);
					bentAprs[TOKENS[rewardToken].ADDR.toLowerCase()] = (bentTvl.isZero() ? 0 : rewardUsd.mul(10000).div(bentTvl).toNumber()) / 100;
					bentTokenRewardsUsd = bentTokenRewardsUsd.add(rewardUsd);
				})
				bentAvgApr = (bentTvl.isZero() ? 0 : bentTokenRewardsUsd.mul(10000).div(bentTvl).toNumber()) / 100;

				const bentPendingRewards = results[startIndex++];
				POOLS.BentStaking.RewardAssets.forEach((rewardToken, index) => {
					const rewardUsd = utils.parseEther(tokenPrices[TOKENS[rewardToken].ADDR.toLowerCase()].toString())
						.mul(bentPendingRewards[index]).div(BigNumber.from(10).pow(getTokenDecimals(TOKENS[rewardToken].ADDR)));
					bentEarnedUsd = bentEarnedUsd.add(rewardUsd);
					bentRewardsUsd[TOKENS[rewardToken].ADDR.toLowerCase()] = rewardUsd;
					bentRewards[TOKENS[rewardToken].ADDR.toLowerCase()] = bentPendingRewards[index];
				});

				// Update BentCVX Staking Pool Infos
				balances[TOKENS['CVX'].ADDR.toLowerCase()] = results[startIndex++];
				bentCvxAllowance = results[startIndex++];
				balances[TOKENS['BENTCVX'].ADDR.toLowerCase()] = results[startIndex++];
				bentCvxStakingAllowance = results[startIndex++];
				bentCvxStaked = results[startIndex++];
				bentCvxTotalStaked = results[startIndex++];
				bentCvxTvl = utils.parseEther(tokenPrices[TOKENS.CVX.ADDR.toLowerCase()].toString()).mul(bentCvxTotalStaked)
					.div(BigNumber.from(10).pow(getTokenDecimals(TOKENS.BENTCVX.ADDR)));
				bentCvxRewards['CVX'] = results[startIndex++];
				bentCvxRewards['BENT'] = results[startIndex++];
				bentCvxEarned['CVX'] = ethers.constants.Zero;
				bentCvxEarned['BENT'] = ethers.constants.Zero;
				let totalBentCvxAnnualReward = ethers.constants.Zero;
				let bentCvxPoolAnnualReward = ethers.constants.Zero;
				POOLS.BentCvxStaking.BentCvxRewarderCvx.RewardsAssets.forEach((tokenKey, index) => {
					const tokenPrice = tokenPrices[TOKENS[tokenKey].ADDR.toLowerCase()];
					const rewardUsd = utils.parseEther(tokenPrice.toString())
						.mul(bentCvxRewards['CVX'][index]).div(BigNumber.from(10).pow(getTokenDecimals(TOKENS[tokenKey].ADDR)));
					bentCvxEarned['CVX'] = bentCvxEarned['CVX'].add(rewardUsd);
					if (!bentCvxRewardsUsd['CVX']) bentCvxRewardsUsd['CVX'] = [];
					bentCvxRewardsUsd['CVX'].push(rewardUsd);

					const rewardsInfo = results[startIndex++];
					const annualReward = getAnnualReward(rewardsInfo.rewardRate, rewardsInfo.rewardToken, tokenPrice);
					if (!bentCvxAprs['CVX']) bentCvxAprs['CVX'] = [];
					bentCvxAprs['CVX'].push((bentCvxTvl.isZero() ? 0 : annualReward.mul(10000).div(bentCvxTvl).toNumber()) / 100);
					totalBentCvxAnnualReward = totalBentCvxAnnualReward.add(annualReward);
					bentCvxPoolAnnualReward = bentCvxPoolAnnualReward.add(annualReward);
				})
				bentCvxPoolAprs['CVX'] = (bentCvxTvl.isZero() ? 0 : bentCvxPoolAnnualReward.mul(10000).div(bentCvxTvl).toNumber()) / 100;
				bentCvxPoolAnnualReward = ethers.constants.Zero;
				POOLS.BentCvxStaking.BentCvxRewarderBent.RewardsAssets.forEach((tokenKey, index) => {
					const tokenPrice = tokenKey === 'BENTCVX' ? tokenPrices[TOKENS.CVX.ADDR.toLowerCase()] : tokenPrices[TOKENS[tokenKey].ADDR.toLowerCase()]
					const rewardUsd = utils.parseEther(tokenPrice.toString())
						.mul(bentCvxRewards['BENT'][index]).div(BigNumber.from(10).pow(getTokenDecimals(TOKENS[tokenKey].ADDR)));
					bentCvxEarned['BENT'] = bentCvxEarned['BENT'].add(rewardUsd);
					if (!bentCvxRewardsUsd['BENT']) bentCvxRewardsUsd['BENT'] = [];
					bentCvxRewardsUsd['BENT'].push(rewardUsd);

					const rewardsInfo = results[startIndex++];
					const annualReward = getAnnualReward(rewardsInfo.rewardRate, rewardsInfo.rewardToken, tokenPrice);
					if (!bentCvxAprs['BENT']) bentCvxAprs['BENT'] = [];
					bentCvxAprs['BENT'].push((bentCvxTvl.isZero() ? 0 : annualReward.mul(10000).div(bentCvxTvl).toNumber()) / 100);
					totalBentCvxAnnualReward = totalBentCvxAnnualReward.add(annualReward);
					bentCvxPoolAnnualReward = bentCvxPoolAnnualReward.add(annualReward);
				})
				bentCvxPoolAprs['BENT'] = (bentCvxTvl.isZero() ? 0 : bentCvxPoolAnnualReward.mul(10000).div(bentCvxTvl).toNumber()) / 100;
				bentCvxRewards['MC'] = results[startIndex++];
				bentCvxEarned['MC'] = bentPriceBN.mul(bentCvxRewards['MC'][0]).div(BigNumber.from(10).pow(getTokenDecimals(TOKENS.BENT.ADDR)));
				const bentCvxMCRewardPerBlock = results[startIndex++];
				const bentCvxMCAnnualReward = getAnnualReward(bentCvxMCRewardPerBlock, TOKENS.BENT.ADDR, bentPrice, false);
				bentCvxPoolAprs['MC'] = (bentCvxTvl.isZero() ? 0 : bentCvxMCAnnualReward.mul(10000).div(bentCvxTvl).toNumber()) / 100;
				totalBentCvxAnnualReward = totalBentCvxAnnualReward.add(bentCvxMCAnnualReward);
				bentCvxAvgApr = (bentCvxTvl.isZero() ? 0 : totalBentCvxAnnualReward.mul(10000).div(bentCvxTvl).toNumber()) / 100;

				// Update Curve Pool Infos
				const bentSupply = results[startIndex++];
				const cvxMaxSupply = results[startIndex++];
				const cvxTotalSupply = results[startIndex++];
				const crvPoolLpBalances = {};
				let pendingRewards: BigNumber[] = [];
				const bentCvxChefTotalAllocPoint = {};
				const bentCvxChefRewardPerBlock = {};
				const bentCvxChefPoolInfo = {};
				const endRewardBlock = {};
				const cvxPoolRewardRate = {};
				const cvxPoolRewardToken = {};
				const cvxPoolTotalSupply = {};
				const cvxPoolPeriodFinish = {};
				const cvxExtPoolRewardRate = {};
				const cvxExtPoolRewardToken = {};
				const cvxExtPoolPeriodFinish = {};
				const bentMaxSupply = BigNumber.from(10).pow(8 + 18);

				Object.keys(POOLS.BentPools).forEach((poolKey, index) => {
					balances[POOLS.BentPools[poolKey].DepositAsset.toLowerCase()] = results[startIndex++];
					crvLpAllowance[poolKey] = results[startIndex++];
					lpTotalSupplies[poolKey] = results[startIndex++];
					crvPoolLpBalances[poolKey] = results[startIndex++];
					if (POOLS.BentPools[poolKey].isBentCvx) {
						depositedLpBalance[poolKey] = results[startIndex++].amount;
						pendingRewards = [results[startIndex++]];
						rewardsInfo[poolKey] = [TOKENS['BENT'].ADDR.toLowerCase()];
						bentCvxChefPoolInfo[poolKey] = results[startIndex++]
						bentCvxChefRewardPerBlock[poolKey] = results[startIndex++]
						bentCvxChefTotalAllocPoint[poolKey] = results[startIndex++]
					} else {
						depositedLpBalance[poolKey] = results[startIndex++];
						pendingRewards = results[startIndex++]
						rewardsInfo[poolKey] = [
							results[startIndex++],
							results[startIndex++],
							results[startIndex++]
						];
						endRewardBlock[poolKey] = results[startIndex++];
						cvxPoolRewardRate[poolKey] = results[startIndex++];
						cvxPoolRewardToken[poolKey] = results[startIndex++];
						cvxPoolTotalSupply[poolKey] = results[startIndex++];
						cvxPoolPeriodFinish[poolKey] = results[startIndex++];
						if (POOLS.BentPools[poolKey].ExtCvxRewardPool) {
							cvxExtPoolRewardRate[poolKey] = results[startIndex++];
							cvxExtPoolRewardToken[poolKey] = results[startIndex++];
							cvxExtPoolPeriodFinish[poolKey] = results[startIndex++];
						}
					}
					totalSupplies[POOLS.BentPools[poolKey].DepositAsset.toLowerCase()] = lpTotalSupplies[poolKey];
					crvDeposit[poolKey] = depositedLpBalance[poolKey];
					crvPoolRewards[poolKey] = pendingRewards;
					bentPoolRewardsInfo[poolKey] = rewardsInfo[poolKey];
					let curvePoolEarned = ethers.constants.Zero;
					POOLS.BentPools[poolKey].RewardsAssets.forEach((key, index) => {
						const addr = TOKENS[key].ADDR.toLowerCase();
						const tokenPrice = getTokenPrice(tokenPrices, addr);
						curvePoolEarned = (pendingRewards[index]) ?
							tokenPrice.mul(pendingRewards[index]).add(curvePoolEarned) : curvePoolEarned
					});
					crvEarnedUsd[poolKey] = curvePoolEarned.div(BigNumber.from(10).pow(18))
				});
				Object.keys(POOLS.BentPools).forEach(poolKey => {
					const poolData = crvPoolsInfo[POOLS.BentPools[poolKey].DepositAsset.toLowerCase()];
					let tvl = ethers.constants.Zero;
					if (POOLS.BentPools[poolKey].isCryptoPool) {
						const lpPrice = utils.parseEther(crvCryptoPoolsInfo[POOLS.BentPools[poolKey].DepositAsset.toLowerCase()].lpPrice.toString());
						tvl = lpPrice.mul(crvPoolLpBalances[poolKey]).div(BigNumber.from(10).pow(18));
						crvDepositedUsd[poolKey] = lpPrice.mul(depositedLpBalance[poolKey]).div(BigNumber.from(10).pow(18));
					} else if (POOLS.BentPools[poolKey].isBentCvx) {
						// bentCvx pool (calculating tvl info here because bentCvx price is zero on crv api)
						tvl = BigNumber.from(poolData.coins[0].poolBalance).add(BigNumber.from(poolData.coins[1].poolBalance))
							.mul(utils.parseEther(poolData.coins[0].usdPrice.toString())).div(BigNumber.from(10).pow(18));
						crvDepositedUsd[poolKey] = tvl.mul(depositedLpBalance[poolKey]).div(poolData.totalSupply);
					} else {
						if (POOLS.BentPools[poolKey].DepositAsset === '0x06325440d014e39736583c165c2963ba99faf14e') {
							// STETH Pool
							tvl = getTokenPrice(tokenPrices, 'ETH').mul(crvPoolLpBalances[poolKey]).div(BigNumber.from(10).pow(18));
							crvDepositedUsd[poolKey] = getTokenPrice(tokenPrices, 'ETH').mul(depositedLpBalance[poolKey]).div(BigNumber.from(10).pow(18));
						}
						else {
							if (!poolData) return;
							tvl = utils.parseEther(poolData.usdTotal.toString()).mul(crvPoolLpBalances[poolKey]).div(poolData.totalSupply);
							crvDepositedUsd[poolKey] = utils.parseEther(poolData.usdTotal.toString()).mul(depositedLpBalance[poolKey]).div(poolData.totalSupply);
						}
					}
					crvTvl[poolKey] = tvl;
					if (POOLS.BentPools[poolKey].isBentCvx) {
						const apr = (tvl.isZero()) ? 0 :
							bentPriceBN.mul(bentCvxChefRewardPerBlock[poolKey]).mul(6400).mul(365).mul(10000)
								.div(tvl).div(BigNumber.from(10).pow(18)).toNumber() / 100;
						crvApr[poolKey] = apr;
					} else {
						if (blockNumber > endRewardBlock[poolKey]) {
							crvApr[poolKey] = 0;
							return;
						}
						const [rewardsInfo1, rewardsInfo2, rewardsInfo3] = rewardsInfo[poolKey];
						let annualRewardsUsd = getAnnualReward(rewardsInfo1.rewardRate, rewardsInfo1.rewardToken, tokenPrices[rewardsInfo1.rewardToken.toLowerCase()]);
						annualRewardsUsd = getAnnualReward(rewardsInfo2.rewardRate, rewardsInfo2.rewardToken, tokenPrices[rewardsInfo2.rewardToken.toLowerCase()]).add(annualRewardsUsd);
						if (rewardsInfo3.rewardToken !== ethers.constants.AddressZero)
							annualRewardsUsd = getAnnualReward(rewardsInfo3.rewardRate, rewardsInfo3.rewardToken, tokenPrices[rewardsInfo3.rewardToken.toLowerCase()]).add(annualRewardsUsd);

						// Bent Rewards
						const bentRewardRate = rewardsInfo2.rewardRate.mul(20).mul(bentMaxSupply.sub(bentSupply)).div(bentMaxSupply);
						annualRewardsUsd = getAnnualReward(bentRewardRate, TOKENS['BENT'].ADDR, bentPrice).add(annualRewardsUsd);
						const apr = (tvl.isZero() ? 0 : annualRewardsUsd.mul(10000).div(tvl).toNumber()) / 100;
						crvApr[poolKey] = apr;
					}

					// Projected APR = Current APR of Convex
					if (!POOLS.BentPools[poolKey].isBentCvx && !POOLS.BentPools[poolKey].isLegacy) {
						const currentTimestamp = Date.now() / 1000;
						const cvxPoolTvl = tvl.mul(BigNumber.from(10).pow(18)).div(crvPoolLpBalances[poolKey]).mul(cvxPoolTotalSupply[poolKey]);
						const crv_vApr = getTokenPrice(tokenPrices, cvxPoolRewardToken[poolKey].toLowerCase()).mul(cvxPoolRewardRate[poolKey]).mul(86400).mul(3650000).div(cvxPoolTvl);

						const cvxRewardRate = BigNumber.from(cvxPoolRewardRate[poolKey]).mul(BigNumber.from(cvxMaxSupply).sub(cvxTotalSupply)).div(cvxMaxSupply);
						let cvx_vApr = getTokenPrice(tokenPrices, TOKENS['CVX'].ADDR).mul(cvxRewardRate).mul(86400).mul(3650000)
							.div(cvxPoolTvl);
						let ext_vApr = POOLS.BentPools[poolKey].ExtCvxRewardPool ?
							getTokenPrice(tokenPrices, cvxExtPoolRewardToken[poolKey].toLowerCase()).mul(cvxExtPoolRewardRate[poolKey]).mul(86400).mul(3650000).div(cvxPoolTvl)
							: ethers.constants.Zero;
						if (currentTimestamp > cvxExtPoolPeriodFinish[poolKey]) ext_vApr = ethers.constants.Zero;
						if (currentTimestamp > cvxPoolPeriodFinish[poolKey]) cvx_vApr = ethers.constants.Zero;
						if (POOLS.BentPools[poolKey].RewardsAssets.length <= 3) {
							cvx_vApr = cvx_vApr.add(ext_vApr);
							ext_vApr = ethers.constants.Zero;
						}
						const bentRewardRate = cvxRewardRate.mul(20).mul(bentMaxSupply.sub(bentSupply)).div(bentMaxSupply);
						const bentApr = getTokenPrice(tokenPrices, TOKENS['BENT'].ADDR).mul(bentRewardRate).mul(86400).mul(3650000)
							.div(cvxPoolTvl);

						crvProjectedApr[poolKey] = {
							baseCrvvApr: crvApys[POOLS.BentPools[poolKey].Name] ?? ethers.constants.Zero,
							crvvApr: crv_vApr.mul(83).div(100),
							cvxvApr: cvx_vApr.mul(83).div(100),
							bentApr: bentApr.mul(83).div(100),
							additionalRewardvApr: ext_vApr,
						}
					}
				})

				dispatch(updateContractInfo({
					tokenPrices,
					bentCirculatingSupply,
					totalSupplies,
					balances,
					bentAllowance,
					bentAprs,
					bentAvgApr,
					bentEarnedUsd,
					bentPoolRewardsInfo,
					bentRewards,
					bentRewardsUsd,
					bentStaked,
					bentStakedUsd,
					bentTotalStaked,
					bentTvl,
					crvDepositedUsd,
					crvEarnedUsd,
					crvPoolRewards,
					crvTvl,
					crvDeposit,
					crvLpAllowance,
					crvApr,
					crvProjectedApr,
					sushiApr,
					sushiDepositedUsd,
					sushiEarnedUsd,
					sushiLpDeposited,
					sushiRewards,
					sushiTvl,
					vlCvxBalance,
					bentCvxAllowance,
					bentCvxStakingAllowance,
					bentCvxStaked,
					bentCvxTotalStaked,
					bentCvxTvl,
					bentCvxRewards,
					bentCvxRewardsUsd,
					bentCvxEarned,
					bentCvxAprs,
					bentCvxPoolAprs,
					bentCvxAvgApr,
				}));
			})
		})
	}, [dispatch, blockNumber, account, multicall])

	return null;
}