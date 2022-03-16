import React, { useState } from "react"
import styled from "styled-components";
import {
	Row, Col, Card, UncontrolledCollapse, CardText,
	Nav, NavLink, NavItem, TabPane, TabContent, Button, Label, Input, Spinner,
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
	const [isApprPending, setApprPending] = useState<boolean>(false);
	const [isStakePending, setStakePending] = useState<boolean>(false);
	const [isUnstakePending, setUnstakePending] = useState<boolean>(false);
	const [isClaimPending, setClaimPending] = useState<boolean>(false);
	const [currentActiveTab, setCurrentActiveTab] = useState('1');
	const [stakeAmount, setStakeAmount] = useState('');
	const [withdrawAmount, setWithdrawAmount] = useState('');

	const { library, account } = useActiveWeb3React();
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

	const onApprove = async () => {
		if (!library) return;
		const signer = await library.getSigner();
		const tx = await sushiLpToken.connect(signer).approve(POOLS.SushiPools.MasterChef, ethers.constants.MaxUint256);
		setApprPending(true);
		const res = await tx.wait();
		setApprPending(false);
		if (res) {
			setIsApproved(true);
		}
	}

	const onStake = async () => {
		if (!library) return;
		const signer = await library.getSigner();
		const tx = await masterChef.connect(signer).deposit(props.poolInfo.PoolId, utils.parseUnits(stakeAmount, 18));
		setStakePending(true);
		const res = await tx.wait();
		setStakePending(false);
		if (res) {
			setStakeAmount('')
			setIsApproved(false);
		}
	}

	const onWithdraw = async () => {
		if (!library) return;
		const signer = await library.getSigner();
		const tx = await masterChef.connect(signer).withdraw(props.poolInfo.PoolId, utils.parseUnits(withdrawAmount, 18));
		setUnstakePending(true);
		const res = await tx.wait();
		setUnstakePending(false);
		if (res) {
			setWithdrawAmount('')
		}
	}

	const onClaim = async () => {
		if (!library) return;
		const signer = await library.getSigner();
		const tx = await masterChef.connect(signer).claim(props.poolInfo.PoolId, account);
		setClaimPending(true);
		await tx.wait();
		setClaimPending(false);
	}

	const haveRewards = () => {
		return !rewards.isZero();
	}

	const TxSpinner = () => {
		return (
			<React.Fragment>
				&nbsp;
				<Spinner size="sm" />
			</React.Fragment>
		)
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
							{apr ? <>{utils.commify(apr.toFixed(2))}%</> : 'TBC'}
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
												<a href={props.poolInfo.DepositLink} target="_blank" className="contract-address" rel="noreferrer">
													SushiSwap {props.poolInfo.Name} pool
												</a>
												&nbsp;and then stake your SushiSwap {props.poolInfo.Name} LP tokens here
												to earn BENT on top of SushiSwap trading fees.
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
																	utils.parseUnits(stakeAmount, 18).gt(BigNumber.from(lpBalance)) ||
																	isApprPending
																}
																onClick={onApprove}
															>Approve{isApprPending && <TxSpinner />}</Button>
															<Button
																className="approvebtn"
																disabled={
																	BigNumber.from(lpBalance).isZero() || !isApproved ||
																	parseFloat(stakeAmount) === 0 || isNaN(parseFloat(stakeAmount)) ||
																	utils.parseUnits(stakeAmount, 18).gt(BigNumber.from(lpBalance)) ||
																	isStakePending
																}
																onClick={onStake}
															>Stake{isStakePending && <TxSpinner />}</Button>
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
														{formatBigNumber(BigNumber.from(rewards), TOKENS[tokenKey].DECIMALS, 2)}
														<span className="small text-bold"> {tokenKey}</span>
													</b>
													<span className="small text-muted"> ≈ ${formatBigNumber(earned, 18, 2)}</span>
												</Col>
												<Col></Col>
											</Row>
										)}
									</Col>
									<Col md="6">
										<Button
											className="approvebtn"
											onClick={onClaim}
											disabled={!haveRewards() || isClaimPending}
										>Claim{isClaimPending && <TxSpinner />}</Button>
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
															utils.parseUnits(withdrawAmount, 18).gt(BigNumber.from(depositedLp)) ||
															isUnstakePending
														}
														onClick={onWithdraw}
													>Withdraw{isUnstakePending && <TxSpinner />}</Button>
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
	border: unset;
`;