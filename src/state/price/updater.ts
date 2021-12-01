import { TOKENS } from 'constant';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPrice } from 'utils';
import { updatePrices } from './actions';

export default function Updater(): null {
  const dispatch = useDispatch();
  useEffect(() => {
    const tokenAddrs = Object.keys(TOKENS).map(token => TOKENS[token].ADDR);
    getPrice(tokenAddrs).then(prices => dispatch(updatePrices(prices)))
  }, [dispatch]);

  return null;
}
