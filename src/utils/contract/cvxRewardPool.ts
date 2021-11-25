import { BigNumber, ethers } from 'ethers';
import { Contract } from 'web3-eth-contract';

const getBalanceOf = async (contract: Contract, account: string | null | undefined): Promise<BigNumber> => {
	try {
		if (!account || !contract.options.address) return ethers.constants.Zero;
		return BigNumber.from(await contract.methods.balanceOf(account).call());
	} catch (error) {
		console.error(error);
		return ethers.constants.Zero;
	}
}

export const CvxRewardPool = {
	getBalanceOf
}