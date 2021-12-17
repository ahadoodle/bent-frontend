import { BigNumber } from 'ethers';
import { createAction } from '@reduxjs/toolkit';
import { BentPoolReward } from './reducer';

export const updatePrices = createAction<Record<string, number>>('prices/updatePrices');
export const updateBentPrice = createAction<number>('prices/updateBentPrice');
export const updateBentCirculatingSupply = createAction<BigNumber>('prices/updateBentCirculatingSupply');
export const updateTokenPrice = createAction<{ tokenAddr: string, price: number }>('prices/updateTokenPrice');

export const updateBalance = createAction<{ tokenAddr: string, balance: BigNumber }>('contracts/updateBalance');
export const updateTotalSupply = createAction<{ tokenAddr: string, supply: BigNumber }>('contracts/updateTotalSupply');

export const updateStakingPoolTvl = createAction<BigNumber>('contracts/updateStakingPoolTvl');
export const updateStakingPoolAllowance = createAction<BigNumber>('contracts/updateStakingPoolAllowance');
export const updateStakingPoolDeposited = createAction<BigNumber>('contracts/updateStakingPoolDeposited');
export const updateStakingPoolDepositedUsd = createAction<BigNumber>('contracts/updateStakingPoolDepositedUsd');
export const updateStakingPoolEarningUsd = createAction<BigNumber>('contracts/updateStakingPoolEarningUsd');
export const updateStakingPoolApr = createAction<{ tokenAddr: string, apr: number }>('contracts/updateStakingPoolApr');
export const updateStakingPoolAvgApr = createAction<number>('contracts/updateStakingPoolAvgApr');
export const updateStakingPoolRewards = createAction<{ tokenAddr: string, reward: BigNumber }>('contracts/updateStakingPoolRewards');
export const updateStakingPoolRewardsUsd = createAction<{ tokenAddr: string, rewardUsd: BigNumber }>('contracts/updateStakingPoolRewardsUsd');
export const updateStakingPoolStakedBent = createAction<BigNumber>('contracts/updateStakingPoolStakedBent');

export const updateBentCvxAllowance = createAction<BigNumber>('contracts/updateBentCvxAllowance');
export const updateVlCvxBalance = createAction<BigNumber>('contracts/updateVlCvxBalance');

export const updateCrvPoolTVL = createAction<{ poolKey: string, tvl: BigNumber }>('contracts/updateCrvPoolTVL');
export const updateCrvPoolApr = createAction<{ poolKey: string, apr: number }>('contracts/updateCrvPoolApr');
export const updateCrvDeposit = createAction<{ poolKey: string, deposit: BigNumber }>('contracts/updateCrvDeposit');
export const updateCvxLpBalance = createAction<{ poolKey: string, deposit: BigNumber }>('contracts/updateCvxLpBalance');
export const updateCrvPoolRewards = createAction<{ poolKey: string, rewards: BigNumber[] }>('contracts/updateCrvPoolRewards');
export const updateCrvLpAllowance = createAction<{ poolKey: string, allowance: BigNumber }>('contracts/updateCrvLpAllowance');
export const updateBentPoolRewardsInfo = createAction<{ poolKey: string, rewardsInfo: BentPoolReward[] }>('contracts/updateBentPoolRewardsInfo');
export const updateCrvPoolEarnedUsd = createAction<{ poolKey: string, earned: BigNumber }>('contracts/updateCrvPoolEarnedUsd');
export const updateCrvPoolDepositedUsd = createAction<{ poolKey: string, deposited: BigNumber }>('contracts/updateCrvPoolDepositedUsd');

export const updateSushiPoolTVL = createAction<{ poolKey: string, tvl: BigNumber }>('contracts/updateSushiPoolTVL');
export const updateSushiPoolApr = createAction<{ poolKey: string, apr: number }>('contracts/updateSushiPoolApr');
export const updateSushiPoolRewards = createAction<{ poolKey: string, rewards: BigNumber }>('contracts/updateSushiPoolRewards');
export const updateSushiPoolEarnedUsd = createAction<{ poolKey: string, earned: BigNumber }>('contracts/updateSushiPoolEarnedUsd');
export const updateSushiLpDeposited = createAction<{ poolKey: string, deposited: BigNumber }>('contracts/updateSushiLpDeposited');
export const updateSushiLpDepositedUsd = createAction<{ poolKey: string, deposited: BigNumber }>('contracts/updateSushiLpDepositedUsd');