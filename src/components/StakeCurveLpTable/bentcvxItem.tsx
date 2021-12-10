import React, { useState } from "react";
import {
	Row, Col, Card, CardTitle, UncontrolledCollapse, CardText,
	Nav, NavLink, NavItem, TabPane, TabContent, Button, Label, Input,
} from "reactstrap";
import classnames from "classnames";
import styled from "styled-components";
import {
	formatBigNumber,
	getCrvDepositLink,
	getEtherscanLink,
	formatMillionsBigNumber,
} from "utils";
import { BigNumber, ethers, utils } from 'ethers';
import {
	useActiveWeb3React,
	useBalance,
	useBentCvxMasterChefContract,
	useCrvApr,
	useCrvDeposit,
	usePoolAllowance,
	useCrvPoolDepositedUsd,
	useCrvPoolEarnedUsd,
	useCrvTvl,
	useGasPrice,
	useERC20Contract,
} from "hooks";
import { BentPool, POOLS, TOKENS } from "constant";
import { DecimalSpan } from "components/DecimalSpan";

interface Props {
	poolInfo: BentPool
	poolKey: string
	visible: boolean
}

export const StakeBentCvxCurveLpItem = (props: Props): React.ReactElement => {
	const [collapsed, setCollapsed] = useState<boolean>(true);
	const [isApproved, setIsApproved] = useState<boolean>(false);
	const [currentActiveTab, setCurrentActiveTab] = useState('1');
	const [stakeAmount, setStakeAmount] = useState('');
	const [withdrawAmount, setWithdrawAmount] = useState('');
	const { library } = useActiveWeb3React();
	const crvLpToken = useERC20Contract(props.poolInfo.DepositAsset);
	const bentPool = useBentCvxMasterChefContract();
	const gasPrice = useGasPrice();
	const lpBalance = useBalance(props.poolInfo.DepositAsset);
	const depositedLp = useCrvDeposit(props.poolKey);
	const symbol = props.poolInfo.CrvLpSYMBOL;
	const allowance = usePoolAllowance(props.poolKey);
	const tvl = useCrvTvl(props.poolKey);
	const apr = useCrvApr(props.poolKey);
	const earnedUsd = useCrvPoolEarnedUsd(props.poolKey);
	const stakedUsd = useCrvPoolDepositedUsd(props.poolKey);

	const toggle = tab => {
		if (currentActiveTab !== tab) setCurrentActiveTab(tab);
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

	const onStakeMax = () => {
		setStakeAmount(formatBigNumber(lpBalance, 18, 18).replaceAll(',', ''));
		setIsApproved(allowance.gte(lpBalance) && !lpBalance.isZero());
	}

	const onWithdrawMax = () => {
		setWithdrawAmount(formatBigNumber(depositedLp, 18, 18).replaceAll(',', ''));
	}

	const approve = async () => {
		if (!library) return;
		const signer = await library.getSigner();
		const gas = await crvLpToken.connect(signer).estimateGas.approve(props.poolInfo.POOL, ethers.constants.MaxUint256);
		const tx = await crvLpToken.connect(signer).approve(props.poolInfo.POOL, ethers.constants.MaxUint256, {
			gasPrice,
			gasLimit: gas
		});
		const res = await tx.wait();
		if (res) {
			setIsApproved(true);
		}
	}

	const stake = async () => {
		if (!library) return;
		const signer = await library.getSigner();
		const gas = await bentPool.connect(signer).estimateGas.deposit(0, utils.parseUnits(stakeAmount, 18))
		const tx = await bentPool.connect(signer).deposit(0, utils.parseUnits(stakeAmount, 18), {
			gasPrice,
			gasLimit: gas
		})
		const res = await tx.wait();
		if (res) {
			setStakeAmount('')
			setIsApproved(false);
		}
	}

	const withdraw = async () => {
		if (!library) return;
		const signer = await library.getSigner();
		const gas = await bentPool.connect(signer).estimateGas.withdraw(0, utils.parseUnits(withdrawAmount, 18))
		const tx = await bentPool.connect(signer).withdraw(0, utils.parseUnits(withdrawAmount, 18), {
			gasPrice,
			gasLimit: gas
		})
		const res = await tx.wait();
		if (res) {
			setWithdrawAmount('')
		}
	}

	return (
		<div className={`innerWrap p-0 rounded ${collapsed ? '' : 'open'} ${props.visible ? '' : 'd-none'}`} >
			<Wrapper
				onClick={() => setCollapsed(!collapsed)}
				className={`bentInner ${collapsed ? '' : 'open'}`}
				color="primary"
				id={`toggleInner-stake-curve-lp-${props.poolInfo.Name}`}
				style={{ marginBottom: "1rem" }}
			>
				<Row className="align-items-center" style={{ padding: '0 10px' }}>
					<Col>
						<div className="imgText">
							<PoolLogo src={props.poolInfo.LOGO} alt="" />
							<h4>{props.poolInfo.Name}</h4>
						</div>
					</Col>
					<Col>
						<b>
							<span className="small">$</span>
							<DecimalSpan value={formatBigNumber(earnedUsd, 18, 2)} />
						</b>
					</Col>
					<Col>
						<b>
							{apr ? <>
								<DecimalSpan value={apr.toString()} />
								<span className="small"> %</span>
							</> : 'TBC'}
						</b>
					</Col>
					<Col>
						<b>
							<span className="small">$</span>
							<DecimalSpan value={formatBigNumber(stakedUsd, 18, 2)} />
						</b><br />
						<span className="small text-muted">
							{formatBigNumber(BigNumber.from(depositedLp), 18, 2)}
							<span className="text-bold"> {symbol}</span>
						</span>
					</Col>
					<Col>
						<div className="tvlText">
							<b>
								<span className="small">$</span>
								<DecimalSpan value={formatMillionsBigNumber(tvl, 18, 2)} />
							</b>
							<i className="fa fa-caret-down" aria-hidden="true" />
						</div>
					</Col>
				</Row>
			</Wrapper>
			<InnerWrapper
				className="innerAccordian"
				toggler={`#toggleInner-stake-curve-lp-${props.poolInfo.Name}`}
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
												<OutterLink href={getCrvDepositLink(props.poolInfo.Name)} target="_blank">
													Curve {props.poolInfo.Name} pool
												</OutterLink>
												&nbsp;(without staking in the Curve gauge),
												and then stake  your {symbol} tokens here to earn Bent on top of Convex's native rewards.
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
														<Label>Available:{formatBigNumber(lpBalance)}</Label>
													</p>
													<div className="amountinput">
														<Input
															type="number" placeholder="0"
															onChange={(e) => onStakeAmountChange(e.target.value)}
															value={stakeAmount}
														/>
														<img src={props.poolInfo.LOGO} alt="input-logo" className="inputlogo" />
														<Button className="maxbtn" onClick={onStakeMax} >Max</Button>
													</div>
													<div className="btnouter">
														<p className="lineup"></p>
														<div className="btnwrapper">
															<Button
																className="approvebtn"
																disabled={
																	lpBalance.isZero() || isApproved ||
																	parseFloat(stakeAmount) === 0 || isNaN(parseFloat(stakeAmount)) ||
																	utils.parseUnits(stakeAmount, 18).gt(lpBalance)
																}
																onClick={approve}
															>Approve</Button>
															<Button
																className="approvebtn"
																disabled={
																	lpBalance.isZero() || !isApproved ||
																	parseFloat(stakeAmount) === 0 || isNaN(parseFloat(stakeAmount)) ||
																	utils.parseUnits(stakeAmount, 18).gt(lpBalance)
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
														<img src={props.poolInfo.LOGO} alt="input-logo" className="inputlogo" />
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
										<Card body>
											<div className="infoWrap card-text mt-4">
												<p>
													BENT token address:&nbsp;
													<a href={getEtherscanLink(TOKENS.BENT.ADDR)} target="_blank" rel="noreferrer">
														{TOKENS.BENT.ADDR}
													</a>
												</p>
												<p>
													Deposit contract address:&nbsp;
													<a href={getEtherscanLink(POOLS.BentPools[props.poolKey].POOL)} target="_blank" rel="noreferrer">
														{POOLS.BentPools[props.poolKey].POOL}
													</a>
												</p>
												<p>
													Rewards contract address:&nbsp;
													<a href={getEtherscanLink(POOLS.BentPools[props.poolKey].POOL)} target="_blank" rel="noreferrer">
														{POOLS.BentPools[props.poolKey].POOL}
													</a>
												</p>
											</div>
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
	width: 28px;
`

const Wrapper = styled.div`
	cursor: pointer;
`;

const InnerWrapper = styled(UncontrolledCollapse)`
	border: unset;
`;

const OutterLink = styled.a`
	color: #703FFF;
	&:hover {
		color: #703FFF;
	}
	text-decoration: unset;
`;