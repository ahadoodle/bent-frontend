import { useSelector } from 'react-redux';
import { BigNumber, ethers } from 'ethers';
import { AppState } from '../../index';
import { WeBentLockedData } from '../reducer';

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

export const useWeBentLockDuration = (): BigNumber => {
	return useSelector((state: AppState) => BigNumber.from(state.contracts.weBentLockDuration || ethers.constants.Zero));
}
