import { useSelector } from 'react-redux';
import { BigNumber, ethers } from 'ethers';
import { AppState } from '../../index';

export const useBentCvxAllowance = (): BigNumber => {
	return useSelector((state: AppState) => BigNumber.from(state.contracts.bentCvxAllowance || ethers.constants.Zero));
}
