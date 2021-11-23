import { createAction } from '@reduxjs/toolkit';

export const updatePrices = createAction<Record<string, number>>('prices/updatePrices');
export const updateBentPrice = createAction<number>('prices/updateBentPrice');
export const updateTokenPrice = createAction<{tokenAddr: string, price: number}>('prices/updateTokenPrice');