import { utils, BigNumber, ethers } from "ethers";
import { Contract } from 'web3-eth-contract';

const stake = async (contract: Contract, account: string | null | undefined, poolId: number, amount: string, gasPrice: BigNumber): Promise<boolean> => {
	try {
		if (!account || !contract.options.address) return false;
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
		if (!account || !contract.options.address) return false;
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
		if (!account || !contract.options.address) return false;
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
	amount: BigNumber,
	rewardDebt: BigNumber,
}> => {
	const defaultRes = {
		amount: ethers.constants.Zero,
		rewardDebt: ethers.constants.Zero,
	}
	try {
		if (!account || !contract.options.address) return defaultRes;
		const res = await contract.methods.userInfo(poolId, account).call();
		return {
			amount: BigNumber.from(res.amount),
			rewardDebt: BigNumber.from(res.rewardDebt)
		}
	} catch (error) {
		console.error(error);
		return defaultRes;
	}
}

const getPendingRewards = async (contract: Contract, account: string | null | undefined, poolId: number): Promise<BigNumber> => {
	try {
		if (!account || !contract.options.address) return ethers.constants.Zero;
		return BigNumber.from(await contract.methods.pendingReward(poolId, account).call());
	} catch (error) {
		console.error(error);
		return ethers.constants.Zero;
	}
}

const getRewardPerBlock = async (contract: Contract): Promise<BigNumber> => {
	try {
		if (!contract.options.address) return ethers.constants.Zero;
		return BigNumber.from(await contract.methods.rewardPerBlock().call());
	} catch (error) {
		console.error(error);
		return ethers.constants.Zero;
	}
}

const getTotalAllocPoint = async (contract: Contract): Promise<BigNumber> => {
	try {
		if (!contract.options.address) return ethers.constants.Zero;
		return BigNumber.from(await contract.methods.totalAllocPoint().call());
	} catch (error) {
		console.error(error);
		return ethers.constants.Zero;
	}
}

const getPoolInfo = async (contract: Contract, poolId: number): Promise<{
	lpToken: string;
	allocPoint: BigNumber;
	lastRewardBlock: BigNumber;
	accRewardPerShare: BigNumber;
}> => {
	const defaultRes = {
		lpToken: '',
		allocPoint: ethers.constants.Zero,
		lastRewardBlock: ethers.constants.Zero,
		accRewardPerShare: ethers.constants.Zero
	}
	try {
		if (!contract.options.address) return defaultRes;
		const res = await contract.methods.poolInfo(poolId).call();
		return {
			lpToken: res.lpToken,
			allocPoint: BigNumber.from(res.allocPoint),
			lastRewardBlock: BigNumber.from(res.lastRewardBlock),
			accRewardPerShare: BigNumber.from(res.accRewardPerShare)
		}
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