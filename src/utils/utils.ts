import { ABIS } from 'abis';
import axios from 'axios';
import { CrvCryptoFactoryPool, CrvFactoryPool, POOLS, TOKENS } from 'constant';
import { BigNumber, Contract, ethers, utils } from 'ethers'
import { Voter } from 'state/contracts/reducer';
import { simpleRpcProvider } from './providers';
import web3NoAccount from './web3';

export const truncateMiddle = (fullStr: string, strLen: number, separator: string): string => {
	if (!fullStr || fullStr.length <= strLen) return fullStr;

	separator = separator || '...';

	const sepLen = separator.length,
		charsToShow = strLen - sepLen,
		frontChars = Math.ceil(charsToShow / 2),
		backChars = Math.floor(charsToShow / 2);

	return fullStr.substr(0, frontChars) + separator + fullStr.substr(fullStr.length - backChars);
};

export const formatAddress = (address: string, length = 15): string => {
	return truncateMiddle(address, length, '...');
}

export function formatNumber(value: string): string {
	const [floor, decimals] = value.split('.')
	if (!decimals) {
		return value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
	}
	return [floor.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'), decimals].join('.')
}

export const formatBigNumber = (value?: BigNumber, units = 18, displayDec = 3): string => {
	if (!value) {
		value = ethers.constants.Zero
	}
	value = BigNumber.from(value);

	const valString = utils.formatUnits(value, units)
	const decimalTrimmed = (() => {
		if (displayDec === 0) {
			return valString.split('.')[0]
		}
		const reg = new RegExp(`(\\.\\d{` + displayDec + `}).*`)
		return valString.replace(reg, '$1')
	})()

	let displayNum = formatNumber(decimalTrimmed)
	if (parseFloat(decimalTrimmed) === 0 && value.gt(0)) {
		// if display shows zero for a non-zero amount,
		// show that the amount is less than display setting ex < 0.001
		displayNum = `< ${displayNum.replace(/.$/, '1')}`
	}

	return displayNum;
}

export const formatMillions = (value: string): string => {
	if (value === '0') return '0.00';
	const parts = value.split('.');
	const steps = parts[0].split(',');
	const first = steps[0];
	const last = steps.length > 1 ? (steps[1][0] + steps[1][1]) : parseFloat(`0.${value.split('.')[1]}`).toFixed(2).split('.')[1];
	const unit = steps.length > 3 ? 'B' : steps.length > 2 ? 'M' : steps.length > 1 ? 'K' : '';
	return `${first}.${last}${unit}`;
}

export const formatMillionsBigNumber = (value?: BigNumber, units = 18, displayDec = 3): string => {
	return formatMillions(formatBigNumber(value, units, displayDec));
}

export const getCrvApys = async (): Promise<Record<string, {
	baseApy: BigNumber;
	crvBoost: number;
}>> => {
	const url = 'https://getbent-api-supply.bentfinance.com/api/bent/curveApys';
	try {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const res: any = await axios.get(url);
		const apys: Record<string, {
			baseApy: BigNumber;
			crvBoost: number;
		}> = {};
		Object.keys(res.data.apys).forEach(key => {
			const apy = Math.floor(parseFloat(res.data.apys[key].baseApy) * 100);
			apys[key] = {
				baseApy: BigNumber.from((isNaN(apy) ? 0 : apy).toString()),
				crvBoost: res.data.apys[key].crvBoost.toFixed(2)
			}
		})
		return apys;
	} catch (error) {
		console.error(error);
		return {};
	}
}

export const getPrice = async (contract_addresses: string[], vsCoin = 'usd'): Promise<Record<string, number>> => {
	const url = `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${contract_addresses.join(',')}&vs_currencies=${vsCoin}`;
	try {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const res: any = await axios.get(url);
		const priceData: Record<string, number> = {};
		Object.keys(res.data).forEach(key => {
			if (isNaN(res.data[key][vsCoin.toLowerCase()]))
				res.data[key][vsCoin.toLowerCase()] = 0;
			priceData[key.toLowerCase()] = isNaN(res.data[key][vsCoin.toLowerCase()]) ? 0 : res.data[key][vsCoin.toLowerCase()];
		})
		priceData[TOKENS.LUNAWORM.ADDR.toLowerCase()] = priceData[TOKENS.WLUNA.ADDR.toLowerCase()];
		return priceData;
	} catch (error) {
		console.error(error);
		await sleep(3000);
		return getPrice(contract_addresses, vsCoin);
	}
}

export const getSushiTradingVolume = async (): Promise<number> => {
	const url = 'https://api.coingecko.com/api/v3/coins/bent-finance';
	try {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const res: any = await axios.get(url);
		const oneDayVolume = res.data.tickers.filter(element =>
			element.base.toLowerCase() === TOKENS.BENT.ADDR.toLowerCase() &&
			element.target.toLowerCase() === TOKENS.DAI.ADDR.toLowerCase()
		)[0].converted_volume.usd;
		return oneDayVolume;
	} catch (error) {
		return 0;
	}
}

export const getCrvFactoryInfo = async (): Promise<Record<string, CrvFactoryPool>> => {
	const url = `https://api.curve.fi/api/getFactoryV2Pools`;
	try {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const res: any = await axios.get(url);
		if (!res.data.success) return {};
		const poolData = res.data.data.poolData;
		const result: Record<string, CrvFactoryPool> = {};
		poolData.forEach(pool => {
			result[pool.address.toLowerCase()] = pool;
		});
		return result;
	} catch (error) {
		console.error(error);
		return {}
	}
}

export const getCrvCryptoFactoryInfo = async (): Promise<Record<string, CrvCryptoFactoryPool>> => {
	const url = 'https://api.curve.fi/api/getTVLCrypto';
	try {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const res: any = await axios.get(url);
		if (!res.data.success) return {};
		const poolData = res.data.data.cryptoPools;
		const result: Record<string, CrvCryptoFactoryPool> = {};
		Object.keys(poolData).forEach(key => {
			result[poolData[key].token.toLowerCase()] = poolData[key];
		})
		return result;
	} catch (error) {
		console.error(error);
		return {}
	}
}

export const getCrvCryptoInfoFromBent = async (): Promise<Record<string, CrvCryptoFactoryPool>> => {
	const url = 'https://getbent-api-supply.bentfinance.com/api/get-crv-tvl';
	try {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const res: any = await axios.get(url);
		const poolData = res.data;
		const result: Record<string, CrvCryptoFactoryPool> = {};
		Object.keys(poolData).forEach(key => {
			result[poolData[key].token.toLowerCase()] = poolData[key];
		})
		return result;
	} catch (error) {
		console.error(error);
		return {}
	}
}

export const getBentCvxApy = async (): Promise<number> => {
	const url = 'https://api.curve.fi/api/getFactoryAPYs?version=2';
	try {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const res: any = await axios.get(url);
		if (!res.data.success) return 0;
		const poolInfo = res.data.data.poolDetails.filter(el => el.poolAddress.toLowerCase() === POOLS.BentPools['BENTCVX'].DepositAsset);
		if (poolInfo.length === 0) return 0;
		return parseFloat(poolInfo[0].apy.toFixed(2));
	} catch (error) {
		console.error(error);
		return 0
	}
}

export const getCirculatingSupply = async (): Promise<BigNumber> => {
	const url = 'https://getbent-api-supply.bentfinance.com/api/bent/circulatingSupply';
	try {
		const res = await axios.get(url);
		return BigNumber.from(String(res.data).toString());
	} catch (error) {
		return ethers.constants.Zero;
	}
}

export const getWeBentApr = async (): Promise<number> => {
	const url = 'https://getbent-api-supply.bentfinance.com/api/bent/weBentApr';
	try {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const res: any = await axios.get(url);
		const apr: number = res.data.toString();
		return parseFloat(apr.toString());
	} catch (error) {
		return 0;
	}
}

export const sleep = (ms = 0): Promise<unknown> => {
	return new Promise(resolve => {
		setTimeout(resolve, ms);
	});
}

export const getTokenDecimals = (addr: string): number => {
	const key = Object.keys(TOKENS).filter(key => TOKENS[key].ADDR.toLowerCase() === addr.toLowerCase())[0];
	if (!key) return 18;
	return TOKENS[key].DECIMALS;
}

export const getTokenPrice = (tokenPrices: Record<string, number>, addr: string): BigNumber => {
	if (addr === '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' || addr === 'ETH') // Black Hole
		addr = TOKENS['WETH'].ADDR;
	else if (addr.toLowerCase() === TOKENS['BENTCVX'].ADDR.toLowerCase()) {
		addr = TOKENS['CVX'].ADDR;
	}
	const price = tokenPrices[addr.toLowerCase()];
	if (!price) return ethers.constants.Zero;
	return utils.parseUnits(price.toString());
}

export const getEtherscanLink = (addr: string): string => {
	return `https://etherscan.io/address/${addr}`;
}

export const getAnnualReward = (rewardRate: BigNumber, tokenAddr: string, tokenPrice: number, extraDecimal = true): BigNumber => {
	if (!tokenPrice) return ethers.constants.Zero;
	return rewardRate.mul(6400).mul(365)
		.mul(utils.parseUnits(tokenPrice.toString()))
		.div(BigNumber.from(10).pow((extraDecimal ? 36 : 0) + getTokenDecimals(tokenAddr)));
}

export const getSumBigNumbers = (bns: Record<string, BigNumber>): BigNumber => {
	let total = ethers.constants.Zero;
	Object.keys(bns).forEach(key => {
		total = total.add(bns[key]);
	})
	return total;
}

export const getEthBalanceOf = async (address: string): Promise<BigNumber> => {
	try {
		if (!address) return ethers.constants.Zero;
		return BigNumber.from(await web3NoAccount.eth.getBalance(address));
	} catch (error) {
		console.error(error);
		return ethers.constants.Zero;
	}
}

export const increaseGasLimit = (gasLimit: BigNumber): BigNumber => {
	return BigNumber.from(gasLimit).mul(120).div(100);
}

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
// eslint-disable-next-line  @typescript-eslint/explicit-module-boundary-types
export const sortCrvPool = (a, b, field: string, order: number): number => {
	if (field === 'name') {
		return a.Name.localeCompare(b.Name) * order;
	}
	if (field === 'earned' || field === 'apr' || field === 'deposit' || field === 'tvl') {
		return (BigNumber.from(a).gt(BigNumber.from(b)) ? 1 : -1) * order;
	}
	return 0;
}

// bentfinance.eth
export const bentFinanceHex = '0x62656e7466696e616e63652e6574680000000000000000000000000000000000';

// Snapshot GraphQL
export const getLastVotingInfo = async (): Promise<Voter[]> => {
	try {
		const lastVoteUrl = 'https://hub.snapshot.org/graphql?operationName=Proposals&query=query%20Proposals%20%7B%0A%20%20proposals%20(%0A%20%20%20%20first%3A%201%2C%0A%20%20%20%20skip%3A%200%2C%0A%20%20%20%20where%3A%20%7B%0A%20%20%20%20%20%20space_in%3A%20%5B%22bentfinance.eth%22%5D%2C%0A%20%20%20%20%20%20state%3A%20%22closed%22%0A%20%20%20%20%7D%2C%0A%20%20%20%20orderBy%3A%20%22created%22%2C%0A%20%20%20%20orderDirection%3A%20desc%0A%20%20)%20%7B%0A%20%20%20%20id%0A%20%20%20%20title%0A%20%20%20%20start%0A%20%20%20%20end%0A%20%20%7D%0A%7D'
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const lastProposalInfo: any = await axios.get(lastVoteUrl);
		const lastProposalId = lastProposalInfo.data.data.proposals[0].id;
		const lastVotersUrl = `https://hub.snapshot.org/graphql?operationName=Votes&query=query%20Votes%20%7B%0A%20%20votes%20(%0A%20%20%20%20first%3A%201000%0A%20%20%20%20skip%3A%200%0A%20%20%20%20where%3A%20%7B%0A%20%20%20%20%20%20proposal%3A%20%22${lastProposalId}%22%0A%20%20%20%20%7D%0A%20%20%20%20orderBy%3A%20%22vp%22%2C%0A%20%20%20%20orderDirection%3A%20desc%0A%20%20)%20%7B%0A%20%20%20%20id%0A%20%20%20%20voter%0A%20%20%20%20vp%0A%20%20%20%20created%0A%20%20%20%20choice%0A%20%20%7D%0A%7D%0A`;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const lastVotersInfo: any = await axios.get(lastVotersUrl);
		const lastVoters = lastVotersInfo.data.data.votes;

		const ensContract = new Contract(
			'0x3671ae578e63fdf66ad4f3e12cc0c0d71ac7510c',
			ABIS.ENSRecord,
			simpleRpcProvider
		);
		const ensNames = await ensContract.getNames(lastVoters.map(vote => vote.voter));
		lastVoters.forEach((vote, index) => lastVoters[index].ens = ensNames[index]);

		return lastVoters;
	} catch (error) {
		console.error(error);
		return [];
	}
}