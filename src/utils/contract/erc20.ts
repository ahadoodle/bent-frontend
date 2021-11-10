import { utils } from "ethers";

const getBalanceOf = async (contract, account) => {
	try {
		if(!account || !contract.options.address) return 0;
		return await contract.methods.balanceOf(account).call();
	} catch (error) {
		console.error(error);
		return 0;
	}
}

const getAllowance = async (contract, account, spender) => {
	try {
		if(!account || !contract.options.address) return 0;
		return await contract.methods.allowance(account, spender).call();
	} catch (error) {
		console.error(error);
		return 0;
	}
}

const getSymbol = async (contract) => {
	try {
		if(!contract.options.address) return '';
		return await contract.methods.symbol().call();
	} catch (error) {
		console.error(error);
		return '';
	}
}

const approve = async (contract, account, spender, amount) => {
	try {
		if(!account || !contract.options.address) return 0;
		amount = utils.parseUnits(amount, 18);
		return await contract.methods.approve(spender, amount).send({from: account});
	} catch (error) {
		console.error(error);
		return 0;
	}
}

export const ERC20 = {
	getSymbol,
	getBalanceOf,
	getAllowance,
	approve,
}