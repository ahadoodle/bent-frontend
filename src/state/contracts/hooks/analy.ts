import { BigNumber } from "ethers";
import {
	useBentCvxStakedUSD,
	useBentCvxTotalEarned,
	useBentCvxTvl,
	useBentEarnedUsd,
	useBentStakedUsd,
	useBentTvl,
	useCrvPoolTotalDepositedUsds,
	useCrvPoolTotalEarned,
	useCrvTotalTvl,
	useSushiPoolTotalDepositedUsd,
	useSushiPoolTotalEarned,
	useSushiTotalTvl,
	useWeBentDepositsUsd,
	useWeBentEarnedUsd,
	useWeBentTvl
} from ".";

export const useTotalTvl = (): BigNumber => {
	const crvTvl = useCrvTotalTvl();
	const sushiTvl = useSushiTotalTvl();
	const bentTvl = useBentTvl();
	const bentCvxTvl = useBentCvxTvl();
	const weBentTvl = useWeBentTvl();

	return crvTvl.add(sushiTvl).add(bentTvl).add(bentCvxTvl).add(weBentTvl);
}

export const useTotalEarnings = (): BigNumber => {
	const crvEarnings = useCrvPoolTotalEarned();
	const sushiEarnings = useSushiPoolTotalEarned();
	const bentEarnings = useBentEarnedUsd();
	const bentCvxEarned = useBentCvxTotalEarned();
	const weBentEarned = useWeBentEarnedUsd();

	return crvEarnings.add(sushiEarnings).add(bentEarnings).add(bentCvxEarned).add(weBentEarned);
}

export const useTotalDeposits = (): BigNumber => {
	const crvDeposits = useCrvPoolTotalDepositedUsds();
	const sushiDeposits = useSushiPoolTotalDepositedUsd();
	const bentDeposits = useBentStakedUsd();
	const bentCvxDeposits = useBentCvxStakedUSD();
	const webentDeposits = useWeBentDepositsUsd();

	return crvDeposits.add(sushiDeposits).add(bentDeposits).add(bentCvxDeposits).add(webentDeposits)
}