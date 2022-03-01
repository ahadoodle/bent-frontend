import { useSelector } from 'react-redux';
import { BigNumber, ethers } from 'ethers';
import { AppState } from '../../index';

export const useGasPrice = (): BigNumber => {
	return useSelector((state: AppState) => state.contracts.gas ? BigNumber.from(state.contracts.gas || ethers.constants.Zero) : ethers.constants.Zero);
}
export const useBentCirculatingSupply = (): BigNumber => {
	return useSelector((state: AppState) => BigNumber.from(state.contracts.bentCirculatingSupply || ethers.constants.Zero));
}

export const useBentTvl = (): BigNumber => {
	return useSelector((state: AppState) => BigNumber.from(state.contracts.bentTvl || ethers.constants.Zero));
}

export const useBentAllowance = (): BigNumber => {
	return useSelector((state: AppState) => BigNumber.from(state.contracts.bentAllowance || ethers.constants.Zero));
}

export const useBentStaked = (): BigNumber => {
	return useSelector((state: AppState) => BigNumber.from(state.contracts.bentStaked || ethers.constants.Zero));
}

export const useBentStakedUsd = (): BigNumber => {
	return useSelector((state: AppState) => BigNumber.from(state.contracts.bentStakedUsd || ethers.constants.Zero));
}

export const useBentRewards = (): Record<string, BigNumber> => {
	return useSelector((state: AppState) => state.contracts.bentRewards || {});
}

export const useBentRewardsUsd = (): Record<string, BigNumber> => {
	return useSelector((state: AppState) => state.contracts.bentRewardsUsd || {});
}

export const useBentRewardsAprs = (): Record<string, number> => {
	return useSelector((state: AppState) => state.contracts.bentAprs || {});
}

export const useBentRewardsApr = (token: string): number => {
	return useSelector((state: AppState) => state.contracts.bentAprs ? state.contracts.bentAprs[token] || 0 : 0);
}

export const useBentAvgApr = (): number => {
	return useSelector((state: AppState) => state.contracts.bentAvgApr || 0);
}

export const useBentEarnedUsd = (): BigNumber => {
	return useSelector((state: AppState) => BigNumber.from(state.contracts.bentEarnedUsd || ethers.constants.Zero));
}

export const useBentTotalStaked = (): BigNumber => {
	return useSelector((state: AppState) => BigNumber.from(state.contracts.bentTotalStaked || ethers.constants.Zero));
}
