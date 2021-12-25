import React, { useState } from "react";
import {
	Container, Button, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink,
	Card, CardTitle, CardText, Input, Label, CardBody,
} from "reactstrap";
import classnames from "classnames";
import { POOLS, TOKENS, TOKEN_LOGO } from "constant";
import { formatBigNumber, formatMillionsBigNumber, getEtherscanLink } from "utils";
import {
	useActiveWeb3React,
	useBalance,
	useBentAllowance,
	useBentAvgApr,
	useBentEarnedUsd,
	useBentRewardsAprs,
	useBentStaked,
	useBentStakedUsd,
	useBentStakingContract,
	useBentTotalStaked,
	useBentTvl,
	useERC20Contract,
} from "hooks";
import { ethers, utils } from "ethers";
import { DecimalSpan } from "components/DecimalSpan";

export const StakeBent = (): React.ReactElement => {
	const [activeTab, setActiveTab] = useState("1");
	const [stakeAmount, setStakeAmount] = useState('');
	const [withdrawAmount, setWithdrawAmount] = useState('');
	const [isApproved, setIsApproved] = useState<boolean>(false);
	const bentBalance = useBalance(TOKENS['BENT'].ADDR);
	const tvl = useBentTvl();
	const allowance = useBentAllowance();
	const bentStaked = useBentStaked();
	const bentstakedUsd = useBentStakedUsd();
	const bentAvgApr = useBentAvgApr();
	const rewardAprs = useBentRewardsAprs();
	const earnedUsd = useBentEarnedUsd();
	const bentTotalStaked = useBentTotalStaked();

	const { library } = useActiveWeb3React();
	const bentToken = useERC20Contract(TOKENS['BENT'].ADDR);
	const bentStakingContract = useBentStakingContract();

	const toggle = (tab) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	const onStakeMax = () => {
		setStakeAmount(formatBigNumber(bentBalance, 18, 18).replaceAll(',', ''));
		setIsApproved(allowance.gte(bentBalance) && !bentBalance.isZero());
	}

	const onWithdrawMax = () => {
		setWithdrawAmount(formatBigNumber(bentStaked, 18, 18).replaceAll(',', ''));
	}

	const onStakeAmountChange = (value) => {
		setStakeAmount(value);
		if (isNaN(parseFloat(value))) return;
		const amountBN = utils.parseUnits(value, 18);
		setIsApproved(allowance.gte(amountBN) && !amountBN.isZero());
	}

	const onWithdrawAmountChange = (value) => {
		setWithdrawAmount(value);
	}

	const approve = async () => {
		if (!library) return;
		const signer = await library.getSigner();
		const gasLimit = await bentToken.connect(signer).estimateGas.approve(POOLS.BentStaking.POOL, ethers.constants.MaxUint256);
		const res = await bentToken.connect(signer).approve(POOLS.BentStaking.POOL, ethers.constants.MaxUint256, { gasLimit });
		if (res) {
			setIsApproved(true);
		}
	}

	const stake = async () => {
		if (!library) return;
		const signer = await library.getSigner();
		const gasLimit = await bentStakingContract.connect(signer).estimateGas.deposit(utils.parseUnits(stakeAmount, 18));
		const res = await bentStakingContract.connect(signer).deposit(utils.parseUnits(stakeAmount, 18), { gasLimit });
		if (res) {
			setStakeAmount('')
			setIsApproved(false);
		}
	}

	const withdraw = async () => {
		if (!library) return;
		const signer = await library.getSigner();
		const gasLimit = await bentStakingContract.connect(signer).estimateGas.withdraw(utils.parseUnits(withdrawAmount, 18));
		const res = await bentStakingContract.connect(signer).withdraw(utils.parseUnits(withdrawAmount, 18), { gasLimit });
		if (res) {
			setWithdrawAmount('')
		}
	}

	const onVote = () => {
		window.open('https://snapshot.org/#/bentfinance.eth', '_blank');
	}

	return (
		<Container className="stake-bent">
			<Row>
				<Col md="12">
					<div className="convert-up">
						<h2 className="white section-header">
							Stake your BENT
						</h2>
						<div className="toggleWrap tokentable table">
							<Row className="align-items-center thead p-0 pt-2 pb-2">
								<Col>
									<div className="imgText">
										<img src={TOKEN_LOGO.BENT} alt="" width="28" />
										<h2>BENT</h2>
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
												{bentAvgApr ? <>{utils.commify(bentAvgApr)}%</> : 'TBC'}
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
									<div className="tableTitle">
										<p>TVL ({formatBigNumber(bentTotalStaked, 18, 2)} BENT)</p>
										<div className="boldText">
											<b>
												<span className="small">$</span>
												{formatMillionsBigNumber(tvl, 18, 2)}
											</b>
										</div>
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
																	Stake your <b>BENT</b> to vote on Convex & earn a portion of the platforms earnings in:
																</CardText>
																<div className="bent-rewards-container">
																	{POOLS.BentStaking.RewardAssets.map(key =>
																		<div className="imgText bent-rewards-item" key={key}>
																			<img src={TOKENS[key].LOGO} alt="Icon" width="28" />
																			<div className="">
																				<h4 className="mb-0">{key}</h4>
																				<p className="apr">{rewardAprs[TOKENS[key].ADDR.toLowerCase()] || 0}% APR</p>
																			</div>
																		</div>
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
																			<Label>Available:{formatBigNumber(bentBalance)}</Label>
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
																					disabled={
																						bentBalance.isZero() || isApproved ||
																						parseFloat(stakeAmount) === 0 || isNaN(parseFloat(stakeAmount)) ||
																						utils.parseUnits(stakeAmount, 18).gt(bentBalance)
																					}
																					onClick={approve}
																				>Approve</Button>
																				<Button
																					className="approvebtn"
																					disabled={
																						bentBalance.isZero() || !isApproved ||
																						parseFloat(stakeAmount) === 0 || isNaN(parseFloat(stakeAmount)) ||
																						utils.parseUnits(stakeAmount, 18).gt(bentBalance)
																					}
																					onClick={stake}
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
																<CardTitle>
																	<div className="advance-btn">
																		<Label className="switch">
																			<Input type="checkbox" />
																			<span className="slider"></span>
																		</Label>
																		<span className="textadvance">Advanced</span>
																	</div>
																</CardTitle>
																<div className="card-text mt-4 d-flex">
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
																	<div className="amount-crv" style={{ marginLeft: 20 }}>
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