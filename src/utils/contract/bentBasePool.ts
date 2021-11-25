import { utils, BigNumber, ethers } from "ethers";
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

const harvest = async (contract: Contract, account: string | null | undefined, gasPrice: BigNumber): Promise<boolean> => {
	try {
		if (!account || !contract.options.address) return false;
		await contract.methods.harvest().send({
			from: account,
			gasPrice,
		});
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
}

const getDepositedAmount = async (contract: Contract, account: string | null | undefined): Promise<BigNumber> => {
	try {
		if (!account || !contract.options.address) return ethers.constants.Zero;
		return BigNumber.from(await contract.methods.balanceOf(account).call());
	} catch (error) {
		console.error(error);
		return ethers.constants.Zero;
	}
}

const getPendingReward = async (contract: Contract, account: string | null | undefined): Promise<BigNumber[]> => {
	try {
		if (!account || !contract.options.address) return [];
		const res = await contract.methods.pendingReward(account).call();
		return res.map(reward => BigNumber.from(reward));
	} catch (error) {
		console.error(error);
		return [];
	}
}

export const BentBasePool = {
	stake,
	withdraw,
	harvest,
	getDepositedAmount,
	getPendingReward
}