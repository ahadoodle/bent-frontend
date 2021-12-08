import React, { useState } from "react";
import {
	Container, Button, Row, Col, Card, CardText, CardBody, Input
} from "reactstrap";
import { POOLS, TOKENS, TOKEN_LOGO } from "constant";
import { formatBigNumber } from "utils";
import {
	useBentAvgApr,
	useBentStaked,
	useBentStakedUsd,
	useBentRewardsAprs,
	useBentEarnedUsd,
	useBentRewards,
	useBentRewardsUsd,
	useGasPrice,
	useActiveWeb3React,
	useBentStakingContract,
} from 'hooks';
import { ethers, BigNumber } from "ethers";
import { ClaimBentRewardItem } from "./item";
import { DecimalSpan } from "components/DecimalSpan";

export const ClaimBent = (): React.ReactElement => {
	const [claimBtnText, setClaimBtnText] = useState('Claim');
	const [checkAll, setCheckAll] = useState(false);
	const [claimChecked, setClaimChecked] = useState<Record<number, boolean>>({});
	const bentStaked = useBentStaked();
	const bentstakedUsd = useBentStakedUsd();
	const bentAvgApr = useBentAvgApr();
	const rewardAprs = useBentRewardsAprs();
	const earnedUsd = useBentEarnedUsd();
	const bentRewards = useBentRewards();
	const bentRewardsUsd = useBentRewardsUsd();

	const { library } = useActiveWeb3React();
	const bentStakingContract = useBentStakingContract();
	const gasPrice = useGasPrice();

	const checkedIndexes = () => {
		const checkedIndexes: string[] = [];
		Object.keys(claimChecked).forEach(key => {
			if (claimChecked[key]) checkedIndexes.push(key);
		})
		return checkedIndexes;
	}

	const onClaim = async () => {
		if (!library) return;
		const signer = await library.getSigner();
		if (checkAll) {
			await bentStakingContract.connect(signer).claimAll({ gasPrice });
		} else {
			await bentStakingContract.connect(signer).claim(checkedIndexes(), { gasPrice });
		}
	}

	const onClaimCheckChange = (index: number, add: boolean) => {
		if (!add) setCheckAll(false);
		claimChecked[index] = add;
		setClaimChecked(Object.assign({}, claimChecked));
		if (checkedIndexes().length === POOLS.BentStaking.RewardAssets.length) {
			setCheckAll(true);
			setClaimBtnText('Claim All');
		} else {
			setClaimBtnText('Claim');
		}
	}

	const onCheckAll = () => {
		setCheckAll(!checkAll);
		POOLS.BentStaking.RewardAssets.forEach((key, index) => {
			claimChecked[index] = !checkAll;
		})
		setClaimChecked(Object.assign({}, claimChecked));
		if (!checkAll) {
			setClaimBtnText('Claim All');
		} else {
			setClaimBtnText('Claim');
		}
	}

	return (
		<Container className="stake-bent claim">
			<Row>
				<Col md="12">
					<div className="convert-up">
						<h2 className="white section-header">
							Claim Earnings
						</h2>
						<div className="toggleWrap tokentable table">
							<Row className="align-items-center thead p-0 pt-2 pb-2">
								<Col>
									<div className="imgText">
										<img src={TOKEN_LOGO.BENT} alt="" width="28" />
										<h2>Staked BENT</h2>
									</div>
								</Col>
								<Col>
									<div className="tableTitle">
										<p>Earned (USD)</p>
										<div className="boldText">
											<b>
												<span className="small">$</span>
												<DecimalSpan value={formatBigNumber(earnedUsd, 18, 2)} />
											</b>
										</div>
									</div>
								</Col>
								<Col>
									<div className="tableTitle">
										<p>APR</p>
										<div className="boldText">
											<b>
												<DecimalSpan value={bentAvgApr.toString()} />
												<span className="small"> %</span>
											</b>
										</div>
									</div>
								</Col>
								<Col>
									<div className="tableTitle">
										<p>My Staked ({bentStaked.isZero() ? '--' : formatBigNumber(bentStaked, 18, 2)} BENT)</p>
										<div className="boldText">
											<b>
												<span className="small">$</span>
												<DecimalSpan value={formatBigNumber(bentstakedUsd, 18, 2)} />
											</b>
										</div>
									</div>
								</Col>
								<Col>
									<Button
										className="claimbtn"
										onClick={onClaim}
										disabled={checkedIndexes().length === 0}
									>{claimBtnText}</Button>
								</Col>
							</Row>
							<Card>
								<CardBody>
									<div className="innerAccordian">
										<div className="converttabs">
											<Row>
												<Col sm="6">
													<CardText className="mt-0">
														<span className="small">Breakdown of claimable earnings:</span>
														<Input type="checkbox" className="mx-3" checked={checkAll} onChange={onCheckAll} />
														<span className="small">Select All</span>
													</CardText>
													<div className="bent-rewards-container">
														{POOLS.BentStaking.RewardAssets.map((key, index) =>
															<ClaimBentRewardItem
																index={index}
																tokenKey={key}
																apr={rewardAprs[TOKENS[key].ADDR.toLowerCase()] || 0}
																rewardUsd={bentRewardsUsd ? BigNumber.from(bentRewardsUsd[TOKENS[key].ADDR.toLowerCase()] || ethers.constants.Zero) : ethers.constants.Zero}
																reward={bentRewards ? BigNumber.from(bentRewards[TOKENS[key].ADDR.toLowerCase()] || ethers.constants.Zero) : ethers.constants.Zero}
																checked={claimChecked[index] || false}
																onChange={onClaimCheckChange}
															/>
														)}
													</div>
												</Col>
											</Row>
										</div>
									</div>
								</CardBody>
							</Card>
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	)
}