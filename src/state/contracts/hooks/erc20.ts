import { BigNumber, ethers } from 'ethers';
import { useSelector } from 'react-redux';
import { AppState } from '../../index';

export function useTokenPrice(tokenAddr: string): number {
	return useSelector((state: AppState) => state.contracts.tokenPrices[tokenAddr.toLowerCase()] || 0);
}

export function useTokenPrices(): Record<string, number> {
	return useSelector((state: AppState) => state.contracts.tokenPrices);
}

export const useBalance = (tokenAddr: string): BigNumber => {
	return useSelector((state: AppState) => state.contracts.balances ? BigNumber.from(state.contracts.balances[tokenAddr.toLowerCase()] || ethers.constants.Zero) : ethers.constants.Zero);
}

export const useTotalSupply = (tokenAddr: string): BigNumber => {
	return useSelector((state: AppState) => BigNumber.from(state.contracts.totalSupplies[tokenAddr.toLowerCase()] || ethers.constants.Zero));
}
