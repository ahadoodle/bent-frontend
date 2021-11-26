import React, { useState, useEffect } from "react"
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
	useBentMasterChefContract,
	useBlockNumber,
	useERC20Contract,
	useGasPrice,
	useTokenPrices
} from "hooks";
import {
	formatBigNumber,
	formatMillionsBigNumber,
	ERC20,
	BentMasterChef,
	getEtherscanLink,
	getMultiERC20Contract,
	getMultiBentMasterChef,
	MulticallProvider,
} from "utils";


interface Props {
	poolInfo: SushiPool
	poolKey: string
}

export const StakeSushiLpItem = (props: Props): React.ReactElement => {
	const [symbol, setSymbol] = useState<string>('');
	const [collapsed, setCollapsed] = useState<boolean>(true);
	const [isApproved, setIsApproved] = useState<boolean>(false);
	const [currentActiveTab, setCurrentActiveTab] = useState('1');
	const [stakeAmount, setStakeAmount] = useState('');
	const [withdrawAmount, setWithdrawAmount] = useState('');
	const [lpBalance, setLpBalance] = useState<BigNumber>(ethers.constants.Zero);
	const [allowance, setAllowance] = useState<BigNumber>(ethers.constants.Zero);
	const [depositedLp, setDepositedLp] = useState<BigNumber>(ethers.constants.Zero);
	const [stakedUsd, setStakedUsd] = useState<BigNumber>(ethers.constants.Zero);
	const [earned, setEarned] = useState<BigNumber>(ethers.constants.Zero);
	const [tvl, setTvl] = useState<BigNumber>(ethers.constants.Zero);
	const [apr, setApr] = useState(0);

	const { account } = useActiveWeb3React();
	const depositTokenContract = useERC20Contract(props.poolInfo.DepositAsset);
	const masterChef = useBentMasterChefContract(POOLS.SushiPools.MasterChef);
	const gasPrice = useGasPrice();
	const blockNumber = useBlockNumber();
	const tokenPrices = useTokenPrices();

	const toggle = tab => {
		if (currentActiveTab !== tab) setCurrentActiveTab(tab);
	}

	useEffect(() => {
		const accAddr = account || ethers.constants.AddressZero;
		const lpTokenContract = getMultiERC20Contract(props.poolInfo.DepositAsset);
		const bentMasterChefMC = getMultiBentMasterChef(POOLS.SushiPools.MasterChef);
		MulticallProvider.all([
			lpTokenContract.symbol(),
			lpTokenContract.balanceOf(accAddr),
			lpTokenContract.allowance(accAddr, POOLS.SushiPools.MasterChef),
			bentMasterChefMC.userInfo(props.poolInfo.PoolId, accAddr),
			lpTokenContract.balanceOf(POOLS.SushiPools.MasterChef),
			bentMasterChefMC.totalAllocPoint(),
			bentMasterChefMC.poolInfo(props.poolInfo.PoolId),
			bentMasterChefMC.rewardPerBlock(),
			bentMasterChefMC.pendingReward(props.poolInfo.PoolId, accAddr)
		]).then(([symbol, availableLp, allowance, userInfo, poolLpBalance, totalAllocPoint, poolInfo, rewardPerBlock, pendingRewards]) => {
			const lpPrice = tokenPrices[props.poolInfo.DepositAsset] || 0;
			setSymbol(symbol);
			setLpBalance(availableLp);
			setAllowance(allowance);
			setDepositedLp(userInfo.amount);
			setTvl(utils.parseEther(lpPrice.toString()).mul(poolLpBalance)
				.div(BigNumber.from(10).pow(18)));
			setStakedUsd(utils.parseEther(lpPrice.toString()).mul(userInfo.amount)
				.div(BigNumber.from(10).pow(18)));
			setApr((BigNumber.from(poolLpBalance).isZero() || BigNumber.from(totalAllocPoint).isZero() || !lpPrice) ? 0 :
				utils.parseEther(tokenPrices[TOKENS['BENT'].ADDR].toString())
					.mul(rewardPerBlock).mul(poolInfo.allocPoint).mul(6400).mul(365).mul(100)
					.div(utils.parseEther(lpPrice.toString())).div(poolLpBalance)
					.div(totalAllocPoint).toNumber());
			setEarned(utils.parseEther(tokenPrices[TOKENS['BENT'].ADDR].toString()).mul(pendingRewards)
				.div(BigNumber.from(10).pow(TOKENS['BENT'].DECIMALS)));
		})
	}, [account, blockNumber, props, tokenPrices])

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
		setWithdrawAmount(formatBigNumber(BigNumber.from(depositedLp), 18, 8).replaceAll(',', ''));
	}

	const approve = async () => {
		const res = await ERC20.approve(depositTokenContract, account, POOLS.SushiPools.MasterChef, gasPrice);
		if (res) {
			setIsApproved(true);
		}
	}

	const stake = async () => {
		const res = await BentMasterChef.stake(masterChef, account, props.poolInfo.PoolId, stakeAmount, gasPrice);
		if (res) {
			setStakeAmount('')
			setIsApproved(false);
		}
	}

	const withdraw = async () => {
		const res = await BentMasterChef.withdraw(masterChef, account, props.poolInfo.PoolId, withdrawAmount, gasPrice);
		if (res) {
			setWithdrawAmount('')
		}
	}

	return (
		<div className="innerWrap p-0 pt-1 pb-1">
			<Wrapper
				onClick={() => setCollapsed(!collapsed)}
				collapsed={collapsed}
				className="bentInner"
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
						<b><span className="small">$</span>{formatBigNumber(earned)}</b>
					</Col>
					<Col style={{ width: '15%' }}>
						<b>{utils.commify(apr)}%</b>
					</Col>
					<Col style={{ width: '25%' }}>
						<b>
							{formatBigNumber(BigNumber.from(depositedLp), 18, 2)}
							<span className="small text-bold"> {props.poolInfo.Name} {symbol}</span>
						</b>
						<span className="small text-muted"> ≈ ${
							formatBigNumber(BigNumber.from(stakedUsd), 18, 2)
						}</span>
					</Col>
					<Col>
						<div className="tvlText">
							<b><span className="small">$</span>{formatMillionsBigNumber(tvl, 18, 0)}</b>
							<i
								className="fa fa-caret-down"
								aria-hidden="true"
							></i>
						</div>
					</Col>
				</Row>
			</Wrapper>
			<InnerWrapper
				className="innerAccordian"
				toggler={`#toggleInner-stake-sushi-lp-${props.poolKey}`}
			>
				<div className="converttabs" style={{ background: 'unset', borderTop: '1px solid black', borderRadius: 0 }}>
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
												<a href={getEtherscanLink(POOLS.SushiPools.MasterChef)} target="_blank" rel="noreferrer">
													{POOLS.SushiPools.MasterChef}
												</a>
											</p>
											<p>
												Rewards contract address:&nbsp;
												<a href={getEtherscanLink(POOLS.SushiPools.MasterChef)} target="_blank" rel="noreferrer">
													{POOLS.SushiPools.MasterChef}
												</a>
											</p>
										</div>
									</Card>
								</Col>
							</Row>
						</TabPane>
					</TabContent>
				</div>
			</InnerWrapper>
		</div>
	)
}

const PoolLogo = styled.img`
	margin-right: 10px;
	width: 28px;
`

const Wrapper = styled.div<{ collapsed: boolean }>`
	cursor: pointer;
	background: ${props => props.collapsed ? 'transparent' : '#CAB8FF !important'};
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