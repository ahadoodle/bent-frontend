import { useSelector } from 'react-redux';
import { BigNumber, ethers } from 'ethers';
import { AppState } from '../../index';

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

export const useSushiPoolTotalDepositedUsd = (): BigNumber => {
	let total = ethers.constants.Zero;
	const earns = useSelector((state: AppState) => state.contracts.sushiDepositedUsd || {});
	Object.keys(earns).forEach(poolKey => {
		total = total.add(BigNumber.from(earns[poolKey] || ethers.constants.Zero));
	})
	return total;
}
