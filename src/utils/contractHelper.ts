import { ABIS } from 'abis';
import Web3 from 'web3';
import { Contract as Web3Contract } from 'web3-eth-contract';
import web3NoAccount from './web3';

const getWeb3Contract = (address: string, abi, web3?: Web3): Web3Contract => {
	const _web3 = web3 ?? web3NoAccount;
	return new _web3.eth.Contract(abi, address);
}

export const getCrvFiLp = (address: string, web3?: Web3): Web3Contract => {
	return getWeb3Contract(address, ABIS.CrvFiLp, web3);
}
