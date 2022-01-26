import { useSelector } from 'react-redux';
import { BigNumber, ethers, utils } from 'ethers';
import { AppState } from '../../index';
import { WeBentLockedData } from '../reducer';
import { useTokenPrice } from '.';
import { TOKENS } from 'constant';

export const useWeBentAllowance = (): BigNumber => {
	return useSelector((state: AppState) => BigNumber.from(state.contracts.weBentAllowance || ethers.constants.Zero));
}

export const useWeBentBalance = (): BigNumber => {
	return useSelector((state: AppState) => BigNumber.from(state.contracts.weBentBalance || ethers.constants.Zero));
}

export const useWeBentLocked = (): BigNumber => {
	return useSelector((state: AppState) => BigNumber.from(state.contracts.weBentLocked || ethers.constants.Zero));
}

export const useWeBentBentBalance = (): BigNumber => {
	return useSelector((state: AppState) => BigNumber.from(state.contracts.weBentBentBalance || ethers.constants.Zero));
}

export const useWeBentTvl = (): BigNumber => {
	return useSelector((state: AppState) => BigNumber.from(state.contracts.weBentTvl || ethers.constants.Zero));
}

export const useWeBentTotalSupply = (): BigNumber => {
	return useSelector((state: AppState) => BigNumber.from(state.contracts.weBentTotalSupply || ethers.constants.Zero));
}

export const useWeBentLockedData = (): WeBentLockedData[] => {
	return useSelector((state: AppState) => state.contracts.weBentLockedData || []);
}

export const useWeBentUnlockable = (): BigNumber => {
	return useSelector((state: AppState) => BigNumber.from(state.contracts.weBentUnlockable || ethers.constants.Zero));
}

export const useWeBentLockDuration = (): BigNumber => {
	return useSelector((state: AppState) => BigNumber.from(state.contracts.weBentLockDuration || ethers.constants.Zero));
}

export const useWeBentRatio = (): number => {
	const weBentTotalSupply = useWeBentTotalSupply();
	const bentTotalStaked = useWeBentBentBalance();
	return weBentTotalSupply.isZero() ? 0 : BigNumber.from(bentTotalStaked).mul(100).div(weBentTotalSupply).toNumber() / 100
}

export const useWeBentDepositsUsd = (): BigNumber => {
	const bentPrice = useTokenPrice(TOKENS.BENT.ADDR);
	const weBentLocked = useWeBentLocked();
	return utils.parseEther(bentPrice.toString()).mul(weBentLocked).div(BigNumber.from(10).pow(18));
}

export const useWeBentEarnedUsd = (): BigNumber => {
	return useSelector((state: AppState) => BigNumber.from(state.contracts.weBentEarnedUsd || ethers.constants.Zero));
}

export const useWeBentApr = (): number => {
	return useSelector((state: AppState) => state.contracts.weBentApr || 0);
}

export const useWeBentAvgApr = (): number => {
	return useSelector((state: AppState) => state.contracts.weBentAvgApr || 0);
}

export const useWeBentRewardsAprs = (): Record<string, number> => {
	return useSelector((state: AppState) => state.contracts.weBentAprs || {});
}

export const useWeBentRewardsApr = (token: string): number => {
	return useSelector((state: AppState) => state.contracts.weBentAprs ? state.contracts.weBentAprs[token] || 0 : 0);
}

export const useWeBentRewards = (): Record<string, BigNumber> => {
	return useSelector((state: AppState) => state.contracts.weBentRewards || {});
}

export const useWeBentRewardsUsd = (): Record<string, BigNumber> => {
	return useSelector((state: AppState) => state.contracts.weBentRewardsUsd || {});
}
