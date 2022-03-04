import React, { useState } from "react";
import {
	Container, Button, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink,
	Card, CardText, Input, Label, CardBody
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
	useBentCvxRewarderCvxContract,
	useBentCvxRewarderBentContract,
	useBentCvxRewarderMCContract,
} from "hooks";
import { ethers, utils } from "ethers";
import { DecimalSpan } from "components/DecimalSpan";
import CvxLogo from 'assets/images/cvx-logo-color-black.svg';
import CvxLogoLight from 'assets/images/cvx-logo-color.svg';
import BentLogo from 'assets/images/logo-dark.svg';
import BentLogoLight from 'assets/images/logo-light.svg';
import { Theme } from "state/application/reducer";
import { SwitchSlider } from "components/Switch";
import Address from "components/Address";
import { AddToMetamask } from "components/AddToMetamask";
import { ClaimBentCvxRewarderCvx } from "./rewarderCvx";
import { ClaimBentCvxRewarderMasterChef } from "./rewarderMasterchef";
import styled from "styled-components";

export const StakeBentCVX = (): React.ReactElement => {
	const [activeTab, setActiveTab] = useState("1");
	const [convertAmount, setConvertAmount] = useState('');
	const [stakeAmount, setStakeAmount] = useState('');
	const [withdrawAmount, setWithdrawAmount] = useState('');
	const [isConvertApproved, setIsConvertApproved] = useState<boolean>(false);
	const [isStakeApproved, setIsStakeApproved] = useState<boolean>(false);
	const [claimChecked, setClaimChecked] = useState<Record<string, Record<string, boolean>>>({
		CVX: {}, BENT: {}, MC: {}
	});
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
	const bentCvxRewarderCVX = useBentCvxRewarderCvxContract();
	const bentCvxRewarderBent = useBentCvxRewarderBentContract();
	const bentCvxRewarderMC = useBentCvxRewarderMCContract();

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
		window.open('https://curve.fi/factory/76/deposit', '_blank');
	}

	const checkedIndexes = () => {
		const checkedIndexes: string[][] = [];
		Object.keys(claimChecked).forEach(key => {
			const indexes: string[] = [];
			Object.keys(claimChecked[key]).forEach(index => {
				if (claimChecked[key][index]) indexes.push(index);
			})
			checkedIndexes.push(indexes);
		})
		return checkedIndexes;
	}

	const onClaimCheckChange = (key: string, indexes: Record<number, boolean>) => {
		claimChecked[key] = indexes;
		setClaimChecked(Object.assign({}, claimChecked));
	}

	const onClaim = async () => {
		if (!library) return;
		const indexes = checkedIndexes();
		console.log(indexes);
		const signer = await library.getSigner();
		const address = await signer.getAddress();
		if (indexes[0].length === 0 && indexes[1].length === 0 && indexes[2].length === 0) {
			return;
		} else if (indexes[0].length > 0 && indexes[1].length === 0 && indexes[2].length === 0) {
			await bentCvxRewarderCVX.connect(signer).claim(address, indexes[0]);
		} else if (indexes[0].length === 0 && indexes[1].length > 0 && indexes[2].length === 0) {
			console.log(indexes[1])
			await bentCvxRewarderBent.connect(signer).claim(address, indexes[1]);
		} else if (indexes[0].length === 0 && indexes[1].length === 0 && indexes[2].length > 0) {
			await bentCvxRewarderMC.connect(signer).claim(address, [0]);
		} else {
			await bentCvxStaking.connect(signer).claim(indexes);
		}
	}

	const onClaimAll = async () => {
		if (!library) return;
		const signer = await library.getSigner();
		await bentCvxStaking.connect(signer).claim([
			POOLS.BentCvxStaking.BentCvxRewarderCvx.ClaimIndex,
			POOLS.BentCvxStaking.BentCvxRewarderBent.ClaimIndex,
			[0]
		]);
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
							<Row className="align-items-center thead">
								<Col className="px-0">
									<div className="imgText">
										<img src={TOKEN_LOGO.CVX} alt="" width="28" />
										<h2>CVX</h2>
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
											{avgApr ? <>{utils.commify(avgApr.toFixed(2))}%</> : 'TBC'}
											<i className="fa fa-caret-down opacity-0" aria-hidden="true" />
										</b>
									</div>
								</Col>
								<Col>
									<div>
										<span className="small p-0">My Staked ({bentCvxStaked.isZero() ? '--' : formatBigNumber(bentCvxStaked, 18, 2)} bentCVX)</span><br />
										<b className="p-0">
											<span className="small">$</span>
											<DecimalSpan value={formatBigNumber(bentCvxStakedUsd, 18, 2)} />
											<i className="fa fa-caret-down opacity-0" aria-hidden="true" />
										</b>
									</div>
								</Col>
								<Col>
									<div>
										<span className="small p-0">TVL ({formatBigNumber(bentCvxTotalStaked, 18, 2)} bentCVX)</span><br />
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
													>Claim</NavLink>
												</NavItem>
												<NavItem>
													<NavLink
														className={classnames({ active: activeTab === "4" })}
														onClick={() => toggle("4")}
													>Unstake</NavLink>
												</NavItem>
												<NavItem>
													<NavLink
														className={classnames({ active: activeTab === "5" })}
														onClick={() => toggle("5")}
													>Info</NavLink>
												</NavItem>
												{activeTab === '3' && <NavItem className="ml-auto">
													<ClaimButton
														onClick={onClaim}
														disabled={checkedIndexes().length === 0}
													>Claim</ClaimButton>
													<ClaimButton
														onClick={onClaimAll}
													>Claim All</ClaimButton>
												</NavItem>}
											</Nav>
											<TabContent activeTab={activeTab}>
												<TabPane tabId="1">
													<Row>
														<Col sm="6" className="inverse">
															<Card body>
																<CardText className="mt-0">
																	Convert CVX to bentCVX. By staking bentCVX, you're earning the usual rewards from Convex
																	(cvxcrv + any additional incentives) + Bent Platform earnings + BENT tokens.<br /><br />
																	Note: Converting CVX to bentCVX is irreversible. You may stake and unstake bentCVX tokens,
																	but not convert them back to CVX.
																	Secondary markets may exist to allow the exchange of bentCVX for CVX.
																</CardText>
																<Row className="bent-rewards-container mb-4" dir="flex-row">
																	<Col className="imgText bent-rewards-item">
																		<div className="d-flex">
																			<img src={theme === Theme.Dark ? CvxLogoLight : CvxLogo} alt="Icon" />
																			<span className="small mt-1 mx-2">Earnings</span>
																		</div>
																		<p className="apr px-0 mt-1">{cvxPoolApr}% APR</p>
																	</Col>
																	<Col className="imgText bent-rewards-item">
																		<div className="d-flex">
																			<img src={theme === Theme.Dark ? BentLogoLight : BentLogo} alt="Icon" />
																			<span className="small mt-1 mx-2">Earnings</span>
																		</div>
																		<p className="apr px-0 mt-1">{bentPoolApr}% APR</p>
																	</Col>
																	<Col className="imgText bent-rewards-item">
																		<div className="d-flex">
																			<img src={TOKEN_LOGO['BENT']} alt="Icon" style={{ height: 25, border: '1px solid #323F52', borderRadius: '50%' }} />
																			<span className="small mt-1 mx-2">BENT</span>
																		</div>
																		<p className="apr px-0 mt-1">{mcPoolApr}% APR</p>
																	</Col>
																</Row>
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
																	(cvxcrv + any additional incentives) + Bent Platform earnings + BENT tokens.<br /><br />
																	Note: Converting CVX to bentCVX is irreversible. You may stake and unstake bentCVX tokens,
																	but not convert them back to CVX.
																	Secondary markets may exist to allow the exchange of bentCVX for CVX.
																</CardText>
																<Row className="bent-rewards-container mb-4" dir="flex-row">
																	<Col className="imgText bent-rewards-item">
																		<div className="d-flex">
																			<img src={theme === Theme.Dark ? CvxLogoLight : CvxLogo} alt="Icon" />
																			<span className="small mt-1 mx-2">Earnings</span>
																		</div>
																		<p className="apr px-0 mt-1">{cvxPoolApr}% APR</p>
																	</Col>
																	<Col className="imgText bent-rewards-item">
																		<div className="d-flex">
																			<img src={theme === Theme.Dark ? BentLogoLight : BentLogo} alt="Icon" />
																			<span className="small mt-1 mx-2">Earnings</span>
																		</div>
																		<p className="apr px-0 mt-1">{bentPoolApr}% APR</p>
																	</Col>
																	<Col className="imgText bent-rewards-item">
																		<div className="d-flex">
																			<img src={TOKEN_LOGO['BENT']} alt="Icon" style={{ height: 25, border: '1px solid #323F52', borderRadius: '50%' }} />
																			<span className="small mt-1 mx-2">BENT</span>
																		</div>
																		<p className="apr px-0 mt-1">{mcPoolApr}% APR</p>
																	</Col>
																</Row>
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
														<ClaimBentCvxRewarderCvx
															poolKey="CVX"
															poolInfo={POOLS.BentCvxStaking.BentCvxRewarderCvx}
															onClaimCheckChange={onClaimCheckChange}
														/>
														<ClaimBentCvxRewarderCvx
															poolKey="BENT"
															poolInfo={POOLS.BentCvxStaking.BentCvxRewarderBent}
															onClaimCheckChange={onClaimCheckChange}
														/>
														<ClaimBentCvxRewarderMasterChef
															poolKey="MC"
															poolInfo={POOLS.BentCvxStaking.BentCvxRewarderMasterchef}
															onClaimCheckChange={onClaimCheckChange}
														/>
													</Row>
												</TabPane>
												<TabPane tabId="4">
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
																	<div className="amount-crv col-md-5">
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
												<TabPane tabId="5">
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
																		<Col md="9" className="d-flex">
																			<a href={getEtherscanLink(TOKENS.CVX.ADDR)} target="_blank" rel="noreferrer">
																				<Address address={TOKENS.CVX.ADDR} />
																			</a>
																			<AddToMetamask
																				address={TOKENS.CVX.ADDR}
																				symbol={TOKENS.CVX.SYMBOL}
																				img={TOKENS.CVX.EXT_LOGO}
																			/>
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
																				<Address address={TOKENS.BENTCVX.ADDR} />
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
																				<Address address={POOLS.BentCvxStaking.BentCvxStaking} />
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
																				<Address address={POOLS.BentCvxStaking.BentCvxStaking} />
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


const ClaimButton = styled(Button)`
	margin-left: 20px;
	height: 42px;
	width: 150px;
`