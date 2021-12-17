import { useMemo } from 'react';
import { useActiveWeb3React, useWeb3 } from 'hooks';
import { Contract } from 'ethers';
import { Contract as Web3Contract } from 'web3-eth-contract';
import {
	getCrvFiLp,
} from 'utils';
import { POOLS, TOKENS } from 'constant';
import { ABIS } from 'abis';

export const useBentPoolContract = (poolName: string): Contract => {
	const { library } = useActiveWeb3React();
	return useMemo(() => new Contract(POOLS.BentPools[poolName].POOL, ABIS.BentBasePool, library), [library, poolName]);
}

export const useERC20Contract = (address: string): Contract => {
	const { library } = useActiveWeb3React();
	return useMemo(() => new Contract(address, ABIS.ERC20, library), [library, address]);
}

export const useBentCVXContract = (): Contract => {
	const { library } = useActiveWeb3React();
	return useMemo(() => new Contract(TOKENS['BENTCVX'].ADDR, ABIS.BentCVX, library), [library]);
}

export const useCvxLocker = (): Contract => {
	const { library } = useActiveWeb3React();
	return useMemo(() => new Contract(POOLS.VlCvxLocker, ABIS.CvxLocker, library), [library]);
}

export const useBentMasterChefContract = (): Contract => {
	const { library } = useActiveWeb3React();
	return useMemo(() => new Contract(POOLS.SushiPools.MasterChef, ABIS.BentMasterChef, library), [library]);
}

export const useBentCvxMasterChefContract = (): Contract => {
	const { library } = useActiveWeb3React();
	return useMemo(() => new Contract(POOLS.BentPools['BENTCVX'].POOL, ABIS.BentMasterChef, library), [library]);
}

export const useBentStakingContract = (): Contract => {
	const { library } = useActiveWeb3React();
	return useMemo(() => new Contract(POOLS.BentStaking.POOL, ABIS.BentSingleStaking, library), [library]);
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