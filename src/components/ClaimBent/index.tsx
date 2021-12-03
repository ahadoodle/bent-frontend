import React from "react";
import {
	Container, Button, Row, Col, Card, CardText, CardBody,
} from "reactstrap";
import { POOLS, TOKENS, TOKEN_LOGO } from "constant";
import { formatBigNumber, BentStaking } from "utils";
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

export const ClaimBent = (): React.ReactElement => {
	const bentStaked = useBentStaked();
	const bentstakedUsd = useBentStakedUsd();
	const bentAvgApr = useBentAvgApr();
	const rewardAprs = useBentRewardsAprs();
	const earnedUsd = useBentEarnedUsd();
	const bentRewards = useBentRewards();
	const bentRewardsUsd = useBentRewardsUsd();

	const { account } = useActiveWeb3React();
	const bentStakingContract = useBentStakingContract(POOLS.BentStaking.POOL);
	const gasPrice = useGasPrice();

	const onClaim = async () => {
		await BentStaking.claimAll(bentStakingContract, account, gasPrice);
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
										<p>Total Earned (USD)</p>
										<div className="boldText">
											<b>
												<span className="small">$</span>{formatBigNumber(earnedUsd, 18, 2)}
											</b>
										</div>
									</div>
								</Col>
								<Col>
									<div className="tableTitle">
										<p>Average APR</p>
										<div className="boldText">
											<b>
												{bentAvgApr}<span className="small">%</span>
											</b>
										</div>
									</div>
								</Col>
								<Col>
									<div className="tableTitle">
										<p>My Staked BENT ({bentStaked.isZero() ? '--' : formatBigNumber(bentStaked, 18, 2)})</p>
										<div className="boldText">
											<span className="small">$</span><b>{formatBigNumber(bentstakedUsd, 18, 2)}</b>
										</div>
									</div>
								</Col>
								<Col>
									<Button className="claimbtn" onClick={onClaim}>Claim All</Button>
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
													</CardText>
													<div className="bent-rewards-container">
														{POOLS.BentStaking.RewardAssets.map(key =>
															<div className="imgText bent-rewards-item" key={key}>
																<img src={TOKENS[key].LOGO} alt="Icon" width="28" />
																<div>
																	<h4 className="mb-0">{key}</h4>
																	<p className="apr">{rewardAprs[TOKENS[key].ADDR.toLowerCase()] || 0}% APR</p>
																</div>
																<div>
																	<h4 className="mb-0"><span className="small">$</span>{formatBigNumber(bentRewardsUsd ? BigNumber.from(bentRewardsUsd[TOKENS[key].ADDR.toLowerCase()] || ethers.constants.Zero) : ethers.constants.Zero)}</h4>
																	<p className="rewards-token">{formatBigNumber(bentRewards ? BigNumber.from(bentRewards[TOKENS[key].ADDR.toLowerCase()] || ethers.constants.Zero) : ethers.constants.Zero)} {key}</p>
																</div>
															</div>
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