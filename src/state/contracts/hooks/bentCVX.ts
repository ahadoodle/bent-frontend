import { useSelector } from 'react-redux';
import { BigNumber, ethers } from 'ethers';
import { AppState } from '../../index';

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
