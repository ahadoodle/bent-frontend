import { utils } from "ethers";

const stake = async (contract, account, amount, gasPrice) => {
	try {
		if(!account || !contract.options.address) return false;
		amount = utils.parseUnits(amount, 18);
		const gas = await contract.methods.deposit(amount).estimateGas();
		await contract.methods.deposit(amount).send({
			from: account,
			gas,
			gasPrice,
		});
	} catch (error) {
		console.error(error);
		return false;
	}
}

const getDepositedAmount = async (contract, account) => {
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
	getDepositedAmount
}