import { useMemo } from 'react';
import { useWeb3 } from 'hooks';
import { getBentPool, getERC20 } from 'utils/contractHelper';
import { Contract } from 'web3-eth-contract';

export const useBentPoolContract = (poolName: string): Contract => {
	const web3 = useWeb3();
	return useMemo(() => getBentPool(poolName, web3), [web3, poolName]);
}

export const useERC20Contract = (address: string): Contract => {
	const web3 = useWeb3();
	return useMemo(() => getERC20(address, web3), [web3, address]);
}