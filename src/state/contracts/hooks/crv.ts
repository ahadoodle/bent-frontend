import { POOLS } from 'constant';
import { useSelector } from 'react-redux';
import { BigNumber, ethers, utils } from 'ethers';
import { AppState } from '../../index';
import { sortCrvPool } from 'utils';
import { BentPoolReward } from '../reducer';

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
		if (POOLS.BentPools[poolKey] && POOLS.BentPools[poolKey].disabled) return;
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
	const deposits = useCrvPoolDepositedUsds();
	const aprs = useCrvAprs();
	Object.keys(POOLS.BentPools).forEach(poolKey => {
		if (POOLS.BentPools[poolKey] && POOLS.BentPools[poolKey].disabled) return;
		const apr = aprs[poolKey] * 100 || 0;
		const tvl = BigNumber.from(deposits[poolKey] || ethers.constants.Zero);
		totalTvl = tvl.add(totalTvl);
		totalRewards = utils.parseEther(apr.toString()).mul(tvl).div(BigNumber.from(10).pow(18)).add(totalRewards);
	})
	return totalTvl.isZero() ? 0 : totalRewards.div(totalTvl).toNumber() / 100;
}

export const useCrvDeposit = (poolKey: string): BigNumber => {
	return useSelector((state: AppState) => BigNumber.from(state.contracts.crvDeposit[poolKey] || ethers.constants.Zero));
}

export const useCrvPoolRewards = (poolKey: string): BigNumber[] => {
	return useSelector((state: AppState) => state.contracts.crvPoolRewards ? state.contracts.crvPoolRewards[poolKey] ?? [] : []);
}

export const usePoolAllowance = (poolKey: string): BigNumber => {
	return useSelector((state: AppState) => BigNumber.from(state.contracts.crvLpAllowance[poolKey] || ethers.constants.Zero));
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

export const useCrvPoolTotalDepositedUsds = (): BigNumber => {
	let total = ethers.constants.Zero;
	const earns = useSelector((state: AppState) => state.contracts.crvDepositedUsd || {});
	Object.keys(earns).forEach(poolKey => {
		total = total.add(BigNumber.from(earns[poolKey] || ethers.constants.Zero));
	})
	return total;
}

export function useCrvPoolEarns(): Record<string, BigNumber> {
	return useSelector((state: AppState) => state.contracts.crvEarnedUsd || {});
}

export const useCrvPoolTotalEarned = (): BigNumber => {
	let total = ethers.constants.Zero;
	const earns = useSelector((state: AppState) => state.contracts.crvEarnedUsd || {});
	Object.keys(earns).forEach(poolKey => {
		if (POOLS.BentPools[poolKey] && POOLS.BentPools[poolKey].disabled) return;
		total = total.add(BigNumber.from(earns[poolKey] || ethers.constants.Zero));
	})
	return total;
}

export const useSortedCrvPoolKeys = (field: string, order: number): string[] => {
	const keys = Object.keys(POOLS.BentPools);
	const earns = useSelector((state: AppState) => state.contracts.crvEarnedUsd || {});
	const aprs = useSelector((state: AppState) => state.contracts.crvApr || {});
	const deposits = useSelector((state: AppState) => state.contracts.crvDepositedUsd || {});
	const tvls = useSelector((state: AppState) => state.contracts.crvTvl || {});

	if (field === 'name') {
		return keys.sort((a, b) => sortCrvPool(POOLS.BentPools[a], POOLS.BentPools[b], field, order));
	} else if (field === 'earned') {
		return keys.sort((a, b) => sortCrvPool(earns[a], earns[b], field, order));
	} else if (field === 'apr') {
		return keys.sort((a, b) => sortCrvPool(utils.parseEther(aprs[a].toString()), utils.parseEther(aprs[b].toString()), field, order));
	} else if (field === 'deposit') {
		return keys.sort((a, b) => sortCrvPool(deposits[a], deposits[b], field, order));
	} else if (field === 'tvl') {
		return keys.sort((a, b) => sortCrvPool(tvls[a], tvls[b], field, order));
	}
	return keys;
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
