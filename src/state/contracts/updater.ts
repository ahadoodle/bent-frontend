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
	getCirculatingSupply,
	getMultiCvxLocker,
	getMultiBentCvxStaking,
	getMultiBentCvxRewarderCvx,
	getMultiBentCvxRewarderBent,
	getMultiBentCvxRewarderMC,
} from 'utils';
import {
	// updateStakingPoolApr,
	// updateStakingPoolAvgApr,
	// updateStakingPoolEarningUsd,
	// updateStakingPoolRewards,
	// updateStakingPoolRewardsUsd,
	// updateBentCvxAllowance,
	// updateVlCvxBalance,
	updateContractInfo,
} from './actions';
import { BentPoolReward } from './reducer';

export default function Updater(): null {
	const dispatch = useDispatch();
	const blockNumber = useBlockNumber();
	const multicall = useMulticallProvider();
	const { account } = useActiveWeb3React();
	const crvDepositLps = useCrvFiLps();

	useEffect(() => {
		const tokenAddrs = Object.keys(TOKENS).map(token => TOKENS[token].ADDR);
		Promise.all([
			getPrice(tokenAddrs),
			getCirculatingSupply(),
		]).then(([tokenPrices, bentCirculatingSupply]) => {
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
			const cvxToken = getMultiERC20Contract(TOKENS['CVX'].ADDR);
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
				contractCalls.push(bentCvxRewarderCvx.rewardPools(index));
			})
			POOLS.BentCvxStaking.BentCvxRewarderBent.RewardsAssets.forEach((rewardToken, index) => {
				contractCalls.push(bentCvxRewarderBent.rewardPools(index));
			})
			contractCalls.push(bentCvxRewarderMC.pendingReward(accAddr));
			contractCalls.push(bentCvxRewarderMC.rewardPerBlock());

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
				const crvPoolLpBalances = {};
				let pendingRewards: BigNumber[] = [];
				const bentCvxChefTotalAllocPoint = {};
				const bentCvxChefRewardPerBlock = {};
				const bentCvxChefPoolInfo = {};
				Object.keys(POOLS.BentPools).forEach((poolKey, index) => {
					balances[POOLS.BentPools[poolKey].DepositAsset.toLowerCase()] = results[startIndex];
					crvLpAllowance[poolKey] = results[startIndex + 1];
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
						crvTvl[poolKey] = POOLS.BentPools[poolKey].disabled ? ethers.constants.Zero : tvl;
						crvDepositedUsd[poolKey] = totalUsd.mul(depositedLpBalance[poolKey]).div(lpTotalSupply)

						if (POOLS.BentPools[poolKey].isBentCvx) {
							const apr = (BigNumber.from(poolLpBalance).isZero() || lpPrice.isZero()) ? 0 :
								bentPriceBN.mul(bentCvxChefRewardPerBlock[poolKey]).mul(6400).mul(365).mul(10000)
									.div(tvl).div(BigNumber.from(10).pow(18)).toNumber() / 100;
							crvApr[poolKey] = apr;
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
							crvApr[poolKey] = apr;
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
		})
	}, [dispatch, blockNumber, account, multicall, crvDepositLps])

	return null;
}