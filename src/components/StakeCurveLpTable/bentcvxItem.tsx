import React, { useEffect, useState } from "react";
import {
	Row, Col, Card, UncontrolledCollapse, CardText,
	Nav, NavLink, NavItem, TabPane, TabContent, Button, Label, Input, UncontrolledTooltip,
} from "reactstrap";
import classnames from "classnames";
import styled from "styled-components";
import {
	formatBigNumber,
	getEtherscanLink,
	formatMillionsBigNumber,
	increaseGasLimit,
	getTokenDecimals,
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
	useERC20Contract,
	useCrvProjectedApr,
	useCrvPoolRewards,
	useTokenPrices,
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
	const [showBreakdown, setShowBreakdown] = useState(false);
	const [usdRewards, setUsdRewards] = useState<BigNumber[]>([]);
	const [currentActiveTab, setCurrentActiveTab] = useState('1');
	const [stakeAmount, setStakeAmount] = useState('');
	const [withdrawAmount, setWithdrawAmount] = useState('');
	const tokenPrices = useTokenPrices();
	const { library } = useActiveWeb3React();
	const crvLpToken = useERC20Contract(props.poolInfo.DepositAsset);
	const bentPool = useBentCvxMasterChefContract();
	const lpBalance = useBalance(props.poolInfo.DepositAsset);
	const depositedLp = useCrvDeposit(props.poolKey);
	const symbol = props.poolInfo.CrvLpSYMBOL;
	const allowance = usePoolAllowance(props.poolKey);
	const tvl = useCrvTvl(props.poolKey);
	const apr = useCrvApr(props.poolKey);
	const earnedUsd = useCrvPoolEarnedUsd(props.poolKey);
	const stakedUsd = useCrvPoolDepositedUsd(props.poolKey);
	const rewards = useCrvPoolRewards(props.poolKey);
	const projectedApr = useCrvProjectedApr(props.poolKey);

	useEffect(() => {
		setUsdRewards(props.poolInfo.RewardsAssets.map((key, index) => {
			const addr = TOKENS[key].ADDR.toLowerCase();
			if (tokenPrices[addr] && rewards[index]) {
				return utils.parseUnits((tokenPrices[addr].toString()))
					.mul(rewards[index]).div(BigNumber.from(10).pow(getTokenDecimals(addr)));
			} else
				return ethers.constants.Zero;
		}));
	}, [props, tokenPrices, rewards])

	const toggle = tab => {
		if (currentActiveTab !== tab) setCurrentActiveTab(tab);
	}

	const haveRewards = () => {
		let enable = false;
		rewards.forEach(reward => enable = enable || reward.toString() !== '0');
		return enable;
	}

	const currentApr = () => {
		return apr + BigNumber.from(projectedApr.baseCrvvApr).toNumber() / 100
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

	const onApprove = async () => {
		if (!library) return;
		const signer = await library.getSigner();
		const gasLimit = await crvLpToken.connect(signer).estimateGas.approve(props.poolInfo.POOL, ethers.constants.MaxUint256);
		const tx = await crvLpToken.connect(signer).approve(props.poolInfo.POOL, ethers.constants.MaxUint256, { gasLimit: increaseGasLimit(gasLimit) });
		const res = await tx.wait();
		if (res) {
			setIsApproved(true);
		}
	}

	const onStake = async () => {
		if (!library) return;
		const signer = await library.getSigner();
		const gasLimit = await bentPool.connect(signer).estimateGas.deposit(0, utils.parseUnits(stakeAmount, 18))
		const tx = await bentPool.connect(signer).deposit(0, utils.parseUnits(stakeAmount, 18), { gasLimit: increaseGasLimit(gasLimit) })
		const res = await tx.wait();
		if (res) {
			setStakeAmount('')
			setIsApproved(false);
		}
	}

	const onWithdraw = async () => {
		if (!library) return;
		const signer = await library.getSigner();
		const gasLimit = await bentPool.connect(signer).estimateGas.withdraw(0, utils.parseUnits(withdrawAmount, 18))
		const tx = await bentPool.connect(signer).withdraw(0, utils.parseUnits(withdrawAmount, 18), { gasLimit: increaseGasLimit(gasLimit) })
		const res = await tx.wait();
		if (res) {
			setWithdrawAmount('')
		}
	}

	const onClaim = async () => {
		if (!library) return;
		const signer = await library.getSigner();
		const gasLimit = await bentPool.connect(signer).estimateGas.harvest();
		await bentPool.connect(signer).harvest({ gasLimit: increaseGasLimit(gasLimit) });
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
							{apr ?
								<>
									{utils.commify(currentApr().toFixed(2))}%&nbsp;
									<i className="fa fa-info-circle cursor-pointer" aria-hidden="true" id={`crv-${props.poolKey}-apr-breakdown`}
										onClick={(e) => {
											setShowBreakdown(!showBreakdown)
											e.stopPropagation();
										}} />
									<UncontrolledTooltip target={`crv-${props.poolKey}-apr-breakdown`} className="bent-details" placement="bottom">
										<div style={{ padding: 15, lineHeight: '18px' }}>
											<Row className="mb-3">
												<Col>
													<div className="text-underline">Current APR:</div>
													<div className="green-color">{utils.commify(currentApr().toFixed(2))}%</div>
												</Col>
											</Row>
											Current APR breakdown:<br />
											- Base Curve APR: {formatBigNumber(projectedApr.baseCrvvApr, 2, 2)}%<br />
											- BENT APR: {utils.commify(apr.toFixed(2))}%<br />
										</div>
									</UncontrolledTooltip>
								</> : 'TBC'}
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
								{formatMillionsBigNumber(tvl, 18, 2)}
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
								>Claim</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									className={classnames({ active: currentActiveTab === "3" })}
									onClick={() => toggle("3")}
								>Withdraw</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									className={classnames({ active: currentActiveTab === "4" })}
									onClick={() => toggle("4")}
								>Info</NavLink>
							</NavItem>
						</Nav>
						<TabContent activeTab={currentActiveTab}>
							<TabPane tabId="1">
								<Row>
									<Col md="6" className="inverse">
										<Card body>
											<CardText>
												Deposit liquidity into the&nbsp;
												<a href={props.poolInfo.crvPoolLink} target="_blank" className="contract-address" rel="noreferrer">
													Curve {props.poolInfo.Name} pool
												</a>
												&nbsp;(without staking in the Curve gauge),
												and then stake  your {symbol} tokens here to earn Bent.
											</CardText>
										</Card>
									</Col>
									<Col md="6" className="divider-left">
										<Card body>
											<div className="card-text">
												<div className="amount-crv">
													<p className="labeltext">
														<Label>
															Amount of {symbol} to stake
														</Label>
														<Label>Available: {formatBigNumber(lpBalance)}</Label>
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
																onClick={onApprove}
															>Approve</Button>
															<Button
																className="approvebtn"
																disabled={
																	lpBalance.isZero() || !isApproved ||
																	parseFloat(stakeAmount) === 0 || isNaN(parseFloat(stakeAmount)) ||
																	utils.parseUnits(stakeAmount, 18).gt(lpBalance)
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
							<TabPane tabId="2">
								<Row>
									<Col md="6" className="inverse">
										<Row className="align-items-center">
											<Col sm={12}>
												<CardText className="mt-0 mb-2">
													<span className="small">Breakdown of claimable earnings:</span>
												</CardText>
											</Col>
										</Row>
										{props.poolInfo.RewardsAssets.map((tokenKey, index) =>
											<Row className="align-items-center mb-1" key={tokenKey} >
												<Col>
													<div className="imgText">
														<img src={TOKENS[tokenKey].LOGO} alt="" width="28" />
														<h4 className="rewards-breakdown">{tokenKey}</h4>
													</div>
												</Col>
												<Col>
													<b>
														{formatBigNumber(BigNumber.from(rewards[index] || 0), TOKENS[tokenKey].DECIMALS)}
														<span className="small text-bold"> {tokenKey}</span>
													</b>
													<span className="small text-muted"> ≈ ${
														usdRewards[index] ? formatBigNumber(usdRewards[index]) : 0
													}</span>
												</Col>
												<Col></Col>
											</Row>
										)}
									</Col>
									<Col md="6">
										<Button
											className="approvebtn"
											onClick={onClaim}
											disabled={!haveRewards()}
										>Claim</Button>
									</Col>
								</Row>
							</TabPane>
							<TabPane tabId="3">
								<Row>
									<Col md="12" className="inverse">
										<Card body>
											<div className="card-text d-flex">
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
													<a href={getEtherscanLink(POOLS.BentPools[props.poolKey].POOL)} target="_blank" rel="noreferrer">
														{POOLS.BentPools[props.poolKey].POOL}
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
													<a href={getEtherscanLink(POOLS.BentPools[props.poolKey].POOL)} target="_blank" rel="noreferrer">
														{POOLS.BentPools[props.poolKey].POOL}
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
	width: 28px;
`

const Wrapper = styled.div`
	cursor: pointer;
`;

const InnerWrapper = styled(UncontrolledCollapse)`
	border: unset;
`;