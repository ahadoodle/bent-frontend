import { ABIS } from 'abis';
import { POOLS } from 'constant';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import web3NoAccount from './web3';

const getWeb3Contract = (address: string, abi: any, web3?: Web3): Contract => {
	const _web3 = web3 ?? web3NoAccount;
	return new _web3.eth.Contract(abi, address);
}

export const getBentPool = (poolName: string, web3?: Web3) => {
	return getWeb3Contract(POOLS.BentPool[poolName].POOL, ABIS.BentBasePool, web3);
}