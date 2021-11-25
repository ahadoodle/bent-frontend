import axios from 'axios';
import { TOKENS } from 'constant';
import { BigNumber, utils } from 'ethers'

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
	return truncateMiddle(address, length, '.....');
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
		value = BigNumber.from(0)
	}

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

export const getCrvDepositLink = (tokenName: string): string => {
	if (tokenName === 'cvxCrv')
		return `https://curve.fi/factory/22/deposit`;
	else
		return `https://curve.fi/${tokenName}/deposit`;
}

export const getPrice = async (contract_addresses: string[], vsCoin = 'usd'): Promise<Record<string, number>> => {
	const url = `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${contract_addresses.join(',')}&vs_currencies=${vsCoin}`;
	try {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const res: any = await axios.get(url);
		Object.keys(res.data).forEach(key => {
			if (isNaN(res.data[key][vsCoin.toLowerCase()])) res.data[key][vsCoin.toLowerCase()] = 0;
		})
		return res.data;
	} catch (error) {
		console.error(error);
		await sleep(3000);
		return getPrice(contract_addresses, vsCoin);
	}
}

export const sleep = (ms = 0): Promise<unknown> => {
	return new Promise(resolve => {
		setTimeout(resolve, ms);
	});
}

export const getTokenDecimals = (addr: string): number => {
	const key = Object.keys(TOKENS).filter(key => TOKENS[key].ADDR.toLowerCase() === addr.toLowerCase())[0];
	return TOKENS[key].DECIMALS;
}