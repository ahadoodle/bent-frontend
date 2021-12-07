import { ABIS } from 'abis';
import { POOLS } from 'constant';
import Web3 from 'web3';
import { Contract } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import { Contract as Web3Contract } from 'web3-eth-contract';
import web3NoAccount from './web3';

export const getBentPool = (poolName: string, provider?: Web3Provider): Contract => {
	return new Contract(POOLS.BentPools[poolName].POOL, ABIS.BentBasePool, provider);
}

export const getERC20 = (address: string, provider?: Web3Provider): Contract => {
	return new Contract(address, ABIS.ERC20, provider);
}

export const getBentMasterChef = (provider?: Web3Provider): Contract => {
	return new Contract(POOLS.SushiPools.MasterChef, ABIS.BentMasterChef, provider);
}

export const getBentStakingContract = (provider?: Web3Provider): Contract => {
	return new Contract(POOLS.BentStaking.POOL, ABIS.BentSingleStaking, provider);
}

const getWeb3Contract = (address: string, abi, web3?: Web3): Web3Contract => {
	const _web3 = web3 ?? web3NoAccount;
	return new _web3.eth.Contract(abi, address);
}

export const getCrvFiLp = (address: string, web3?: Web3): Web3Contract => {
	return getWeb3Contract(address, ABIS.CrvFiLp, web3);
}
