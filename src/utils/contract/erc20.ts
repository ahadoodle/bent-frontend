import { BigNumber, ethers } from "ethers";
import { Contract } from 'web3-eth-contract';

const getBalanceOf = async (contract: Contract, account: string | null | undefined): Promise<number> => {
	try {
		if (!account || !contract.options.address) return 0;
		return await contract.methods.balanceOf(account).call();
	} catch (error) {
		console.error(error);
		return 0;
	}
}

const getAllowance = async (contract: Contract, account: string | null | undefined, spender: string): Promise<number> => {
	try {
		if (!account || !contract.options.address) return 0;
		return await contract.methods.allowance(account, spender).call();
	} catch (error) {
		console.error(error);
		return 0;
	}
}

const getTotalSupply = async (contract: Contract): Promise<number> => {
	try {
		if (!contract.options.address) return 0;
		return await contract.methods.totalSupply().call();
	} catch (error) {
		console.error(error);
		return 0;
	}
}

const getSymbol = async (contract: Contract): Promise<string> => {
	try {
		if (!contract.options.address) return '';
		return await contract.methods.symbol().call();
	} catch (error) {
		console.error(error);
		return '';
	}
}

const approve = async (contract: Contract, account: string | null | undefined, spender: string, gasPrice: BigNumber): Promise<boolean> => {
	try {
		if (!account || !contract.options.address) return false;
		const amountBN = ethers.constants.MaxUint256;
		return await contract.methods.approve(spender, amountBN).send({
			from: account,
			// gas,
			gasPrice
		});
	} catch (error) {
		console.error(error);
		return false;
	}
}

export const ERC20 = {
	getSymbol,
	getBalanceOf,
	getAllowance,
	getTotalSupply,
	approve,
}