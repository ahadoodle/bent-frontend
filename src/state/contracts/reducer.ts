import { BigNumber } from 'ethers';
import { createReducer } from '@reduxjs/toolkit';
import {
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
} from './actions';

export interface BentPoolReward {
	rewardRate: BigNumber,
	rewardToken: string,
}

export interface ContractsState {
	balances: Record<string, BigNumber>;
	totalSupplies: Record<string, BigNumber>;

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
	sushiEarnedUsd: Record<string, BigNumber>;
	sushiDepositedUsd: Record<string, BigNumber>;
	sushiLpDeposited: Record<string, BigNumber>;
}

const initialState: ContractsState = {
	balances: {},
	totalSupplies: {},

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
	sushiEarnedUsd: {},
	sushiDepositedUsd: {},
	sushiLpDeposited: {},
};

export default createReducer(initialState, (builder) =>
	builder
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
		})
);
