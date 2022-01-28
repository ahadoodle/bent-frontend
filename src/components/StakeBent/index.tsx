import React, { useState } from "react";
import {
	Container, Button, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink,
	Card, CardText, Input, Label, CardBody,
} from "reactstrap";
import classnames from "classnames";
import { POOLS, TOKENS, TOKEN_LOGO } from "constant";
import { formatBigNumber, formatMillionsBigNumber, getEtherscanLink } from "utils";
import {
	useActiveWeb3React,
	useBalance,
	useBentAvgApr,
	useBentEarnedUsd,
	useBentRewardsAprs,
	useBentStaked,
	useBentStakedUsd,
	useBentStakingContract,
	useBentTotalStaked,
	useBentTvl,
} from "hooks";
import { utils } from "ethers";
import { DecimalSpan } from "components/DecimalSpan";
import { StakeBentRewardItem } from "./rewardsItem";
import { SwitchSlider } from "components/Switch";

export const StakeBent = (): React.ReactElement => {
	const [activeTab, setActiveTab] = useState("1");
	const [stakeAmount, setStakeAmount] = useState('');
	const [withdrawAmount, setWithdrawAmount] = useState('');
	const bentBalance = useBalance(TOKENS['BENT'].ADDR);
	const tvl = useBentTvl();
	const bentStaked = useBentStaked();
	const bentstakedUsd = useBentStakedUsd();
	const bentAvgApr = useBentAvgApr();
	const rewardAprs = useBentRewardsAprs();
	const earnedUsd = useBentEarnedUsd();
	const bentTotalStaked = useBentTotalStaked();

	const { library } = useActiveWeb3React();
	const bentStakingContract = useBentStakingContract();

	const toggle = (tab) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	const onStakeMax = () => {
		setStakeAmount(formatBigNumber(bentBalance, 18, 18).replaceAll(',', ''));
	}

	const onWithdrawMax = () => {
		setWithdrawAmount(formatBigNumber(bentStaked, 18, 18).replaceAll(',', ''));
	}

	const onStakeAmountChange = (value) => {
		setStakeAmount(value);
	}

	const onWithdrawAmountChange = (value) => {
		setWithdrawAmount(value);
	}

	const withdraw = async () => {
		if (!library) return;
		const signer = await library.getSigner();
		const res = await bentStakingContract.connect(signer).withdraw(utils.parseUnits(withdrawAmount, 18));
		if (res) {
			setWithdrawAmount('')
		}
	}

	const onVote = () => {
		window.open('https://vote.bentfinance.com/#/', '_blank');
	}

	return (
		<Container className={`stake-bent ${bentStaked.isZero() ? 'd-none' : ''}`}>
			<Row>
				<Col md="12">
					<div className="convert-up">
						<h2 className="section-header">
							Stake your BENT (closed pool)
						</h2>
						<div className="toggleWrap tokentable table">
							<Row className="align-items-center thead">
								<Col className="px-0">
									<div className="imgText">
										<img src={TOKEN_LOGO.BENT} alt="" width="28" />
										<h2>BENT</h2>
									</div>
								</Col>
								<Col>
									<div>
										<span className="small p-0">Earned (USD)</span><br />
										<b className="p-0">
											<span className="small">$</span>
											<DecimalSpan value={formatBigNumber(earnedUsd, 18, 2)} />
											<i className="fa fa-caret-down opacity-0" aria-hidden="true" />
										</b>
									</div>
								</Col>
								<Col>
									<div>
										<span className="small p-0">APR</span><br />
										<b className="p-0">
											{bentAvgApr ? <>{utils.commify(bentAvgApr)}%</> : 'TBC'}
											<i className="fa fa-caret-down opacity-0" aria-hidden="true" />
										</b>
									</div>
								</Col>
								<Col>
									<div>
										<span className="small p-0">My Staked ({bentStaked.isZero() ? '--' : formatBigNumber(bentStaked, 18, 2)} BENT)</span><br />
										<b className="p-0">
											<span className="small">$</span>
											<DecimalSpan value={formatBigNumber(bentstakedUsd, 18, 2)} />
											<i className="fa fa-caret-down opacity-0" aria-hidden="true" />
										</b>
									</div>
								</Col>
								<Col>
									<div>
										<span className="small p-0">TVL ({formatBigNumber(bentTotalStaked, 18, 2)} BENT)</span><br />
										<b className="p-0">
											<span className="small">$</span>
											{formatMillionsBigNumber(tvl, 18, 2)}
											<i className="fa fa-caret-down opacity-0" aria-hidden="true" />
										</b>
									</div>
								</Col>
							</Row>
							<Card>
								<CardBody>
									<div className="innerAccordian">
										<div className="converttabs">
											<Nav tabs>
												<NavItem>
													<NavLink
														className={classnames({ active: activeTab === "1" })}
														onClick={() => toggle("1")}
													>Stake</NavLink>
												</NavItem>
												<NavItem>
													<NavLink
														className={classnames({ active: activeTab === "2" })}
														onClick={() => toggle("2")}
													>Unstake</NavLink>
												</NavItem>
												<NavItem>
													<NavLink
														className={classnames({ active: activeTab === "3" })}
														onClick={() => toggle("3")}
													>Info</NavLink>
												</NavItem>
											</Nav>
											<TabContent activeTab={activeTab}>
												<TabPane tabId="1">
													<Row>
														<Col sm="6" className="inverse">
															<Card body>
																<CardText className="mt-0">
																	This pool has migrated to <b>weBENT</b>, please withdraw and re-stake.
																</CardText>
																<div className="bent-rewards-container mb-4">
																	{POOLS.BentStaking.RewardAssets.map(key =>
																		<StakeBentRewardItem
																			key={key}
																			logo={TOKENS[key].LOGO}
																			title={key}
																			apr={rewardAprs[TOKENS[key].ADDR.toLowerCase()] || 0}
																		/>
																	)}
																</div>
															</Card>
														</Col>
														<Col sm="6" className="divider-left">
															<Card body>
																<div className="card-text">
																	<div className="amount-crv">
																		<p className="labeltext">
																			<Label>
																				Amount of BENT to stake
																			</Label>
																			<Label>Available: {formatBigNumber(bentBalance)}</Label>
																		</p>
																		<div className="amountinput">
																			<Input
																				type="number" placeholder="0"
																				onChange={(e) => onStakeAmountChange(e.target.value)}
																				value={stakeAmount}
																			/>
																			<img src={TOKEN_LOGO.BENT} alt="input-logo" className="inputlogo" />
																			<Button className="maxbtn" onClick={onStakeMax} >Max</Button>
																		</div>
																		<div className="btnouter">
																			<p className="lineup"></p>
																			<div className="btnwrapper">
																				<Button
																					className="approvebtn"
																					disabled={true}
																				>Approve</Button>
																				<Button
																					className="approvebtn"
																					disabled={true}
																				>Stake BENT</Button>
																			</div>
																			<div className="btnwrapper">
																				<Button
																					className="approvebtn w-100 mt-3"
																					onClick={onVote}
																				>Vote on Convex</Button>
																			</div>
																		</div>
																	</div>
																</div>
															</Card>
														</Col>
													</Row>
												</TabPane>
												<TabPane tabId="2">
													<Row>
														<Col md="12" className="inverse">
															<Card body>
																<SwitchSlider
																	label="Advanced"
																	onChange={() => {
																		// 
																	}}
																/>
																<div className="card-text mt-4 d-flex row">
																	<div className="amount-crv col-md-5">
																		<p className="labeltext">
																			<Label>
																				Amount of BENT to withdraw
																			</Label>
																			<Label>Deposited:{formatBigNumber(bentStaked)}</Label>
																		</p>
																		<div className="amountinput">
																			<Input
																				type="number" placeholder="0"
																				onChange={(e) => onWithdrawAmountChange(e.target.value)}
																				value={withdrawAmount}
																			/>
																			<img src={TOKENS['BENT'].LOGO} alt="input-logo" className="inputlogo" />
																			<Button className="maxbtn" onClick={onWithdrawMax} >Max</Button>
																		</div>
																	</div>
																	<div className="amount-crv col-md-5">
																		<p className="labeltext">
																			<Label>
																				&nbsp;
																			</Label>
																		</p>
																		<Button
																			className="approvebtn"
																			disabled={
																				bentStaked.isZero() ||
																				parseFloat(withdrawAmount) === 0 || isNaN(parseFloat(withdrawAmount)) ||
																				utils.parseUnits(withdrawAmount, 18).gt(bentStaked)
																			}
																			onClick={withdraw}
																		>Withdraw</Button>
																	</div>
																</div>
															</Card>
														</Col>
													</Row>
												</TabPane>
												<TabPane tabId="3">
													<Row>
														<Col sm="12">
															<Card body>
																<div className="infoWrap">
																	<Row>
																		<Col md="3">
																			<CardText className="mt-0">
																				<b>BENT</b> token address:
																			</CardText>
																		</Col>
																		<Col md="9">
																			<a href={getEtherscanLink(TOKENS.BENT.ADDR)} target="_blank" rel="noreferrer">
																				{TOKENS.BENT.ADDR}
																			</a>
																		</Col>
																	</Row>
																	<Row>
																		<Col md="3">
																			<CardText className="mt-0">
																				Rewards contract address:
																			</CardText>
																		</Col>
																		<Col md="9">
																			<a href={getEtherscanLink(POOLS.BentStaking.POOL)} target="_blank" rel="noreferrer">
																				{POOLS.BentStaking.POOL}
																			</a>
																		</Col>
																	</Row>
																</div>
															</Card>
														</Col>
													</Row>
												</TabPane>
											</TabContent>
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