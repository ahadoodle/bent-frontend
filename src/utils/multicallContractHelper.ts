import { ABIS } from 'abis';
import { POOLS, TOKENS } from 'constant';
import { Contract } from 'ethers-multicall';

export const getMultiERC20Contract = (address: string): Contract => {
	return new Contract(address, ABIS.ERC20);
}

export const getMultiBentPool = (poolName: string): Contract => {
	return new Contract(POOLS.BentPools[poolName].POOL, ABIS.BentBasePool);
}

export const getMultiBentMasterChef = (address: string): Contract => {
	return new Contract(address, ABIS.BentMasterChef);
}

export const getMultiCrvFiLp = (address: string): Contract => {
	return new Contract(address, ABIS.CrvFiLpMulti);
}

export const getMultiSushiPair = (address: string): Contract => {
	return new Contract(address, ABIS.SushiPair);
}

export const getMultiBentSingleStaking = (address: string): Contract => {
	return new Contract(address, ABIS.BentSingleStaking);
}

export const getMultiCvxLocker = (): Contract => {
	return new Contract(POOLS.VlCvxLocker, ABIS.CvxLocker);
}

export const getMultiBentCvxStaking = (): Contract => {
	return new Contract(POOLS.BentCvxStaking.BentCvxStaking, ABIS.BentCvxStaking);
}

export const getMultiBentCvxRewarderCvx = (): Contract => {
	return new Contract(POOLS.BentCvxStaking.BentCvxRewarderCvx.Pool, ABIS.BentCvxRewarder);
}

export const getMultiBentCvxRewarderBent = (): Contract => {
	return new Contract(POOLS.BentCvxStaking.BentCvxRewarderBent.Pool, ABIS.BentCvxRewarder);
}

export const getMultiBentCvxRewarderMC = (): Contract => {
	return new Contract(POOLS.BentCvxStaking.BentCvxRewarderMasterchef.Pool, ABIS.BentCvxRewarderMasterchef);
}

export const getMultiBentCvxRewarderMCOld = (): Contract => {
	return new Contract(POOLS.BentCvxStaking.BentCvxRewarderMasterchef.OldPool, ABIS.BentCvxRewarderMasterchef);
}

export const getMultiTricryptiLpPrice = (): Contract => {
	return new Contract('0xE8b2989276E2Ca8FDEA2268E3551b2b4B2418950', ABIS.TricryptoLpPrice);
}

export const getMultiCvxToken = (): Contract => {
	return new Contract(TOKENS['CVX'].ADDR, ABIS.CvxToken);
}

export const getMultiCvxRewardPool = (address: string): Contract => {
	return new Contract(address, ABIS.CvxBaseRewardPool);
}

export const getMultiCvxVBalanceRewardPool = (address: string): Contract => {
	return new Contract(address, ABIS.CvxVirtualBalanceRewardPool);
}

export const getMultiweBent = (): Contract => {
	return new Contract(POOLS.weBENT.Addr, ABIS.weBENT);
}

export const getSnapshot = (): Contract => {
	return new Contract(POOLS.SnapshotDelegation.Addr, ABIS.SnapshotDelegation);
}