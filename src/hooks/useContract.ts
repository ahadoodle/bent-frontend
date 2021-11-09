import { useMemo } from 'react';
import { useWeb3 } from 'hooks';
import { getBentPool, getERC20 } from 'utils/contractHelper';

export const useBentPoolContract = (poolName: string) => {
	const web3 = useWeb3();
	return useMemo(() => getBentPool(poolName, web3), [web3]);
}

export const useERC20Contract = (address: string) => {
	const web3 = useWeb3();
	return useMemo(() => getERC20(address, web3), [web3]);
}