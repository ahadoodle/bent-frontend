import { useMemo } from 'react';
import { useWeb3 } from 'hooks';
import { getBentPool } from 'utils/contractHelper';

export const useBentPoolContract = (poolName: string) => {
	const web3 = useWeb3();
	return useMemo(() => getBentPool(poolName, web3), [web3]);
}