import React, { useState } from "react";
import {
	Container, Button, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink,
	Card, CardTitle, CardText, Input, Label, CardBody
} from "reactstrap";
import classnames from "classnames";
import { POOLS, TOKENS, TOKEN_LOGO } from "constant";
import { formatBigNumber, formatMillionsBigNumber, getEtherscanLink } from "utils";
import {
	useActiveWeb3React,
	useBalance,
	useBentCvxAllowance,
	useBentCVXContract,
	useBentCvxStaked,
	useBentCvxStakedUSD,
	useBentCvxStakingAllowance,
	useBentCvxStakingContract,
	useBentCvxTotalStaked,
	useBentCvxTvl,
	useERC20Contract,
	useBentCvxAvgApr,
	useBentCvxTotalEarned,
	useTheme,
	useBentCvxPoolApr,
} from "hooks";
import { ethers, utils } from "ethers";
import { DecimalSpan } from "components/DecimalSpan";
import CvxLogo from 'assets/images/cvx-logo-color-black.svg';
import CvxLogoLight from 'assets/images/cvx-logo-color.svg';
import BentLogo from 'assets/images/logo-dark.svg';
import BentLogoLight from 'assets/images/logo-light.svg';
import { Theme } from "state/application/reducer";

export const StakeBentCVX = (): React.ReactElement => {
	const [activeTab, setActiveTab] = useState("1");
	const [convertAmount, setConvertAmount] = useState('');
	const [stakeAmount, setStakeAmount] = useState('');
	const [withdrawAmount, setWithdrawAmount] = useState('');
	const [isConvertApproved, setIsConvertApproved] = useState<boolean>(false);
	const [isStakeApproved, setIsStakeApproved] = useState<boolean>(false);
	const theme = useTheme();
	const cvxBalance = useBalance(TOKENS['CVX'].ADDR);
	const cvxAllowance = useBentCvxAllowance();
	const bentCvxBalance = useBalance(TOKENS['BENTCVX'].ADDR);
	const bentCvxAllowance = useBentCvxStakingAllowance();
	const bentCvxStaked = useBentCvxStaked();
	const bentCvxStakedUsd = useBentCvxStakedUSD();
	const bentCvxTotalStaked = useBentCvxTotalStaked();
	const avgApr = useBentCvxAvgApr();
	const earnedUsd = useBentCvxTotalEarned();
	const tvl = useBentCvxTvl();
	const cvxPoolApr = useBentCvxPoolApr('CVX');
	const bentPoolApr = useBentCvxPoolApr('BENT');
	const mcPoolApr = useBentCvxPoolApr('MC');
	const { library } = useActiveWeb3React();
	const cvxToken = useERC20Contract(TOKENS['CVX'].ADDR);
	const bentCVX = useBentCVXContract();
	const bentCvxStaking = useBentCvxStakingContract();

	const toggle = (tab) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	const onConvertMax = () => {
		setConvertAmount(formatBigNumber(cvxBalance, 18, 18).replaceAll(',', ''));
		setIsConvertApproved(cvxAllowance.gte(cvxBalance) && !cvxBalance.isZero());
	}

	const onStakeMax = () => {
		setStakeAmount(formatBigNumber(bentCvxBalance, 18, 18).replaceAll(',', ''));
		setIsStakeApproved(bentCvxAllowance.gte(bentCvxBalance) && !bentCvxBalance.isZero());
	}

	const onWithdrawMax = () => {
		setWithdrawAmount(formatBigNumber(bentCvxStaked, 18, 18).replaceAll(',', ''));
	}

	const onConvertAmountChange = (value) => {
		setConvertAmount(value);
		if (isNaN(parseFloat(value))) return;
		const amountBN = utils.parseUnits(value, 18);
		setIsConvertApproved(cvxAllowance.gte(amountBN) && !amountBN.isZero());
	}

	const onStakeAmountChange = (value) => {
		setStakeAmount(value);
		if (isNaN(parseFloat(value))) return;
		const amountBN = utils.parseUnits(value, 18);
		setIsStakeApproved(bentCvxAllowance.gte(amountBN) && !amountBN.isZero());
	}

	const onWithdrawAmountChange = (value) => {
		setWithdrawAmount(value);
	}

	const onCvxApprove = async () => {
		if (!library) return;
		const signer = await library.getSigner();
		const tx = await cvxToken.connect(signer).approve(TOKENS['BENTCVX'].ADDR, ethers.constants.MaxUint256);
		const res = await tx.wait();
		if (res) {
			setIsConvertApproved(true);
		}
	}

	const onConvert = async () => {
		if (!library) return;
		const signer = await library.getSigner();
		const tx = await bentCVX.connect(signer).deposit(utils.parseUnits(convertAmount, 18));
		const res = await tx.wait();
		if (res) {
			setConvertAmount('')
			setIsConvertApproved(false);
		}
	}

	const onBentCvxApprove = async () => {
		if (!library) return;
		const signer = await library.getSigner();
		const tx = await bentCVX.connect(signer).approve(POOLS.BentCvxStaking.BentCvxStaking, ethers.constants.MaxUint256);
		const res = await tx.wait();
		if (res) {
			setIsStakeApproved(true);
		}
	}

	const onStake = async () => {
		if (!library) return;
		const signer = await library.getSigner();
		const tx = await bentCvxStaking.connect(signer).deposit(utils.parseUnits(stakeAmount, 18));
		const res = await tx.wait();
		if (res) {
			setStakeAmount('')
			setIsStakeApproved(false);
		}
	}

	const onWithdraw = async () => {
		if (!library) return;
		const signer = await library.getSigner();
		const tx = await bentCvxStaking.connect(signer).withdraw(utils.parseUnits(withdrawAmount, 18));
		const res = await tx.wait();
		if (res) {
			setWithdrawAmount('')
		}
	}

	const onOpen = () => {
		// $('html,body').animate({
		// 	scrollTop: $('#toggleInner-stake-curve-lp-bentcvx').offset()?.top
		// }, 'fast', function () {
		// 	$('#toggleInner-stake-curve-lp-bentcvx').trigger('collapse');
		// });
		window.open('https://curve.fi/factory/76/deposit', '_blank');
	}

	return (
		<Container className="stake-bent bentCVX">
			<Row>
				<Col md="12">
					<div className="convert-up">
						<h2 className="section-header">
							Convert CVX and Stake bentCVX
						</h2>
						<div className="toggleWrap tokentable table">
							<Row className="align-items-center thead p-0 pt-2 pb-2">
								<Col>
									<div className="imgText">
										<img src={TOKEN_LOGO.CVX} alt="" width="28" />
										<h2>CVX</h2>
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
												{avgApr ? <>{utils.commify(avgApr)}%</> : 'TBC'}
											</b>
										</div>
									</div>
								</Col>
								<Col>
									<div className="tableTitle">
										<p>My Staked ({bentCvxStaked.isZero() ? '--' : formatBigNumber(bentCvxStaked, 18, 2)} bentCVX)</p>
										<div className="boldText">
											<b>
												<span className="small">$</span>
												<DecimalSpan value={formatBigNumber(bentCvxStakedUsd, 18, 2)} />
											</b>
										</div>
									</div>
								</Col>
								<Col>
									<div className="tableTitle">
										<p>TVL ({formatBigNumber(bentCvxTotalStaked, 18, 2)} bentCVX)</p>
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
													>Convert</NavLink>
												</NavItem>
												<NavItem>
													<NavLink
														className={classnames({ active: activeTab === "2" })}
														onClick={() => toggle("2")}
													>Stake</NavLink>
												</NavItem>
												<NavItem>
													<NavLink
														className={classnames({ active: activeTab === "3" })}
														onClick={() => toggle("3")}
													>Unstake</NavLink>
												</NavItem>
												<NavItem>
													<NavLink
														className={classnames({ active: activeTab === "4" })}
														onClick={() => toggle("4")}
													>Info</NavLink>
												</NavItem>
											</Nav>
											<TabContent activeTab={activeTab}>
												<TabPane tabId="1">
													<Row>
														<Col sm="6" className="inverse">
															<Card body>
																<CardText className="mt-0">
																	Convert CVX to bentCVX. By staking bentCVX, you're earning the usual rewards from Convex
																	(cvxcrv + any additional incentives) + 58.8% of  Bent Platform earnings + BENT tokens.<br /><br />
																	Note: Converting CVX to bentCVX is irreversible. You may stake and unstake bentCVX tokens,
																	but not convert them back to CVX.
																	Secondary markets may exist to allow the exchange of bentCVX for CVX.
																</CardText>
																<div className="bent-rewards-container">
																	<div className="imgText bent-rewards-item">
																		<div className="d-flex">
																			<img src={theme === Theme.Dark ? CvxLogoLight : CvxLogo} alt="Icon" />
																			<span className="small mt-1 mx-2">Earnings</span>
																		</div>
																		<p className="apr px-0 mt-1">{cvxPoolApr}% APR</p>
																	</div>
																	<div className="imgText bent-rewards-item">
																		<div className="d-flex">
																			<img src={theme === Theme.Dark ? BentLogoLight : BentLogo} alt="Icon" />
																			<span className="small mt-1 mx-2">Earnings</span>
																		</div>
																		<p className="apr px-0 mt-1">{bentPoolApr}% APR</p>
																	</div>
																	<div className="imgText bent-rewards-item">
																		<div className="d-flex">
																			<img src={TOKEN_LOGO['BENT']} alt="Icon" style={{ height: 25, border: '1px solid #323F52', borderRadius: '50%' }} />
																			<span className="small mt-1 mx-2">BENT</span>
																		</div>
																		<p className="apr px-0 mt-1">{mcPoolApr}% APR</p>
																	</div>
																</div>
															</Card>
														</Col>
														<Col sm="6" className="divider-left">
															<Card body>
																<div className="card-text">
																	<div className="amount-crv">
																		<p className="labeltext">
																			<Label>
																				Amount of CVX to convert
																			</Label>
																			<Label>Available: {formatBigNumber(cvxBalance)}</Label>
																		</p>
																		<div className="amountinput">
																			<Input
																				type="number" placeholder="0"
																				onChange={(e) => onConvertAmountChange(e.target.value)}
																				value={convertAmount}
																			/>
																			<img src={TOKEN_LOGO.CVX} alt="input-logo" className="inputlogo" />
																			<Button className="maxbtn" onClick={onConvertMax} >Max</Button>
																		</div>
																		<div className="btnouter">
																			<p className="lineup"></p>
																			<div className="btnwrapper">
																				<Button
																					className="approvebtn"
																					disabled={
																						cvxBalance.isZero() || isConvertApproved ||
																						parseFloat(convertAmount) === 0 || isNaN(parseFloat(convertAmount)) ||
																						utils.parseUnits(convertAmount, 18).gt(cvxBalance)
																					}
																					onClick={onCvxApprove}
																				>Approve</Button>
																				<Button
																					className="approvebtn"
																					disabled={
																						cvxBalance.isZero() || !isConvertApproved ||
																						parseFloat(convertAmount) === 0 || isNaN(parseFloat(convertAmount)) ||
																						utils.parseUnits(convertAmount, 18).gt(cvxBalance)
																					}
																					onClick={onConvert}
																				>Convert</Button>
																			</div>
																			<div className="btnwrapper">
																				<Button
																					className="approvebtn w-100 mt-3"
																					onClick={onOpen}
																				>bentCVX/CVX Curve LP</Button>
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
														<Col sm="6" className="inverse">
															<Card body>
																<CardText className="mt-0">
																	Convert CVX to bentCVX. By staking bentCVX, you're earning the usual rewards from Convex
																	(cvxcrv + any additional incentives) + 58.8% of  Bent Platform earnings + BENT tokens.<br /><br />
																	Note: Converting CVX to bentCVX is irreversible. You may stake and unstake bentCVX tokens,
																	but not convert them back to CVX.
																	Secondary markets may exist to allow the exchange of bentCVX for CVX.
																</CardText>
																<div className="bent-rewards-container">
																	<div className="imgText bent-rewards-item">
																		<div className="d-flex">
																			<img src={theme === Theme.Dark ? CvxLogoLight : CvxLogo} alt="Icon" />
																			<span className="small mt-1 mx-2">Earnings</span>
																		</div>
																		<p className="apr px-0 mt-1">{cvxPoolApr}% APR</p>
																	</div>
																	<div className="imgText bent-rewards-item">
																		<div className="d-flex">
																			<img src={theme === Theme.Dark ? BentLogoLight : BentLogo} alt="Icon" />
																			<span className="small mt-1 mx-2">Earnings</span>
																		</div>
																		<p className="apr px-0 mt-1">{bentPoolApr}% APR</p>
																	</div>
																	<div className="imgText bent-rewards-item">
																		<div className="d-flex">
																			<img src={TOKEN_LOGO['BENT']} alt="Icon" style={{ height: 25, border: '1px solid #323F52', borderRadius: '50%' }} />
																			<span className="small mt-1 mx-2">BENT</span>
																		</div>
																		<p className="apr px-0 mt-1">{mcPoolApr}% APR</p>
																	</div>
																</div>
															</Card>
														</Col>
														<Col sm="6" className="divider-left">
															<Card body>
																<div className="card-text">
																	<div className="amount-crv">
																		<p className="labeltext">
																			<Label>
																				Amount of bentCvx to stake
																			</Label>
																			<Label>Available: {formatBigNumber(bentCvxBalance)}</Label>
																		</p>
																		<div className="amountinput">
																			<Input
																				type="number" placeholder="0"
																				onChange={(e) => onStakeAmountChange(e.target.value)}
																				value={stakeAmount}
																			/>
																			<img src={TOKEN_LOGO.BENTCVX} alt="input-logo" className="inputlogo" />
																			<Button className="maxbtn" onClick={onStakeMax} >Max</Button>
																		</div>
																		<div className="btnouter">
																			<p className="lineup"></p>
																			<div className="btnwrapper">
																				<Button
																					className="approvebtn"
																					disabled={
																						bentCvxBalance.isZero() || isStakeApproved ||
																						parseFloat(stakeAmount) === 0 || isNaN(parseFloat(stakeAmount)) ||
																						utils.parseUnits(stakeAmount, 18).gt(bentCvxBalance)
																					}
																					onClick={onBentCvxApprove}
																				>Approve</Button>
																				<Button
																					className="approvebtn"
																					disabled={
																						bentCvxBalance.isZero() || !isStakeApproved ||
																						parseFloat(stakeAmount) === 0 || isNaN(parseFloat(stakeAmount)) ||
																						utils.parseUnits(stakeAmount, 18).gt(bentCvxBalance)
																					}
																					onClick={onStake}
																				>Stake</Button>
																			</div>
																		</div>
																	</div>
																</div>
															</Card>
														</Col>
													</Row>
												</TabPane>
												<TabPane tabId="3">
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
																				Amount of bentCvx to withdraw
																			</Label>
																			<Label>Deposited:{formatBigNumber(bentCvxStaked)}</Label>
																		</p>
																		<div className="amountinput">
																			<Input
																				type="number" placeholder="0"
																				onChange={(e) => onWithdrawAmountChange(e.target.value)}
																				value={withdrawAmount}
																			/>
																			<img src={TOKENS['BENTCVX'].LOGO} alt="input-logo" className="inputlogo" />
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
																				bentCvxStaked.isZero() ||
																				parseFloat(withdrawAmount) === 0 || isNaN(parseFloat(withdrawAmount)) ||
																				utils.parseUnits(withdrawAmount, 18).gt(bentCvxStaked)
																			}
																			onClick={onWithdraw}
																		>Withdraw</Button>
																	</div>
																</div>
															</Card>
														</Col>
													</Row>
												</TabPane>
												<TabPane tabId="4">
													<Row>
														<Col sm="12">
															<Card body>
																<div className="infoWrap">
																	<Row>
																		<Col md="3">
																			<CardText className="mt-0">
																				<b>CVX</b> token address:
																			</CardText>
																		</Col>
																		<Col md="9">
																			<a href={getEtherscanLink(TOKENS.CVX.ADDR)} target="_blank" rel="noreferrer">
																				{TOKENS.CVX.ADDR}
																			</a>
																		</Col>
																	</Row>
																	<Row>
																		<Col md="3">
																			<CardText className="mt-0">
																				<b>bentCVX</b> token address:
																			</CardText>
																		</Col>
																		<Col md="9">
																			<a href={getEtherscanLink(TOKENS.BENTCVX.ADDR)} target="_blank" rel="noreferrer">
																				{TOKENS.BENTCVX.ADDR}
																			</a>
																		</Col>
																	</Row>
																	<Row>
																		<Col md="3">
																			<CardText className="mt-0">
																				Deposit contract address:
																			</CardText>
																		</Col>
																		<Col md="9">
																			<a href={getEtherscanLink(POOLS.BentCvxStaking.BentCvxStaking)} target="_blank" rel="noreferrer">
																				{POOLS.BentCvxStaking.BentCvxStaking}
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
																			<a href={getEtherscanLink(POOLS.BentCvxStaking.BentCvxStaking)} target="_blank" rel="noreferrer">
																				{POOLS.BentCvxStaking.BentCvxStaking}
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