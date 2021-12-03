import { useMemo } from 'react';
import { useWeb3 } from 'hooks';
import { Contract } from 'web3-eth-contract';
import {
	getBentPool,
	getERC20,
	getBentMasterChef,
	getSushiPairContract,
	getCvxBaseRewardPool,
	getCrvFiLp
} from 'utils';
import { POOLS } from 'constant';

export const useBentPoolContract = (poolName: string): Contract => {
	const web3 = useWeb3();
	return useMemo(() => getBentPool(poolName, web3), [web3, poolName]);
}

export const useERC20Contract = (address: string): Contract => {
	const web3 = useWeb3();
	return useMemo(() => getERC20(address, web3), [web3, address]);
}

export const useBentMasterChefContract = (address: string): Contract => {
	const web3 = useWeb3();
	return useMemo(() => getBentMasterChef(address, web3), [web3, address]);
}

export const useSushiPairContract = (address: string): Contract => {
	const web3 = useWeb3();
	return useMemo(() => getSushiPairContract(address, web3), [web3, address]);
}

export const useCvxBaseRewardPool = (address: string): Contract => {
	const web3 = useWeb3();
	return useMemo(() => getCvxBaseRewardPool(address, web3), [web3, address]);
}

export const useCrvFiLp = (address: string): Contract => {
	const web3 = useWeb3();
	return useMemo(() => getCrvFiLp(address, web3), [web3, address]);
}

export const useCrvFiLps = (): Record<string, Contract> => {
	const contracts = {};
	Object.keys(POOLS.BentPools).forEach(poolKey => {
		contracts[poolKey] = getCrvFiLp(POOLS.BentPools[poolKey].CrvMinter ?? POOLS.BentPools[poolKey].DepositAsset)
	})
	return contracts;
}