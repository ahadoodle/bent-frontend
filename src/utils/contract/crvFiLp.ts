import { Contract } from 'web3-eth-contract';

const getBalances = async (contract: Contract, arg0: number): Promise<number> => {
	try {
		if (!contract.options.address) return 0;
		return await contract.methods.balances(arg0).call();
	} catch (error) {
		return 0;
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

const getTotalSupply = async (contract: Contract): Promise<number> => {
	try {
		if (!contract.options.address) return 0;
		return await contract.methods.totalSupply().call();
	} catch (error) {
		return 0;
	}
}

export const CrvFiLp = {
	getCoins,
	getBalances,
	getTotalSupply,
}