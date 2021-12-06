import { useMemo } from 'react';
import { useActiveWeb3React, useWeb3 } from 'hooks';
import { Contract } from 'ethers';
import { Contract as Web3Contract } from 'web3-eth-contract';
import {
	getBentPool,
	getERC20,
	getBentMasterChef,
	getSushiPairContract,
	getCvxBaseRewardPool,
	getCrvFiLp,
	getBentStakingContract
} from 'utils';
import { POOLS } from 'constant';

export const useBentPoolContract = (poolName: string): Contract => {
	const { library } = useActiveWeb3React();
	return useMemo(() => getBentPool(poolName, library), [library, poolName]);
}

export const useERC20Contract = (address: string): Web3Contract => {
	const web3 = useWeb3();
	return useMemo(() => getERC20(address, web3), [web3, address]);
}

export const useBentMasterChefContract = (address: string): Web3Contract => {
	const web3 = useWeb3();
	return useMemo(() => getBentMasterChef(address, web3), [web3, address]);
}

export const useSushiPairContract = (address: string): Web3Contract => {
	const web3 = useWeb3();
	return useMemo(() => getSushiPairContract(address, web3), [web3, address]);
}

export const useCvxBaseRewardPool = (address: string): Web3Contract => {
	const web3 = useWeb3();
	return useMemo(() => getCvxBaseRewardPool(address, web3), [web3, address]);
}

export const useCrvFiLp = (address: string): Web3Contract => {
	const web3 = useWeb3();
	return useMemo(() => getCrvFiLp(address, web3), [web3, address]);
}

export const useCrvFiLps = (): Record<string, Web3Contract> => {
	const contracts = {};
	Object.keys(POOLS.BentPools).forEach(poolKey => {
		contracts[poolKey] = getCrvFiLp(POOLS.BentPools[poolKey].CrvMinter ?? POOLS.BentPools[poolKey].DepositAsset)
	})
	return contracts;
}

export const useBentStakingContract = (): Contract => {
	const { library } = useActiveWeb3React();
	return useMemo(() => getBentStakingContract(library), [library]);
}