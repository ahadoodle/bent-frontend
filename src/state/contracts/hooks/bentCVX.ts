import { useSelector } from 'react-redux';
import { BigNumber, ethers, utils } from 'ethers';
import { AppState } from '../../index';
import { useTokenPrice } from '.';
import { TOKENS } from 'constant';
import { getTokenDecimals } from 'utils';

export const useBentCvxAllowance = (): BigNumber => {
	return useSelector((state: AppState) => BigNumber.from(state.contracts.bentCvxAllowance || ethers.constants.Zero));
}

export const useVlCvxBalance = (): BigNumber => {
	return useSelector((state: AppState) => BigNumber.from(state.contracts.vlCvxBalance || ethers.constants.Zero));
}

export const useBentCvxStakingAllowance = (): BigNumber => {
	return useSelector((state: AppState) => BigNumber.from(state.contracts.bentCvxStakingAllowance || ethers.constants.Zero));
}

export const useBentCvxStaked = (): BigNumber => {
	return useSelector((state: AppState) => BigNumber.from(state.contracts.bentCvxStaked || ethers.constants.Zero));
}

export const useBentCvxTotalStaked = (): BigNumber => {
	return useSelector((state: AppState) => BigNumber.from(state.contracts.bentCvxTotalStaked || ethers.constants.Zero));
}

export const useBentCvxTvl = (): BigNumber => {
	return useSelector((state: AppState) => BigNumber.from(state.contracts.bentCvxTvl || ethers.constants.Zero));
}

export const useBentCvxStakedUSD = (): BigNumber => {
	const bentCvxStaked = useBentCvxStaked();
	const cvxPrice = useTokenPrice(TOKENS.CVX.ADDR);
	return utils.parseEther(cvxPrice.toString()).mul(bentCvxStaked).div(BigNumber.from(10).pow(getTokenDecimals(TOKENS.BENTCVX.ADDR)));
}

export const useBentCvxRewards = (poolKey: string): BigNumber[] => {
	return useSelector((state: AppState) => state.contracts.bentCvxRewards ? state.contracts.bentCvxRewards[poolKey] || [] : []);
}

export const useBentCvxRewardsUsd = (poolKey: string): BigNumber[] => {
	return useSelector((state: AppState) => state.contracts.bentCvxRewardsUsd ? (state.contracts.bentCvxRewardsUsd[poolKey] || []) : []);
}

export const useBentCvxEarned = (poolKey: string): BigNumber => {
	return useSelector((state: AppState) => BigNumber.from(state.contracts.bentCvxEarned ? state.contracts.bentCvxEarned[poolKey] || ethers.constants.Zero : ethers.constants.Zero));
}

export const useBentCvxTotalEarned = (): BigNumber => {
	return useBentCvxEarned('CVX').add(useBentCvxEarned('BENT')).add(useBentCvxEarned('MC'));
}

export const useBentCvxAvgApr = (): number => {
	return useSelector((state: AppState) => state.contracts.bentCvxAvgApr || 0);
}

export const useBentCvxPoolApr = (poolKey: string): number => {
	return useSelector((state: AppState) => state.contracts.bentCvxPoolAprs ? state.contracts.bentCvxPoolAprs[poolKey] || 0 : 0);
}

export const useBentCvxAprs = (poolKey: string): number[] => {
	return useSelector((state: AppState) => state.contracts.bentCvxAprs ? (state.contracts.bentCvxAprs[poolKey] || []) : []);
}