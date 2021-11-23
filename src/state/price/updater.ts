import { BigNumber } from 'ethers';
import { POOLS, TOKENS } from 'constant';
import { useBlockNumber, useSushiPairContract } from 'hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPrice, SushiPair } from 'utils';
import { updateBentPrice, updatePrices, updateTokenPrice } from './actions';

export default function Updater(): null {
  const dispatch = useDispatch();
  const blockNumber = useBlockNumber();
  const sushiPair = useSushiPairContract(POOLS.SushiPools.Pools['BENT_DAI'].DepositAsset);

	useEffect(() => {
    const tokenAddrs = Object.keys(TOKENS).map(token => TOKENS[token].ADDR);
    getPrice(tokenAddrs).then(prices => dispatch(updatePrices(prices)))
    // Update Bent Price from Sushi pool
    Promise.all([
      SushiPair.getReserves(sushiPair),
      SushiPair.getTotalSupply(sushiPair),
    ]).then(([reserves, totalSupply]) => {
      const bentPrice = BigNumber.from(reserves.reserve0).isZero() ? 0 : BigNumber.from(reserves.reserve1).mul(10**6).div(reserves.reserve0).toNumber() / 10**6;
      dispatch(updateBentPrice(bentPrice));

      const lpPrice = BigNumber.from(totalSupply).isZero() ? 0 : BigNumber.from(reserves.reserve1).mul(2).mul(10**6).div(totalSupply).toNumber() / 10**6;
      dispatch(updateTokenPrice({ tokenAddr: sushiPair.options.address, price: lpPrice }));
    })
  }, [dispatch, blockNumber, sushiPair]);

  return null;
}
