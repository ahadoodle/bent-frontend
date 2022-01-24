import { BigNumber, ethers } from 'ethers';
import { createReducer } from '@reduxjs/toolkit';
import {
	updateContractInfo,
} from './actions';

export interface BentPoolReward {
	rewardRate: BigNumber,
	rewardToken: string,
}

export interface CrvApy {
	baseCrvvApr: BigNumber;
	crvvApr: BigNumber;
	cvxvApr: BigNumber;
	bentApr: BigNumber;
	additionalRewardvApr: BigNumber;
	crvBoost: number;
}

export interface WeBentLockedData {
	amount: BigNumber;
	unlockAt: BigNumber;
}

export interface ContractsState {
	bentCirculatingSupply: BigNumber,
	tokenPrices: Record<string, number>

	balances: Record<string, BigNumber>;
	totalSupplies: Record<string, BigNumber>;

	// weBent Pool States
	weBentAllowance: BigNumber;
	weBentBalance: BigNumber;
	weBentLocked: BigNumber;
	weBentTotalSupply: BigNumber;
	weBentBentBalance: BigNumber;
	weBentTvl: BigNumber;
	weBentLockedData: WeBentLockedData[];
	weBentLockDuration: BigNumber;
	weBentAvgApr: number,
	weBentEarnedUsd: BigNumber,
	weBentAprs: Record<string, number>,
	weBentRewards: Record<string, BigNumber>,
	weBentRewardsUsd: Record<string, BigNumber>,

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

	// BentCVX Staking Pool States
	bentCvxAllowance: BigNumber,
	vlCvxBalance: BigNumber,
	bentCvxStakingAllowance: BigNumber,
	bentCvxStaked: BigNumber,
	bentCvxTotalStaked: BigNumber,
	bentCvxTvl: BigNumber,
	bentCvxRewards: Record<string, BigNumber[]>,
	bentCvxRewardsUsd: Record<string, BigNumber[]>,
	bentCvxEarned: Record<string, BigNumber>,
	bentCvxAprs: Record<string, number[]>,
	bentCvxPoolAprs: Record<string, number>,
	bentCvxAvgApr: number,

	// Curve Pool States
	crvTvl: Record<string, BigNumber>;
	crvApr: Record<string, number>;
	crvDeposit: Record<string, BigNumber>;
	crvPoolRewards: Record<string, BigNumber[]>;	// Crv Pool Rewards
	bentPoolRewardsInfo: Record<string, BentPoolReward[]>;
	crvLpAllowance: Record<string, BigNumber>;
	crvEarnedUsd: Record<string, BigNumber>;
	crvDepositedUsd: Record<string, BigNumber>;
	crvProjectedApr: Record<string, CrvApy>;

	// Sushi Pool States
	sushiTvl: Record<string, BigNumber>;
	sushiApr: Record<string, number>;
	sushiRewards: Record<string, BigNumber>;
	sushiEarnedUsd: Record<string, BigNumber>;
	sushiDepositedUsd: Record<string, BigNumber>;
	sushiLpDeposited: Record<string, BigNumber>;
}

const initialState: ContractsState = {
	bentCirculatingSupply: ethers.constants.Zero,
	tokenPrices: {},

	balances: {},
	totalSupplies: {},

	weBentAllowance: ethers.constants.Zero,
	weBentBalance: ethers.constants.Zero,
	weBentLocked: ethers.constants.Zero,
	weBentTotalSupply: ethers.constants.Zero,
	weBentBentBalance: ethers.constants.Zero,
	weBentTvl: ethers.constants.Zero,
	weBentLockedData: [],
	weBentLockDuration: ethers.constants.Zero,
	weBentAvgApr: 0,
	weBentEarnedUsd: ethers.constants.Zero,
	weBentAprs: {},
	weBentRewards: {},
	weBentRewardsUsd: {},

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

	bentCvxAllowance: ethers.constants.Zero,
	vlCvxBalance: ethers.constants.Zero,
	bentCvxStakingAllowance: ethers.constants.Zero,
	bentCvxStaked: ethers.constants.Zero,
	bentCvxTotalStaked: ethers.constants.Zero,
	bentCvxTvl: ethers.constants.Zero,
	bentCvxRewards: {},
	bentCvxRewardsUsd: {},
	bentCvxEarned: {},
	bentCvxAprs: {},
	bentCvxPoolAprs: {},
	bentCvxAvgApr: 0,

	crvTvl: {},
	crvApr: {},
	crvDeposit: {},
	crvPoolRewards: {},
	bentPoolRewardsInfo: {},
	crvLpAllowance: {},
	crvEarnedUsd: {},
	crvDepositedUsd: {},
	crvProjectedApr: {},

	sushiTvl: {},
	sushiApr: {},
	sushiRewards: {},
	sushiEarnedUsd: {},
	sushiDepositedUsd: {},
	sushiLpDeposited: {},
};

export default createReducer(initialState, (builder) =>
	builder
		.addCase(updateContractInfo, (state, action) => {
			Object.keys(action.payload.tokenPrices).forEach(tokenAddr => {
				state.tokenPrices[tokenAddr.toLowerCase()] = action.payload.tokenPrices[tokenAddr];
			})
			Object.keys(action.payload.balances).forEach(tokenAddr => {
				state.balances[tokenAddr.toLowerCase()] = action.payload.balances[tokenAddr];
			})
			Object.keys(action.payload.totalSupplies).forEach(tokenAddr => {
				state.totalSupplies[tokenAddr.toLowerCase()] = action.payload.totalSupplies[tokenAddr];
			})

			// Crv Pools
			Object.keys(action.payload.crvTvl).forEach(poolKey => {
				state.crvTvl[poolKey] = action.payload.crvTvl[poolKey];
			})
			Object.keys(action.payload.crvApr).forEach(poolKey => {
				state.crvApr[poolKey] = action.payload.crvApr[poolKey];
			})
			Object.keys(action.payload.crvDeposit).forEach(poolKey => {
				state.crvDeposit[poolKey] = action.payload.crvDeposit[poolKey];
			})
			Object.keys(action.payload.crvPoolRewards).forEach(poolKey => {
				state.crvPoolRewards[poolKey] = action.payload.crvPoolRewards[poolKey];
			})
			Object.keys(action.payload.bentPoolRewardsInfo).forEach(poolKey => {
				state.bentPoolRewardsInfo[poolKey] = action.payload.bentPoolRewardsInfo[poolKey];
			})
			Object.keys(action.payload.crvLpAllowance).forEach(poolKey => {
				state.crvLpAllowance[poolKey] = action.payload.crvLpAllowance[poolKey];
			})
			Object.keys(action.payload.crvEarnedUsd).forEach(poolKey => {
				state.crvEarnedUsd[poolKey] = action.payload.crvEarnedUsd[poolKey];
			})
			Object.keys(action.payload.crvDepositedUsd).forEach(poolKey => {
				state.crvDepositedUsd[poolKey] = action.payload.crvDepositedUsd[poolKey];
			})
			Object.keys(action.payload.crvProjectedApr).forEach(poolKey => {
				if (!state.crvProjectedApr) state.crvProjectedApr = {};
				state.crvProjectedApr[poolKey] = action.payload.crvProjectedApr[poolKey];
			})

			// Sushi Pools
			Object.keys(action.payload.sushiTvl).forEach(poolKey => {
				state.sushiTvl[poolKey] = action.payload.sushiTvl[poolKey];
			})
			Object.keys(action.payload.sushiApr).forEach(poolKey => {
				state.sushiApr[poolKey] = action.payload.sushiApr[poolKey];
			})
			Object.keys(action.payload.sushiLpDeposited).forEach(poolKey => {
				state.sushiLpDeposited[poolKey] = action.payload.sushiLpDeposited[poolKey];
			})
			Object.keys(action.payload.sushiEarnedUsd).forEach(poolKey => {
				state.sushiEarnedUsd[poolKey] = action.payload.sushiEarnedUsd[poolKey];
			})
			Object.keys(action.payload.sushiDepositedUsd).forEach(poolKey => {
				state.sushiDepositedUsd[poolKey] = action.payload.sushiDepositedUsd[poolKey];
			})
			Object.keys(action.payload.sushiRewards).forEach(poolKey => {
				state.sushiRewards[poolKey] = action.payload.sushiRewards[poolKey];
			})

			// Bent Staking Pool
			state.bentTvl = action.payload.bentTvl;
			state.bentAllowance = action.payload.bentAllowance;
			state.bentStakedUsd = action.payload.bentStakedUsd;
			state.bentStaked = action.payload.bentStaked;
			state.bentAvgApr = action.payload.bentAvgApr;
			state.bentEarnedUsd = action.payload.bentEarnedUsd;
			state.bentTotalStaked = action.payload.bentTotalStaked;
			state.bentCirculatingSupply = action.payload.bentCirculatingSupply;
			Object.keys(action.payload.bentAprs).forEach(poolKey => {
				state.bentAprs[poolKey] = action.payload.bentAprs[poolKey];
			})
			Object.keys(action.payload.bentRewards).forEach(tokenAddr => {
				state.bentRewards[tokenAddr] = action.payload.bentRewards[tokenAddr];
			})
			Object.keys(action.payload.bentRewardsUsd).forEach(tokenAddr => {
				state.bentRewardsUsd[tokenAddr] = action.payload.bentRewardsUsd[tokenAddr];
			})

			// bentCVX
			state.bentCvxAllowance = action.payload.bentCvxAllowance;
			state.vlCvxBalance = action.payload.vlCvxBalance;
			state.bentCvxStakingAllowance = action.payload.bentCvxStakingAllowance
			state.bentCvxStaked = action.payload.bentCvxStaked;
			state.bentCvxTotalStaked = action.payload.bentCvxTotalStaked;
			state.bentCvxTvl = action.payload.bentCvxTvl;
			Object.keys(action.payload.bentCvxRewards).forEach(poolKey => {
				if (!state.bentCvxRewards) state.bentCvxRewards = {}
				state.bentCvxRewards[poolKey] = action.payload.bentCvxRewards[poolKey];
			})
			Object.keys(action.payload.bentCvxRewardsUsd).forEach(poolKey => {
				if (!state.bentCvxRewardsUsd) state.bentCvxRewardsUsd = {}
				state.bentCvxRewardsUsd[poolKey] = action.payload.bentCvxRewardsUsd[poolKey];
			})
			Object.keys(action.payload.bentCvxEarned).forEach(poolKey => {
				if (!state.bentCvxEarned) state.bentCvxEarned = {}
				state.bentCvxEarned[poolKey] = action.payload.bentCvxEarned[poolKey];
			})
			Object.keys(action.payload.bentCvxAprs).forEach(poolKey => {
				if (!state.bentCvxAprs) state.bentCvxAprs = {}
				state.bentCvxAprs[poolKey] = action.payload.bentCvxAprs[poolKey];
			})
			Object.keys(action.payload.bentCvxPoolAprs).forEach(poolKey => {
				if (!state.bentCvxPoolAprs) state.bentCvxPoolAprs = {}
				state.bentCvxPoolAprs[poolKey] = action.payload.bentCvxPoolAprs[poolKey];
			})
			state.bentCvxAvgApr = action.payload.bentCvxAvgApr;

			// weBent
			state.weBentAllowance = action.payload.weBentAllowance;
			state.weBentBalance = action.payload.weBentBalance;
			state.weBentLocked = action.payload.weBentLocked;
			state.weBentTotalSupply = action.payload.weBentTotalSupply;
			state.weBentBentBalance = action.payload.weBentBentBalance;
			state.weBentTvl = action.payload.weBentTvl;
			state.weBentLockedData = action.payload.weBentLockedData;
			state.weBentLockDuration = action.payload.weBentLockDuration;
			state.weBentEarnedUsd = action.payload.weBentEarnedUsd;
			state.weBentAvgApr = action.payload.weBentAvgApr;
			Object.keys(action.payload.weBentAprs).forEach(poolKey => {
				if (!state.weBentAprs) state.weBentAprs = {};
				state.weBentAprs[poolKey] = action.payload.weBentAprs[poolKey];
			})
			Object.keys(action.payload.weBentRewards).forEach(tokenAddr => {
				if (!state.weBentRewards) state.weBentRewards = {};
				state.weBentRewards[tokenAddr] = action.payload.weBentRewards[tokenAddr];
			})
			Object.keys(action.payload.weBentRewardsUsd).forEach(tokenAddr => {
				if (!state.weBentRewardsUsd) state.weBentRewardsUsd = {};
				state.weBentRewardsUsd[tokenAddr] = action.payload.weBentRewardsUsd[tokenAddr];
			})
		})
);
