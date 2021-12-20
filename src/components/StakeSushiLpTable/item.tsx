import React, { useState } from "react"
import styled from "styled-components";
import {
	Row, Col, Card, CardTitle, UncontrolledCollapse, CardText,
	Nav, NavLink, NavItem, TabPane, TabContent, Button, Label, Input,
} from "reactstrap";
import { BigNumber, ethers, utils } from 'ethers';
import { POOLS, SushiPool, TOKENS } from "constant"
import classnames from "classnames";
import {
	useActiveWeb3React,
	useBalance,
	useBentMasterChefContract,
	useERC20Contract,
	usePoolAllowance,
	useSushiApr,
	useSushiLpDeposited,
	useSushiPoolDepositedUsd,
	useSushiPoolEarnedUsd,
	useSushiPoolRewards,
	useSushiTvl,
} from "hooks";
import {
	formatBigNumber,
	formatMillionsBigNumber,
	getEtherscanLink,
} from "utils";
import { DecimalSpan } from "components/DecimalSpan";


interface Props {
	poolInfo: SushiPool
	poolKey: string
}

export const StakeSushiLpItem = (props: Props): React.ReactElement => {
	const symbol = props.poolInfo.Name + ' SLP';
	const [collapsed, setCollapsed] = useState<boolean>(true);
	const [isApproved, setIsApproved] = useState<boolean>(false);
	const [currentActiveTab, setCurrentActiveTab] = useState('1');
	const [stakeAmount, setStakeAmount] = useState('');
	const [withdrawAmount, setWithdrawAmount] = useState('');

	const { library } = useActiveWeb3React();
	const sushiLpToken = useERC20Contract(props.poolInfo.DepositAsset);
	const masterChef = useBentMasterChefContract();
	const lpBalance = useBalance(props.poolInfo.DepositAsset);
	const allowance = usePoolAllowance(props.poolKey);
	const depositedLp = useSushiLpDeposited(props.poolKey);
	const tvl = useSushiTvl(props.poolKey);
	const apr = useSushiApr(props.poolKey);
	const earned = useSushiPoolEarnedUsd(props.poolKey);
	const rewards = useSushiPoolRewards(props.poolKey);
	const stakedUsd = useSushiPoolDepositedUsd(props.poolKey);

	const toggle = tab => {
		if (currentActiveTab !== tab) setCurrentActiveTab(tab);
	}

	const onStakeAmountChange = (value) => {
		setStakeAmount(value);
		if (isNaN(parseFloat(value))) return;
		const amountBN = utils.parseUnits(value, 18);
		setIsApproved(BigNumber.from(allowance).gte(amountBN) && !amountBN.isZero());
	}

	const onWithdrawAmountChange = (value) => {
		setWithdrawAmount(value);
	}

	const onStakeMax = () => {
		const lpBalance_display = BigNumber.from(lpBalance);
		setStakeAmount(formatBigNumber(lpBalance_display, 18, 18).replaceAll(',', ''));
		setIsApproved(BigNumber.from(allowance).gte(lpBalance_display) && !lpBalance_display.isZero());
	}

	const onWithdrawMax = () => {
		setWithdrawAmount(formatBigNumber(BigNumber.from(depositedLp), 18, 18).replaceAll(',', ''));
	}

	const approve = async () => {
		if (!library) return;
		const signer = await library.getSigner();
		const gasLimit = await sushiLpToken.connect(signer).estimateGas.approve(POOLS.SushiPools.MasterChef, ethers.constants.MaxUint256);
		const tx = await sushiLpToken.connect(signer).approve(POOLS.SushiPools.MasterChef, ethers.constants.MaxUint256, { gasLimit });
		const res = await tx.wait();
		if (res) {
			setIsApproved(true);
		}
	}

	const stake = async () => {
		if (!library) return;
		const signer = await library.getSigner();
		const gasLimit = await masterChef.connect(signer).estimateGas.deposit(props.poolInfo.PoolId, utils.parseUnits(stakeAmount, 18));
		const tx = await masterChef.connect(signer).deposit(props.poolInfo.PoolId, utils.parseUnits(stakeAmount, 18), { gasLimit });
		const res = await tx.wait();
		if (res) {
			setStakeAmount('')
			setIsApproved(false);
		}
	}

	const withdraw = async () => {
		if (!library) return;
		const signer = await library.getSigner();
		const gasLimit = await masterChef.connect(signer).estimateGas.withdraw(props.poolInfo.PoolId, utils.parseUnits(withdrawAmount, 18));
		const tx = await masterChef.connect(signer).withdraw(props.poolInfo.PoolId, utils.parseUnits(withdrawAmount, 18), { gasLimit });
		const res = await tx.wait();
		if (res) {
			setWithdrawAmount('')
		}
	}

	return (
		<div className={`innerWrap p-0 rounded ${collapsed ? '' : 'open'}`}>
			<Wrapper
				onClick={() => setCollapsed(!collapsed)}
				className={`bentInner ${collapsed ? '' : 'open'}`}
				color="primary"
				id={`toggleInner-stake-sushi-lp-${props.poolKey}`}
				style={{ marginBottom: "1rem" }}
			>
				<Row className="align-items-center" style={{ padding: '0 10px' }}>
					<Col>
						<div className="imgText">
							<PoolLogo src={props.poolInfo.LOGO[0]} alt="" />
							<PoolLogo src={props.poolInfo.LOGO[1]} alt="" style={{ marginLeft: -20 }} />
							<h4>{props.poolInfo.Name}</h4>
						</div>
					</Col>
					<Col>
						<b>
							<span className="small">$</span>
							<DecimalSpan value={formatBigNumber(earned, 18, 2)} />
						</b><br />
						<span className="small text-muted">
							{rewards.isZero() ? '--' : formatBigNumber(rewards, 18, 2)} BENT
						</span>
					</Col>
					<Col>
						<b>
							{apr ? <>{utils.commify(apr)}%</> : 'TBC'}
						</b>
					</Col>
					<Col>
						<b>
							<span className="small">$</span>
							<DecimalSpan value={formatBigNumber(stakedUsd, 18, 2)} />
						</b><br />
						<span className="small text-muted">
							{depositedLp.isZero() ? '--' : formatBigNumber(depositedLp, 18, 2)} {symbol}
						</span>
					</Col>
					<Col>
						<div className="tvlText">
							<b>
								<span className="small">$</span>
								{formatMillionsBigNumber(tvl, 18, 0)}
							</b>
							<i className="fa fa-caret-down" aria-hidden="true" />
						</div>
					</Col>
				</Row>
			</Wrapper>
			<InnerWrapper
				className="innerAccordian"
				toggler={`#toggleInner-stake-sushi-lp-${props.poolKey}`}
			>
				<div className="splitter-horizontal p-1">
					<div className="converttabs" style={{ background: 'unset', borderRadius: 0 }}>
						<Nav tabs>
							<NavItem>
								<NavLink
									className={classnames({ active: currentActiveTab === "1" })}
									onClick={() => toggle("1")}
								>Deposit</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									className={classnames({ active: currentActiveTab === "2" })}
									onClick={() => toggle("2")}
								>Withdraw</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									className={classnames({ active: currentActiveTab === "3" })}
									onClick={() => toggle("3")}
								>Info</NavLink>
							</NavItem>
						</Nav>
						<TabContent activeTab={currentActiveTab}>
							<TabPane tabId="1">
								<Row>
									<Col md="6" className="inverse">
										<Card body>
											<CardText>
												Deposit liquidity into the &nbsp;
												<OutterLink href={props.poolInfo.DepositLink} target="_blank">
													SushiSwap {props.poolInfo.Name} pool
												</OutterLink>
												&nbsp;
												and then stake your SushiSwap {props.poolInfo.Name} LP tokens here
												to earn BENT on top of SushiSwap trading fees.
											</CardText>
										</Card>
									</Col>
									<Col md="6" className="divider-left">
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
											<div className="card-text mt-4">
												<div className="amount-crv">
													<p className="labeltext">
														<Label>
															Amount of {symbol} to stake
														</Label>
														<Label>Available:{formatBigNumber(BigNumber.from(lpBalance))}</Label>
													</p>
													<div className="amountinput">
														<Input
															type="number" placeholder="0"
															onChange={(e) => onStakeAmountChange(e.target.value)}
															value={stakeAmount}
														/>
														<img src={props.poolInfo.LOGO[0]} alt="input-logo" className="inputlogo" />
														<img src={props.poolInfo.LOGO[1]} alt="input-logo" className="inputlogo-second" />
														<Button className="maxbtn" onClick={onStakeMax} >Max</Button>
													</div>
													<div className="btnouter">
														<p className="lineup"></p>
														<div className="btnwrapper">
															<Button
																className="approvebtn"
																disabled={
																	BigNumber.from(lpBalance).isZero() || isApproved ||
																	parseFloat(stakeAmount) === 0 || isNaN(parseFloat(stakeAmount)) ||
																	utils.parseUnits(stakeAmount, 18).gt(BigNumber.from(lpBalance))
																}
																onClick={approve}
															>Approve</Button>
															<Button
																className="approvebtn"
																disabled={
																	BigNumber.from(lpBalance).isZero() || !isApproved ||
																	parseFloat(stakeAmount) === 0 || isNaN(parseFloat(stakeAmount)) ||
																	utils.parseUnits(stakeAmount, 18).gt(BigNumber.from(lpBalance))
																}
																onClick={stake}
															>Stake</Button>
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
															Amount of {symbol} to withdraw
														</Label>
														<Label>Deposited:{formatBigNumber(BigNumber.from(depositedLp))}</Label>
													</p>
													<div className="amountinput">
														<Input
															type="number" placeholder="0"
															onChange={(e) => onWithdrawAmountChange(e.target.value)}
															value={withdrawAmount}
														/>
														<img src={props.poolInfo.LOGO[0]} alt="input-logo" className="inputlogo" />
														<img src={props.poolInfo.LOGO[1]} alt="input-logo" className="inputlogo-second" />
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
															BigNumber.from(depositedLp).isZero() ||
															parseFloat(withdrawAmount) === 0 || isNaN(parseFloat(withdrawAmount)) ||
															utils.parseUnits(withdrawAmount, 18).gt(BigNumber.from(depositedLp))
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
										<Card body className="infoWrap">
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
														Deposit contract address:
													</CardText>
												</Col>
												<Col md="9">
													<a href={getEtherscanLink(POOLS.SushiPools.MasterChef)} target="_blank" rel="noreferrer">
														{POOLS.SushiPools.MasterChef}
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
													<a href={getEtherscanLink(POOLS.SushiPools.MasterChef)} target="_blank" rel="noreferrer">
														{POOLS.SushiPools.MasterChef}
													</a>
												</Col>
											</Row>
										</Card>
									</Col>
								</Row>
							</TabPane>
						</TabContent>
					</div>
				</div>
			</InnerWrapper>
		</div>
	)
}

const PoolLogo = styled.img`
	margin-right: 10px;
	width: 28px;
`

const Wrapper = styled.div`
	cursor: pointer;
`;

const InnerWrapper = styled(UncontrolledCollapse)`
	background: #CAB8FF;
	border: unset;
`;

const OutterLink = styled.a`
	color: #703FFF;
	&:hover {
		color: #703FFF;
	}
	text-decoration: unset;
`;