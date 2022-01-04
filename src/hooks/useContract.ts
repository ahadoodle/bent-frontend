import { useMemo } from 'react';
import { useActiveWeb3React } from 'hooks';
import { Contract } from 'ethers';
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

export const useBentCvxStakingContract = (): Contract => {
	const { library } = useActiveWeb3React();
	return useMemo(() => new Contract(POOLS.BentCvxStaking.BentCvxStaking, ABIS.BentCvxStaking, library), [library]);
}

export const useBentCvxRewarderCvxContract = (): Contract => {
	const { library } = useActiveWeb3React();
	return useMemo(() => new Contract(POOLS.BentCvxStaking.BentCvxRewarderCvx.Pool, ABIS.BentCvxRewarder, library), [library]);
}

export const useBentCvxRewarderBentContract = (): Contract => {
	const { library } = useActiveWeb3React();
	return useMemo(() => new Contract(POOLS.BentCvxStaking.BentCvxRewarderBent.Pool, ABIS.BentCvxStaking, library), [library]);
}

export const useBentCvxRewarderMCContract = (): Contract => {
	const { library } = useActiveWeb3React();
	return useMemo(() => new Contract(POOLS.BentCvxStaking.BentCvxRewarderMasterchef.Pool, ABIS.BentCvxRewarderMasterchef, library), [library]);
}
