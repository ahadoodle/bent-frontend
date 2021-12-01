import { useSelector } from 'react-redux';
import { AppState } from '../index';

export function useTokenPrice(tokenAddr: string): number {
  return useSelector((state: AppState) => {
    console.log(state.price.tokenPrices);
    return state.price.tokenPrices[tokenAddr.toLowerCase()] || 0
  });
}

export function useTokenPrices(): Record<string, number> {
  return useSelector((state: AppState) => {
    // console.log(state.price.tokenPrices);
    return state.price.tokenPrices
  });
}