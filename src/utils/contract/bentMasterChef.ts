import { utils, BigNumber } from "ethers";
import { Contract } from 'web3-eth-contract';

const stake = async (contract: Contract, account: string | null | undefined, poolId: number, amount: string, gasPrice: BigNumber): Promise<boolean> => {
	try {
		if(!account || !contract.options.address) return false;
		const amountBN = utils.parseUnits(amount, 18);
		await contract.methods.deposit(poolId, amountBN).send({
			from: account,
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
		await contract.methods.withdraw(poolId, amountBN).send({
			from: account,
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
		await contract.methods.claim(poolId, account).send({
			from: account,
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

const getRewardPerBlock = async (contract: Contract): Promise<number> => {
	try {
		if(!contract.options.address) return 0;
		return await contract.methods.rewardPerBlock().call();
	} catch (error) {
		console.error(error);
		return 0;
	}
}

const getTotalAllocPoint = async (contract: Contract): Promise<number> => {
	try {
		if(!contract.options.address) return 0;
		return await contract.methods.totalAllocPoint().call();
	} catch (error) {
		console.error(error);
		return 0;
	}
}

const getPoolInfo = async (contract: Contract, poolId: number): Promise<{
	lpToken: string;
	allocPoint: number;
	lastRewardBlock: number;
	accRewardPerShare: number;
}> => {
	const defaultRes = {
		lpToken: '',
		allocPoint: 0,
		lastRewardBlock: 0,
		accRewardPerShare: 0
	}
	try {
		if(!contract.options.address) return defaultRes;
		return await contract.methods.poolInfo(poolId).call();
	} catch (error) {
		console.error(error);
		return defaultRes;
	}
}

export const BentMasterChef = {
	stake,
	withdraw,
	claim,
	getDepositedAmount,
	getPendingRewards,
	getRewardPerBlock,
	getTotalAllocPoint,
	getPoolInfo,
}