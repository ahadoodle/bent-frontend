import React, { useState } from "react";
import {
	Container, Button, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink,
	Card, CardTitle, CardText, Input, Label, CardBody,
} from "reactstrap";
import classnames from "classnames";
import { TOKENS, TOKEN_LOGO } from "constant";
import { formatBigNumber } from "utils";
import {
	useActiveWeb3React,
	useBalance,
	useBentCvxAllowance,
	useBentCVXContract,
	useBentStaked,
	useBentStakingContract,
	useERC20Contract,
	useGasPrice
} from "hooks";
import { ethers, utils } from "ethers";

export const StakeBentCVX = (): React.ReactElement => {
	const [activeTab, setActiveTab] = useState("1");
	const [stakeAmount, setStakeAmount] = useState('');
	const [withdrawAmount, setWithdrawAmount] = useState('');
	const [isApproved, setIsApproved] = useState<boolean>(false);
	const cvxBalance = useBalance(TOKENS['CVX'].ADDR);
	const allowance = useBentCvxAllowance();
	const bentStaked = useBentStaked();
	const { library } = useActiveWeb3React();
	const cvxToken = useERC20Contract(TOKENS['CVX'].ADDR);
	const bentCVX = useBentCVXContract();
	const bentStakingContract = useBentStakingContract();
	const gasPrice = useGasPrice();

	const toggle = (tab) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	const onStakeMax = () => {
		setStakeAmount(formatBigNumber(cvxBalance, 18, 18).replaceAll(',', ''));
		setIsApproved(allowance.gte(cvxBalance) && !cvxBalance.isZero());
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
		const gas = await cvxToken.connect(signer).estimateGas.approve(TOKENS['BENTCVX'].ADDR, ethers.constants.MaxUint256);
		const tx = await cvxToken.connect(signer).approve(TOKENS['BENTCVX'].ADDR, ethers.constants.MaxUint256, {
			gasPrice,
			gasLimit: gas
		});
		const res = await tx.wait();
		if (res) {
			setIsApproved(true);
		}
	}

	const convert = async () => {
		if (!library) return;
		const signer = await library.getSigner();
		const gas = await bentCVX.connect(signer).estimateGas.deposit(utils.parseUnits(stakeAmount, 18));
		const tx = await bentCVX.connect(signer).deposit(utils.parseUnits(stakeAmount, 18), {
			gasPrice,
			gasLimit: gas
		});
		const res = await tx.wait();
		if (res) {
			setStakeAmount('')
			setIsApproved(false);
		}
	}

	const withdraw = async () => {
		if (!library) return;
		const signer = await library.getSigner();
		const gas = await bentStakingContract.connect(signer).estimateGas.withdraw(utils.parseUnits(withdrawAmount, 18));
		const tx = await bentStakingContract.connect(signer).withdraw(utils.parseUnits(withdrawAmount, 18), {
			gasPrice,
			gasLimit: gas
		});
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
						<h2 className="white section-header">
							Convert CVX
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
								</Col>
								<Col>
								</Col>
								<Col>
								</Col>
								<Col>
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
														disabled={true}
													>Unstake</NavLink>
												</NavItem>
												<NavItem>
													<NavLink
														className={classnames({ active: activeTab === "3" })}
														onClick={() => toggle("3")}
														disabled={true}
													>Info</NavLink>
												</NavItem>
											</Nav>
											<TabContent activeTab={activeTab}>
												<TabPane tabId="1">
													<Row>
														<Col sm="6" className="inverse">
															<Card body>
																<CardText className="mt-0">
																	Convert CVX to bentCVX. By staking bentCVX, you're earning the usual rewards from
																	Convex(cvxCRV + any additional incentives) + 10% of the Bent Platform earnings + BENT tokens.<br /><br />
																	NB: Converting CVX to bentCVX is irreversible. You may stake and unstake bentCVX tokens,
																	but not convert them back to CVX.
																	Secondary markets may however exist to allow the exchange of bentCVX for CVX.
																</CardText>
																{/* <div className="bent-rewards-container">
																	<div className="imgText bent-rewards-item">
																		<div className="d-flex">
																			<img src={CvxLogo} alt="Icon" />
																			<span className="small mt-1 mx-2">Earnings</span>
																		</div>
																		<p className="apr px-0 mt-1">100% APR</p>
																	</div>
																	<div className="imgText bent-rewards-item">
																		<div className="d-flex">
																			<img src={BentLogo} alt="Icon" />
																			<span className="small mt-1 mx-2">Earnings</span>
																		</div>
																		<p className="apr px-0 mt-1">100% APR</p>
																	</div>
																	<div className="imgText bent-rewards-item">
																		<div className="d-flex">
																			<img src={TOKEN_LOGO['BENT']} alt="Icon" style={{ height: 25, border: '1px solid #323F52', borderRadius: '50%' }} />
																			<span className="small mt-1 mx-2">BENT</span>
																		</div>
																		<p className="apr px-0 mt-1">100% APR</p>
																	</div>
																</div> */}
															</Card>
														</Col>
														<Col sm="6" className="divider-left">
															<Card body>
																<div className="card-text">
																	<div className="amount-crv">
																		<p className="labeltext">
																			<Label>
																				Amount of CVX to convert and stake
																			</Label>
																			<Label>Available:{formatBigNumber(cvxBalance)}</Label>
																		</p>
																		<div className="amountinput">
																			<Input
																				type="number" placeholder="0"
																				onChange={(e) => onStakeAmountChange(e.target.value)}
																				value={stakeAmount}
																			/>
																			<img src={TOKEN_LOGO.CVX} alt="input-logo" className="inputlogo" />
																			<Button className="maxbtn" onClick={onStakeMax} >Max</Button>
																		</div>
																		<div className="btnouter">
																			<p className="lineup" style={{ width: 175, marginLeft: 75 }}></p>
																			<div className="btnwrapper">
																				<Button
																					className="approvebtn"
																					disabled={
																						cvxBalance.isZero() || isApproved ||
																						parseFloat(stakeAmount) === 0 || isNaN(parseFloat(stakeAmount)) ||
																						utils.parseUnits(stakeAmount, 18).gt(cvxBalance)
																					}
																					onClick={approve}
																				>Approve</Button>
																				<Button
																					className="approvebtn mx-3"
																					disabled={
																						cvxBalance.isZero() || !isApproved ||
																						parseFloat(stakeAmount) === 0 || isNaN(parseFloat(stakeAmount)) ||
																						utils.parseUnits(stakeAmount, 18).gt(cvxBalance)
																					}
																					onClick={convert}
																				>Convert</Button>
																				<Button
																					className="approvebtn"
																					disabled={true}
																					style={{ lineHeight: 0.8 }}
																				>Stake <br /><span style={{ fontSize: 10 }}>(Coming soon)</span></Button>
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
																				Amount of CVX to withdraw
																			</Label>
																			<Label>Deposited:{formatBigNumber(bentStaked)}</Label>
																		</p>
																		<div className="amountinput">
																			<Input
																				type="number" placeholder="0"
																				onChange={(e) => onWithdrawAmountChange(e.target.value)}
																				value={withdrawAmount}
																			/>
																			<img src={TOKENS['CVX'].LOGO} alt="input-logo" className="inputlogo" />
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
														<Col sm="6">
															<Card body>
																<CardTitle>Special Title Treatment</CardTitle>
																<CardText>
																	With supporting text below as a natural lead-in to
																	additional content.
																</CardText>
																<Button>Go somewhere</Button>
															</Card>
														</Col>
														<Col sm="6">
															<Card body>
																<CardTitle>Special Title Treatment</CardTitle>
																<CardText>
																	With supporting text below as a natural lead-in to
																	additional content.
																</CardText>
																<Button>Go somewhere</Button>
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