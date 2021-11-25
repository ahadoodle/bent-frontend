import { BigNumber, ethers } from "ethers";
import { Contract } from 'web3-eth-contract';

const getBalances = async (contract: Contract, arg0: number): Promise<BigNumber> => {
	try {
		if (!contract.options.address) return ethers.constants.Zero;
		return BigNumber.from(await contract.methods.balances(arg0).call());
	} catch (error) {
		return ethers.constants.Zero;
	}
}

const getCoins = async (contract: Contract, arg0: number): Promise<string> => {
	try {
		if (!contract.options.address) return '';
		return await contract.methods.coins(arg0).call();
	} catch (error) {
		return '';
	}
}

const getTotalSupply = async (contract: Contract): Promise<BigNumber> => {
	try {
		if (!contract.options.address) return ethers.constants.Zero;
		return BigNumber.from(await contract.methods.totalSupply().call());
	} catch (error) {
		return ethers.constants.Zero;
	}
}

export const CrvFiLp = {
	getCoins,
	getBalances,
	getTotalSupply,
}