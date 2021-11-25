import { ethers, BigNumber } from 'ethers';
import { Contract } from 'web3-eth-contract';

const getReserves = async (contract: Contract): Promise<{
	reserve0: BigNumber,
	reserve1: BigNumber,
	blockTimestampLast: BigNumber
}> => {
	const defaultRes = {
		reserve0: ethers.constants.Zero,
		reserve1: ethers.constants.Zero,
		blockTimestampLast: ethers.constants.Zero
	}
	try {
		if (!contract.options.address) return defaultRes;
		const res = await contract.methods.getReserves().call();
		return {
			reserve0: BigNumber.from(res.reserve0),
			reserve1: BigNumber.from(res.reserve1),
			blockTimestampLast: BigNumber.from(res.blockTimestampLast),
		}
	} catch (error) {
		console.error(error);
		return defaultRes;
	}
}

const getTotalSupply = async (contract: Contract): Promise<BigNumber> => {
	try {
		if (!contract.options.address) return ethers.constants.Zero;
		return BigNumber.from(await contract.methods.totalSupply().call());
	} catch (error) {
		console.error(error);
		return ethers.constants.Zero;
	}
}

export const SushiPair = {
	getReserves,
	getTotalSupply
}