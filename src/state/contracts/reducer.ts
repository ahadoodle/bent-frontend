import { BigNumber, ethers } from 'ethers';
import { createReducer } from '@reduxjs/toolkit';
import {
	updatePrices,
	updateBentPrice,
	updateTokenPrice,
	updateBalance,
	updateBentPoolRewardsInfo,
	updateCrvDeposit,
	updateCrvLpAllowance,
	updateCrvPoolApr,
	updateCrvPoolDepositedUsd,
	updateCrvPoolEarnedUsd,
	updateCrvPoolRewards,
	updateCrvPoolTVL,
	updateCvxLpBalance,
	updateSushiLpDeposited,
	updateSushiLpDepositedUsd,
	updateSushiPoolApr,
	updateSushiPoolEarnedUsd,
	updateSushiPoolTVL,
	updateTotalSupply,
	updateSushiPoolRewards,
	updateStakingPoolTvl,
	updateStakingPoolAllowance,
	updateStakingPoolDepositedUsd,
	updateStakingPoolDeposited,
	updateStakingPoolAvgApr,
	updateStakingPoolApr,
	updateStakingPoolEarningUsd,
	updateStakingPoolRewards,
	updateStakingPoolRewardsUsd,
	updateStakingPoolStakedBent,
} from './actions';
import { TOKENS } from 'constant';

export interface BentPoolReward {
	rewardRate: BigNumber,
	rewardToken: string,
}

export interface ContractsState {
	tokenPrices: Record<string, number>

	balances: Record<string, BigNumber>;
	totalSupplies: Record<string, BigNumber>;

	// Bent Staking Pool States
	bentTvl: BigNumber,
	bentStaked: BigNumber,
	bentStakedUsd: BigNumber,
	bentEarnedUsd: BigNumber,
	bentAllowance: BigNumber,
	bentRewards: Record<string, BigNumber>,
	bentRewardsUsd: Record<string, BigNumber>,
	bentAvgApr: number,
	bentAprs: Record<string, number>,
	bentTotalStaked: BigNumber,

	// Curve Pool States
	crvTvl: Record<string, BigNumber>;
	crvApr: Record<string, number>;
	crvDeposit: Record<string, BigNumber>;
	cvxLpBalance: Record<string, BigNumber>;			// Crv lp balance deposited on Cvx pool
	crvPoolRewards: Record<string, BigNumber[]>;	// Crv Pool Rewards
	bentPoolRewardsInfo: Record<string, BentPoolReward[]>;
	crvLpAllowance: Record<string, BigNumber>;
	crvEarnedUsd: Record<string, BigNumber>;
	crvDepositedUsd: Record<string, BigNumber>;

	// Sushi Pool States
	sushiTvl: Record<string, BigNumber>;
	sushiApr: Record<string, number>;
	sushiRewards: Record<string, BigNumber>;
	sushiEarnedUsd: Record<string, BigNumber>;
	sushiDepositedUsd: Record<string, BigNumber>;
	sushiLpDeposited: Record<string, BigNumber>;
}

const initialState: ContractsState = {
	tokenPrices: {},

	balances: {},
	totalSupplies: {},

	bentTvl: ethers.constants.Zero,
	bentStaked: ethers.constants.Zero,
	bentStakedUsd: ethers.constants.Zero,
	bentEarnedUsd: ethers.constants.Zero,
	bentAllowance: ethers.constants.Zero,
	bentRewards: {},
	bentRewardsUsd: {},
	bentAprs: {},
	bentAvgApr: 0,
	bentTotalStaked: ethers.constants.Zero,

	crvTvl: {},
	crvApr: {},
	crvDeposit: {},
	cvxLpBalance: {},
	crvPoolRewards: {},
	bentPoolRewardsInfo: {},
	crvLpAllowance: {},
	crvEarnedUsd: {},
	crvDepositedUsd: {},

	sushiTvl: {},
	sushiApr: {},
	sushiRewards: {},
	sushiEarnedUsd: {},
	sushiDepositedUsd: {},
	sushiLpDeposited: {},
};

export default createReducer(initialState, (builder) =>
	builder
		.addCase(updatePrices, (state, action) => {
			const prices = action.payload;
			if (!state.tokenPrices) state.tokenPrices = {};
			Object.keys(prices).forEach(tokenAddr => {
				state.tokenPrices[tokenAddr.toLowerCase()] = prices[tokenAddr];
			})
		}).addCase(updateBentPrice, (state, action) => {
			if (!state.tokenPrices) state.tokenPrices = {};
			state.tokenPrices[TOKENS['BENT'].ADDR.toLowerCase()] = action.payload;
		}).addCase(updateTokenPrice, (state, action) => {
			const { tokenAddr, price } = action.payload
			if (!state.tokenPrices) state.tokenPrices = {};
			state.tokenPrices[tokenAddr.toLowerCase()] = price;
		})

		.addCase(updateBalance, (state, action) => {
			const { tokenAddr, balance } = action.payload;
			if (!state.balances) state.balances = {};
			state.balances[tokenAddr.toLowerCase()] = balance;
		}).addCase(updateTotalSupply, (state, action) => {
			const { tokenAddr, supply } = action.payload;
			if (!state.totalSupplies) state.totalSupplies = {};
			state.totalSupplies[tokenAddr.toLowerCase()] = supply;
		})

		.addCase(updateCrvPoolTVL, (state, action) => {
			const { poolKey, tvl } = action.payload;
			if (!state.crvTvl) state.crvTvl = {};
			state.crvTvl[poolKey] = tvl;
		}).addCase(updateCrvPoolApr, (state, action) => {
			const { poolKey, apr } = action.payload;
			if (!state.crvApr) state.crvApr = {};
			state.crvApr[poolKey] = apr;
		}).addCase(updateCrvDeposit, (state, action) => {
			const { poolKey, deposit } = action.payload;
			if (!state.crvDeposit) state.crvDeposit = {};
			state.crvDeposit[poolKey] = deposit;
		}).addCase(updateCvxLpBalance, (state, action) => {
			const { poolKey, deposit } = action.payload;
			if (!state.cvxLpBalance) state.cvxLpBalance = {};
			state.cvxLpBalance[poolKey] = deposit;
		}).addCase(updateCrvPoolRewards, (state, action) => {
			const { poolKey, rewards } = action.payload;
			if (!state.crvPoolRewards) state.crvPoolRewards = {};
			state.crvPoolRewards[poolKey] = rewards;
		}).addCase(updateBentPoolRewardsInfo, (state, action) => {
			const { poolKey, rewardsInfo } = action.payload;
			if (!state.bentPoolRewardsInfo) state.bentPoolRewardsInfo = {};
			state.bentPoolRewardsInfo[poolKey] = rewardsInfo;
		}).addCase(updateCrvLpAllowance, (state, action) => {
			const { poolKey, allowance } = action.payload;
			if (!state.crvLpAllowance) state.crvLpAllowance = {};
			state.crvLpAllowance[poolKey] = allowance;
		}).addCase(updateCrvPoolEarnedUsd, (state, action) => {
			const { poolKey, earned } = action.payload;
			if (!state.crvEarnedUsd) state.crvEarnedUsd = {};
			state.crvEarnedUsd[poolKey] = earned;
		}).addCase(updateCrvPoolDepositedUsd, (state, action) => {
			const { poolKey, deposited } = action.payload;
			if (!state.crvDepositedUsd) state.crvDepositedUsd = {};
			state.crvDepositedUsd[poolKey] = deposited;
		})

		.addCase(updateSushiPoolTVL, (state, action) => {
			const { poolKey, tvl } = action.payload;
			if (!state.sushiTvl) state.sushiTvl = {};
			state.sushiTvl[poolKey] = tvl;
		}).addCase(updateSushiPoolApr, (state, action) => {
			const { poolKey, apr } = action.payload;
			if (!state.sushiApr) state.sushiApr = {};
			state.sushiApr[poolKey] = apr;
		}).addCase(updateSushiLpDeposited, (state, action) => {
			const { poolKey, deposited } = action.payload;
			if (!state.sushiLpDeposited) state.sushiLpDeposited = {};
			state.sushiLpDeposited[poolKey] = deposited;
		}).addCase(updateSushiPoolEarnedUsd, (state, action) => {
			const { poolKey, earned } = action.payload;
			if (!state.sushiEarnedUsd) state.sushiEarnedUsd = {};
			state.sushiEarnedUsd[poolKey] = earned;
		}).addCase(updateSushiLpDepositedUsd, (state, action) => {
			const { poolKey, deposited } = action.payload;
			if (!state.sushiDepositedUsd) state.sushiDepositedUsd = {};
			state.sushiDepositedUsd[poolKey] = deposited;
		}).addCase(updateSushiPoolRewards, (state, action) => {
			const { poolKey, rewards } = action.payload;
			if (!state.sushiRewards) state.sushiRewards = {};
			state.sushiRewards[poolKey] = rewards;
		})

		.addCase(updateStakingPoolTvl, (state, action) => {
			state.bentTvl = action.payload;
		}).addCase(updateStakingPoolAllowance, (state, action) => {
			state.bentAllowance = action.payload;
		}).addCase(updateStakingPoolDepositedUsd, (state, action) => {
			state.bentStakedUsd = action.payload;
		}).addCase(updateStakingPoolDeposited, (state, action) => {
			state.bentStaked = action.payload;
		}).addCase(updateStakingPoolAvgApr, (state, action) => {
			state.bentAvgApr = action.payload;
		}).addCase(updateStakingPoolApr, (state, action) => {
			const { tokenAddr, apr } = action.payload;
			if (!state.bentAprs) state.bentAprs = {};
			state.bentAprs[tokenAddr] = apr;
		}).addCase(updateStakingPoolEarningUsd, (state, action) => {
			state.bentEarnedUsd = action.payload;
		}).addCase(updateStakingPoolRewards, (state, action) => {
			const { tokenAddr, reward } = action.payload;
			if (!state.bentRewards) state.bentRewards = {};
			state.bentRewards[tokenAddr] = reward;
		}).addCase(updateStakingPoolRewardsUsd, (state, action) => {
			const { tokenAddr, rewardUsd } = action.payload;
			if (!state.bentRewardsUsd) state.bentRewardsUsd = {};
			state.bentRewardsUsd[tokenAddr] = rewardUsd;
		}).addCase(updateStakingPoolStakedBent, (state, action) => {
			state.bentTotalStaked = action.payload;
		})
);
