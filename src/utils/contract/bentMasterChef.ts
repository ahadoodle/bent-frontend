import { utils, BigNumber } from "ethers";
import { Contract } from 'web3-eth-contract';

const stake = async (contract: Contract, account: string | null | undefined, poolId: number, amount: string, gasPrice: BigNumber): Promise<boolean> => {
	try {
		if(!account || !contract.options.address) return false;
		const amountBN = utils.parseUnits(amount, 18);
		const gas = await contract.methods.deposit(poolId, amountBN).estimateGas();
		await contract.methods.deposit(poolId, amountBN).send({
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

const withdraw = async (contract: Contract, account: string | null | undefined, poolId: number, amount: string, gasPrice: BigNumber): Promise<boolean> => {
	try {
		if(!account || !contract.options.address) return false;
		const amountBN = utils.parseUnits(amount, 18);
		const gas = await contract.methods.withdraw(poolId, amountBN).estimateGas();
		await contract.methods.withdraw(poolId, amountBN).send({
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

const claim = async (contract: Contract, account: string | null | undefined, poolId: number, gasPrice: BigNumber): Promise<boolean> => {
	try {
		if(!account || !contract.options.address) return false;
		const gas = await contract.methods.claim(poolId, account).estimateGas();
		await contract.methods.claim(poolId, account).send({
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

const getDepositedAmount = async (contract: Contract, account: string | null | undefined, poolId: number): Promise<{
	amount: number,
	rewardDebt: number,
}> => {
	const defaultRes = {
		amount: 0,
		rewardDebt: 0,
	}
	try {
		if(!account || !contract.options.address) return defaultRes;
		return await contract.methods.userInfo(poolId, account).call();
	} catch (error) {
		console.error(error);
		return defaultRes;
	}
}

const getPendingRewards = async (contract: Contract, account: string | null | undefined, poolId: number): Promise<number> => {
	try {
		if(!account || !contract.options.address) return 0;
		return await contract.methods.pendingReward(poolId, account).call();
	} catch (error) {
		console.error(error);
		return 0;
	}
}

export const BentMasterChef = {
	stake,
	withdraw,
	claim,
	getDepositedAmount,
	getPendingRewards,
}