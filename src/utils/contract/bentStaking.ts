import { utils, BigNumber } from "ethers";
import { Contract } from 'web3-eth-contract';

const stake = async (contract: Contract, account: string | null | undefined, amount: string, gasPrice: BigNumber): Promise<boolean> => {
	try {
		if (!account || !contract.options.address) return false;
		const amountBN = utils.parseUnits(amount, 18);
		await contract.methods.deposit(amountBN).send({
			from: account,
			gasPrice,
		});
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
}

const withdraw = async (contract: Contract, account: string | null | undefined, amount: string, gasPrice: BigNumber): Promise<boolean> => {
	try {
		if (!account || !contract.options.address) return false;
		const amountBN = utils.parseUnits(amount, 18);
		await contract.methods.withdraw(amountBN).send({
			from: account,
			gasPrice,
		});
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
}

const claimAll = async (contract: Contract, account: string | null | undefined, gasPrice: BigNumber): Promise<boolean> => {
	try {
		if (!account || !contract.options.address) return false;
		await contract.methods.claimAll().send({
			from: account,
			gasPrice,
		});
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
}
export const BentStaking = {
	stake,
	withdraw,
	claimAll,
}