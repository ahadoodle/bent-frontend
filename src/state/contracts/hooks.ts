import { POOLS } from 'constant';
import { BigNumber, ethers } from 'ethers';
import { useSelector } from 'react-redux';
import { AppState } from '../index';
import { BentPoolReward } from './reducer';

export function useTokenPrice(tokenAddr: string): number {
	return useSelector((state: AppState) => state.contracts.tokenPrices[tokenAddr.toLowerCase()] || 0);
}

export function useTokenPrices(): Record<string, number> {
	return useSelector((state: AppState) => state.contracts.tokenPrices);
}

export const useBalance = (tokenAddr: string): BigNumber => {
	return useSelector((state: AppState) => BigNumber.from(state.contracts.balances[tokenAddr.toLowerCase()] || ethers.constants.Zero));
}

export const useTotalSupply = (tokenAddr: string): BigNumber => {
	return useSelector((state: AppState) => BigNumber.from(state.contracts.totalSupplies[tokenAddr.toLowerCase()] || ethers.constants.Zero));
}

export function useCrvTvls(): Record<string, BigNumber> {
	return useSelector((state: AppState) => state.contracts.crvTvl || {});
}

export function useCrvTvl(poolKey: string): BigNumber {
	return useSelector((state: AppState) => BigNumber.from(state.contracts.crvTvl[poolKey] || ethers.constants.Zero));
}

export const useCrvTotalTvl = (): BigNumber => {
	let total = ethers.constants.Zero;
	const tvls = useSelector((state: AppState) => state.contracts.crvTvl || {});
	Object.keys(tvls).forEach(poolKey => {
		total = total.add(BigNumber.from(tvls[poolKey] || ethers.constants.Zero));
	})
	return total;
}

export function useCrvApr(poolKey: string): number {
	return useSelector((state: AppState) => state.contracts.crvApr ? state.contracts.crvApr[poolKey] ?? 0 : 0);
}

export const useCrvAprs = (): Record<string, number> => {
	return useSelector((state: AppState) => state.contracts.crvApr || {});
}

export const useCrvAverageApr = (): number => {
	let totalRewards = ethers.constants.Zero;
	let totalTvl = ethers.constants.Zero;
	const tvls = useCrvTvls();
	const aprs = useCrvAprs();
	Object.keys(POOLS.BentPools).forEach(poolKey => {
		const apr = parseFloat(aprs[poolKey].toFixed(2)) || 0;
		const tvl = BigNumber.from(tvls[poolKey] || ethers.constants.Zero);
		totalTvl = tvl.add(totalTvl);
		totalRewards = tvl.mul(apr * 100).add(totalRewards);
	})
	return totalRewards.div(totalTvl).toNumber() / 100;
}

export const useCrvDeposit = (poolKey: string): BigNumber => {
	return useSelector((state: AppState) => BigNumber.from(state.contracts.crvDeposit[poolKey] || ethers.constants.Zero));
}

export const useCvxLpBalance = (poolKey: string): BigNumber => {
	return useSelector((state: AppState) => BigNumber.from(state.contracts.cvxLpBalance[poolKey] || ethers.constants.Zero));
}

export const useCrvPoolRewards = (poolKey: string): BigNumber[] => {
	return useSelector((state: AppState) => state.contracts.crvPoolRewards ? state.contracts.crvPoolRewards[poolKey] ?? [] : []);
}

export const usePoolAllowance = (poolKey: string): BigNumber => {
	return useSelector((state: AppState) => BigNumber.from(state.contracts.crvLpAllowance[poolKey] || ethers.constants.Zero));
}

export const useBentPoolRewardsInfo = (poolKey: string): BentPoolReward[] => {
	return useSelector((state: AppState) => {
		const defaultVal: BentPoolReward = {
			rewardRate: ethers.constants.Zero,
			rewardToken: ethers.constants.AddressZero
		}
		if (!state.contracts.bentPoolRewardsInfo || !state.contracts.bentPoolRewardsInfo[poolKey]) {
			return [defaultVal, defaultVal, defaultVal];
		}
		const rewards: BentPoolReward[] = [];
		state.contracts.bentPoolRewardsInfo[poolKey].forEach(reward => {
			rewards.push({
				rewardRate: reward.rewardRate ? BigNumber.from(reward.rewardRate) : ethers.constants.Zero,
				rewardToken: reward.rewardToken ? reward.rewardToken.toLowerCase() : ethers.constants.AddressZero
			})
		})

		return rewards || [defaultVal, defaultVal, defaultVal]
	});
}

export const useCrvPoolEarnedUsd = (poolKey: string): BigNumber => {
	return useSelector((state: AppState) => state.contracts.crvEarnedUsd ? BigNumber.from(state.contracts.crvEarnedUsd[poolKey] || ethers.constants.Zero) : ethers.constants.Zero);
}

export const useCrvPoolDepositedUsd = (poolKey: string): BigNumber => {
	return useSelector((state: AppState) => state.contracts.crvDepositedUsd ? BigNumber.from(state.contracts.crvDepositedUsd[poolKey] || ethers.constants.Zero) : ethers.constants.Zero);
}

export const useCrvPoolDepositedUsds = (): Record<string, BigNumber> => {
	return useSelector((state: AppState) => state.contracts.crvDepositedUsd || {});
}

export function useCrvPoolEarns(): Record<string, BigNumber> {
	return useSelector((state: AppState) => state.contracts.crvEarnedUsd || {});
}

export const useCrvPoolTotalEarned = (): BigNumber => {
	let total = ethers.constants.Zero;
	const earns = useSelector((state: AppState) => state.contracts.crvEarnedUsd || {});
	Object.keys(earns).forEach(poolKey => {
		total = total.add(BigNumber.from(earns[poolKey] || ethers.constants.Zero));
	})
	return total;
}

export const useSushiLpDeposited = (poolKey: string): BigNumber => {
	return useSelector((state: AppState) => state.contracts.sushiLpDeposited ? BigNumber.from(state.contracts.sushiLpDeposited[poolKey] || ethers.constants.Zero) : ethers.constants.Zero);
}

export function useSushiTvl(poolKey: string): BigNumber {
	return useSelector((state: AppState) => BigNumber.from(state.contracts.sushiTvl[poolKey] || ethers.constants.Zero));
}

export const useSushiTotalTvl = (): BigNumber => {
	let total = ethers.constants.Zero;
	const tvls = useSelector((state: AppState) => state.contracts.sushiTvl || {});
	Object.keys(tvls).forEach(poolKey => {
		total = total.add(BigNumber.from(tvls[poolKey] || ethers.constants.Zero));
	})
	return total;
}

export function useSushiApr(poolKey: string): number {
	return useSelector((state: AppState) => state.contracts.sushiApr ? state.contracts.sushiApr[poolKey] ?? 0 : 0);
}

export const useSushiPoolRewards = (poolKey: string): BigNumber => {
	return useSelector((state: AppState) => state.contracts.sushiRewards ? BigNumber.from(state.contracts.sushiRewards[poolKey] || ethers.constants.Zero) : ethers.constants.Zero);
}

export const useSushiPoolTotalEarned = (): BigNumber => {
	let total = ethers.constants.Zero;
	const earns = useSelector((state: AppState) => state.contracts.sushiEarnedUsd || {});
	Object.keys(earns).forEach(poolKey => {
		total = total.add(BigNumber.from(earns[poolKey] || ethers.constants.Zero));
	})
	return total;
}

export const useSushiPoolEarnedUsd = (poolKey: string): BigNumber => {
	return useSelector((state: AppState) => state.contracts.sushiEarnedUsd ? BigNumber.from(state.contracts.sushiEarnedUsd[poolKey] || ethers.constants.Zero) : ethers.constants.Zero);
}

export const useSushiPoolDepositedUsd = (poolKey: string): BigNumber => {
	return useSelector((state: AppState) => state.contracts.sushiDepositedUsd ? BigNumber.from(state.contracts.sushiDepositedUsd[poolKey] || ethers.constants.Zero) : ethers.constants.Zero);
}