import { createReducer } from '@reduxjs/toolkit';
import { TOKENS } from 'constant';
import {
	updatePrices,
	updateBentPrice,
	updateTokenPrice,
} from './actions';

export interface PriceState {
  tokenPrices: Record<string, number>
}

const initialState: PriceState = {
	tokenPrices: {
		'0x6b175474e89094c44da98b954eedeac495271d0f': 1,	// DAI
		'0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490': 1,	// 3Crv
	}
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updatePrices, (state, action) => {
      const prices = action.payload;
			Object.keys(prices).forEach(price => {
				state.tokenPrices[price] = prices[price]['usd'];
			})
    })
		.addCase(updateBentPrice, (state, action) => {
			state.tokenPrices[TOKENS['BENT'].ADDR] = action.payload;
		})
		.addCase(updateTokenPrice, (state, action) => {
			const { tokenAddr, price } = action.payload
			state.tokenPrices[tokenAddr] = price;
		})
);
