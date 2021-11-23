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
	tokenPrices: {}
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
