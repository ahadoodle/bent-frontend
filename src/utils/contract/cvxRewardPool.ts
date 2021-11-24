import { Contract } from 'web3-eth-contract';

const getBalanceOf = async (contract: Contract, account: string | null | undefined): Promise<number> => {
	try {
		if(!account || !contract.options.address) return 0;
		return await contract.methods.balanceOf(account).call();
	} catch (error) {
		console.error(error);
		return 0;
	}
}

export const CvxRewardPool = {
	getBalanceOf
}