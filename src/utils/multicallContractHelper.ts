import { ABIS } from 'abis';
import { POOLS } from 'constant';
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

export const getMultiCvxRewardPool = (address: string): Contract => {
	return new Contract(address, ABIS.CvxBaseRewardPool);
}