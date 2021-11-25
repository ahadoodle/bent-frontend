import { Contract } from 'web3-eth-contract';

const getReserves = async (contract: Contract): Promise<{
	reserve0: number,
	reserve1: number,
	blockTimestampLast: number
}> => {
	const defaultRes = {
		reserve0: 0,
		reserve1: 0,
		blockTimestampLast: 0
	}
	try {
		if(!contract.options.address) return defaultRes;
		return await contract.methods.getReserves().call();
	} catch (error) {
		console.error(error);
		return defaultRes;
	}
}

const getTotalSupply = async (contract: Contract): Promise<number> => {
	try {
		if(!contract.options.address) return 0;
		return await contract.methods.totalSupply().call();
	} catch (error) {
		console.error(error);
		return 0;
	}
}

export const SushiPair = {
	getReserves,
	getTotalSupply
}