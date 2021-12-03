import { DEFAULT_CHAIN, NETWORK_CONNECTIONS } from 'constant';
import Web3 from 'web3';
import { HttpProviderOptions } from 'web3-core-helpers'
import { ethers } from 'ethers'

const RPC_URL = NETWORK_CONNECTIONS[DEFAULT_CHAIN];
const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 } as HttpProviderOptions);
const web3NoAccount = new Web3(httpProvider);

export const getDefaultProvider = (): ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const { ethereum, web3 } = window

	if (ethereum) {
		return new ethers.providers.Web3Provider(ethereum)
	}

	if (web3) {
		return new ethers.providers.Web3Provider(web3.currentProvider)
	}

	// If no injected web3 instance is detected, fall back to backup node
	return new ethers.providers.JsonRpcProvider(RPC_URL)
}

export default web3NoAccount;