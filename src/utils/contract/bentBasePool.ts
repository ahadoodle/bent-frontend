import { utils, BigNumber } from "ethers";
import { Contract } from 'web3-eth-contract';

const stake = async (contract: Contract, account: string | null | undefined, amount: string, gasPrice: BigNumber): Promise<boolean> => {
	try {
		if(!account || !contract.options.address) return false;
		const amountBN = utils.parseUnits(amount, 18);
		const gas = await contract.methods.deposit(amountBN).estimateGas();
		await contract.methods.deposit(amountBN).send({
			from: account,
			gas,
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
		if(!account || !contract.options.address) return false;
		const amountBN = utils.parseUnits(amount, 18);
		const gas = await contract.methods.withdraw(amountBN).estimateGas();
		await contract.methods.withdraw(amountBN).send({
			from: account,
			gas,
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
		if(!account || !contract.options.address) return false;
		const gas = await contract.methods.harvest().estimateGas();
		await contract.methods.harvest().send({
			from: account,
			gas,
			gasPrice,
		});
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
}

const getDepositedAmount = async (contract: Contract, account: string | null | undefined): Promise<number> => {
	try {
		if(!account || !contract.options.address) return 0;
		return await contract.methods.balanceOf(account).call();
	} catch (error) {
		console.error(error);
		return 0;
	}
}

export const BentPasePool = {
	stake,
	withdraw,
	harvest,
	getDepositedAmount
}