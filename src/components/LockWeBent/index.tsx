import React, { useState } from "react";
import {
	Container, Button, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink,
	Card, CardText, Input, Label, CardBody, Spinner
} from "reactstrap";
import classnames from "classnames";
import { POOLS, TOKENS, TOKEN_LOGO } from "constant";
import { formatBigNumber, formatMillionsBigNumber, getEtherscanLink } from "utils";
import {
	useActiveWeb3React,
	useBalance,
	useERC20Contract,
	useWeBentAllowance,
	useWeBentBalance,
	useWeBentBentBalance,
	useWeBentContract,
	useWeBentTvl,
	useWeBentLocked,
	useWeBentRatio,
	useWeBentEarnedUsd,
	useWeBentAvgApr,
	useWeBentDepositsUsd,
} from "hooks";
import { ethers, utils } from "ethers";
import { DecimalSpan } from "components/DecimalSpan";
import { WeBentAprTooltip } from "components/Tooltip";

export const LockWeBent = (): React.ReactElement => {
	const [activeTab, setActiveTab] = useState("1");
	const [lockAmount, setLockAmount] = useState('');
	const [isApproved, setIsApproved] = useState<boolean>(false);
	const [isLockPending, setLockPending] = useState<boolean>(false);
	const [isApprovePending, setApprovePending] = useState<boolean>(false);
	const bentBalance = useBalance(TOKENS['BENT'].ADDR);
	const allowance = useWeBentAllowance();
	const bentTotalStaked = useWeBentBentBalance();
	const tvl = useWeBentTvl();
	const weBentShare = useWeBentBalance();
	const weBentBent = useWeBentLocked();
	const weBentRatio = useWeBentRatio();
	const depositUsd = useWeBentDepositsUsd();
	const earnedUsd = useWeBentEarnedUsd();
	const avgApr = useWeBentAvgApr();

	const { library } = useActiveWeb3React();
	const bentToken = useERC20Contract(TOKENS['BENT'].ADDR);
	const weBentContract = useWeBentContract();

	const toggle = (tab) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	const onLockMax = () => {
		setLockAmount(formatBigNumber(bentBalance, 18, 18).replaceAll(',', ''));
		setIsApproved(allowance.gte(bentBalance) && !bentBalance.isZero());
	}

	const onLockAmountChange = (value) => {
		setLockAmount(value);
		if (isNaN(parseFloat(value))) return;
		const amountBN = utils.parseUnits(value, 18);
		setIsApproved(allowance.gte(amountBN) && !amountBN.isZero());
	}

	const approve = async () => {
		if (!library) return;
		const signer = await library.getSigner();
		const tx = await bentToken.connect(signer).approve(POOLS.weBENT.Addr, ethers.constants.MaxUint256);
		setApprovePending(true);
		await tx.wait();
		setApprovePending(false);
		if (tx) {
			setIsApproved(true);
		}
	}

	const onLock = async () => {
		if (!library) return;
		const signer = await library.getSigner();
		const tx = await weBentContract.connect(signer).deposit(utils.parseUnits(lockAmount, 18));
		setLockPending(true);
		await tx.wait();
		setLockPending(false);
		if (tx) {
			setLockAmount('')
			setIsApproved(false);
		}
	}

	return (
		<Container className="stake-bent">
			<Row>
				<Col md="12">
					<div className="convert-up">
						<h2 className="white section-header">
							Lock BENT to weBENT
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
											{avgApr ? <>{utils.commify(avgApr.toFixed(2))}</> : 'TBD'} %&nbsp;
											<i className="fa fa-info-circle cursor-pointer" id="webent-apr-info" aria-hidden="true" />
											<WeBentAprTooltip />
										</b>
									</div>
								</Col>
								<Col style={{ flex: '1.3 0' }}>
									<div>
										<span className="small p-0">
											{formatBigNumber(weBentShare, 18, 2)} weBENT = {formatBigNumber(weBentBent, 18, 2)} BENT
										</span><br />
										<b className="p-0">
											<span className="small">$</span>
											<DecimalSpan value={formatBigNumber(depositUsd, 18, 2)} />
											<i className="fa fa-caret-down opacity-0" aria-hidden="true" />
										</b>
									</div>
								</Col>
								<Col style={{ flex: '0.7 0' }}>
									<div className="text-right p-0">
										<span className="small p-0">TVL ({formatBigNumber(bentTotalStaked, 18, 2)} BENT)</span><br />
										<b className="p-0">
											<span className="small">$</span>
											{formatMillionsBigNumber(tvl, 18, 2)}
											<i className="fa fa-caret-down invisible w-0" aria-hidden="true" />
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
													>Lock</NavLink>
												</NavItem>
												<NavItem>
													<NavLink
														className={classnames({ active: activeTab === "2" })}
														onClick={() => toggle("2")}
													>Info</NavLink>
												</NavItem>
											</Nav>
											<TabContent activeTab={activeTab}>
												<TabPane tabId="1">
													<Row>
														<Col sm="12" className="inverse">
															<Card body>
																<CardText className="mt-0">
																	Lock <b>BENT</b> for 8 weeks to receive a share in the <b>weBENT</b> pool.<br />
																	Your claim on the <b>BENT</b> in the pool automatically increases from platform fees, which over time increases the <b>BENT</b> to <b>weBENT</b> ratio.<br /><br />
																	<b>weBENT</b> also has voting rights for proposals and gauge weight voting using Bents vlCVX.
																</CardText>
															</Card>
														</Col>
													</Row>
													<Row className="mt-5">
														<Col sm="6" className="">
															<Card body>
																<div className="card-text">
																	<div className="amount-crv">
																		<p className="labeltext">
																			<Label>
																				Amount of BENT to lock. 1 weBENT = {weBentRatio} BENT
																			</Label>
																			<Label>Available: {formatBigNumber(bentBalance)}</Label>
																		</p>
																		<div className="amountinput">
																			<Input
																				type="number" placeholder="0"
																				onChange={(e) => onLockAmountChange(e.target.value)}
																				value={lockAmount}
																			/>
																			<img src={TOKEN_LOGO.BENT} alt="input-logo" className="inputlogo" />
																			<Button className="maxbtn" onClick={onLockMax} >Max</Button>
																		</div>
																	</div>
																</div>
															</Card>
														</Col>
														<Col sm="6" className="">
															<Card body>
																<div className="mt-2">
																	<p className="lineup"></p>
																	<div className="btnwrapper">
																		<Button
																			className="approvebtn"
																			disabled={
																				bentBalance.isZero() || isApproved ||
																				parseFloat(lockAmount) === 0 || isNaN(parseFloat(lockAmount)) ||
																				utils.parseUnits(lockAmount, 18).gt(bentBalance) ||
																				isApprovePending
																			}
																			onClick={approve}
																		>
																			Approve&nbsp;
																			{isApprovePending && <Spinner size="sm" />}
																		</Button>
																		<Button
																			className="approvebtn mx-2"
																			disabled={
																				bentBalance.isZero() || !isApproved ||
																				parseFloat(lockAmount) === 0 || isNaN(parseFloat(lockAmount)) ||
																				utils.parseUnits(lockAmount, 18).gt(bentBalance) ||
																				isLockPending
																			}
																			onClick={onLock}
																		>
																			Lock BENT&nbsp;
																			{isLockPending && <Spinner size="sm" />}
																		</Button>
																	</div>
																	<div className="btnwrapper"></div>
																</div>
															</Card>
														</Col>
													</Row>
												</TabPane>
												<TabPane tabId="2">
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
																				<b>weBENT</b> address:
																			</CardText>
																		</Col>
																		<Col md="9">
																			<a href={getEtherscanLink(POOLS.weBENT.Addr)} target="_blank" rel="noreferrer">
																				{POOLS.weBENT.Addr}
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