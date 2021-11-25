import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
	Row, Col, Card, CardTitle, UncontrolledCollapse, CardText,
	Nav, NavLink, NavItem, TabPane, TabContent, Button, Label, Input,
} from "reactstrap";
import classnames from "classnames";
import styled from "styled-components";
import { formatBigNumber, ERC20, BentBasePool, getCrvDepositLink, CrvFiLp, getTokenDecimals } from "utils";
import { BigNumber, utils } from 'ethers';
import {
	useActiveWeb3React,
	useBentPoolContract,
	useBlockNumber,
	useCrvFiLp,
	useCvxBaseRewardPool,
	useGasPrice,
	useTokenPrices
} from "hooks";
import { BentPool, TOKENS } from "constant";

interface Props {
	poolInfo: BentPool
	poolKey: string
}

export const StakeCurveLpItem = (props: Props): React.ReactElement => {
	const [symbol, setSymbol] = useState<string>('');
	const [collapsed, setCollapsed] = useState<boolean>(true);
	const [isApproved, setIsApproved] = useState<boolean>(false);
	const [currentActiveTab, setCurrentActiveTab] = useState('1');
	const [lpBalance, setLpBalance] = useState(0);
	const [allowance, setAllowance] = useState(0);
	const [stakeAmount, setStakeAmount] = useState('');
	const [withdrawAmount, setWithdrawAmount] = useState('');
	const [deposit, setDeposit] = useState(0);
	const [tvl, setTvl] = useState(BigNumber.from(0));
	const { account } = useActiveWeb3React();
	const depositTokenContract = useCrvFiLp(props.poolInfo.DepositAsset);
	const crvMinter = useCrvFiLp(props.poolInfo.CrvMinter || '');
	const cvxRewardPool = useCvxBaseRewardPool(props.poolInfo.CvxRewardsAddr);
	const bentPool = useBentPoolContract(props.poolKey);
	const gasPrice = useGasPrice();
	const tokenPrices = useTokenPrices();
	const blockNumber = useBlockNumber();

	useEffect(() => {
		/* eslint-disable @typescript-eslint/no-explicit-any*/
		const contractCalls: any[] = [];
		contractCalls.push(ERC20.getSymbol(depositTokenContract));
		contractCalls.push(ERC20.getBalanceOf(depositTokenContract, account));
		contractCalls.push(ERC20.getAllowance(depositTokenContract, account, props.poolInfo.POOL));
		contractCalls.push(BentBasePool.getDepositedAmount(bentPool, account));
		contractCalls.push(ERC20.getBalanceOf(cvxRewardPool, props.poolInfo.POOL));
		Promise.all(contractCalls).then(([depositSymbol, availableLp, allowance, depositedLp, poolLpBalance]) => {
			setSymbol(depositSymbol);
			setLpBalance(availableLp);
			setAllowance(allowance);
			setDeposit(depositedLp);

			// Calculate Crv Lp Price
			const lpFiContract = props.poolInfo.CrvMinter ? crvMinter : depositTokenContract;
			const lpFiContractCalls: any[] = [];
			for (let i = 0; i < props.poolInfo.CrvCoinsLength; i++) {
				lpFiContractCalls.push(CrvFiLp.getCoins(lpFiContract, i));
				lpFiContractCalls.push(CrvFiLp.getBalances(lpFiContract, i));
			}
			lpFiContractCalls.push(CrvFiLp.getTotalSupply(depositTokenContract));
			Promise.all(lpFiContractCalls).then((results) => {
				const lpTotalSupply = results[results.length - 1];
				if (BigNumber.from(lpTotalSupply).isZero()) {
					return;
				}
				let totalUsd = BigNumber.from(0);
				for (let i = 0; i < props.poolInfo.CrvCoinsLength; i++) {
					const addr = results[i * 2];
					const bal = results[i * 2 + 1];
					if (tokenPrices[addr.toLowerCase()]) {
						totalUsd = utils.parseEther(tokenPrices[addr.toLowerCase()].toString())
							.mul(BigNumber.from(bal))
							.div(BigNumber.from(10).pow(getTokenDecimals(addr)))
							.add(totalUsd);
					}
				}
				setTvl(totalUsd.mul(poolLpBalance).div(lpTotalSupply));
			})
		})
	}, [depositTokenContract, account, blockNumber, bentPool, cvxRewardPool, crvMinter, tokenPrices, props])

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
		setWithdrawAmount(formatBigNumber(BigNumber.from(deposit), 18, 18).replaceAll(',', ''));
	}

	const approve = async () => {
		const res = await ERC20.approve(depositTokenContract, account, props.poolInfo.POOL, stakeAmount, gasPrice);
		if (res) {
			setIsApproved(true);
		}
	}

	const stake = async () => {
		const res = await BentBasePool.stake(bentPool, account, stakeAmount, gasPrice);
		if (res) {
			setStakeAmount('')
			setIsApproved(false);
		}
	}

	const withdraw = async () => {
		const res = await BentBasePool.withdraw(bentPool, account, withdrawAmount, gasPrice);
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
				id={`toggleInner-stake-curve-lp-${props.poolInfo.Name}`}
				style={{ marginBottom: "1rem" }}
			>
				<Row className="align-items-center">
					<Col>
						<div className="imgText">
							<PoolLogo src={props.poolInfo.LOGO} alt="" />
							<h4>{props.poolInfo.Name}</h4>
						</div>
					</Col>
					<Col>
						<span>$</span>0
					</Col>
					{/* <Col>
						<div className="earnValue">
							<b>
								6.56% <span>(proj.6.74%)</span>
							</b>
							<p>CRV boost: 1.7x</p>
							<i
								className="fa fa-info-circle"
								aria-hidden="true"
							></i>
						</div>
					</Col> */}
					<Col>
						<div className="depositText">{formatBigNumber(BigNumber.from(deposit))} {symbol}</div>
					</Col>
					<Col>
						<div className="tvlText">
							<b>$ {formatBigNumber(tvl, 18, 1)}</b>
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
				toggler={`#toggleInner-stake-curve-lp-${props.poolInfo.Name}`}
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
													<Label>Available:{formatBigNumber(BigNumber.from(lpBalance))}</Label>
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
													<Label>Deposited:{formatBigNumber(BigNumber.from(deposit))}</Label>
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
														BigNumber.from(deposit).isZero() ||
														parseFloat(withdrawAmount) === 0 || isNaN(parseFloat(withdrawAmount)) ||
														utils.parseUnits(withdrawAmount, 18).gt(BigNumber.from(deposit))
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
												BENT token address:{" "}
												<Link to="/stake">
													{TOKENS.BENT.ADDR}
												</Link>
											</p>
											<p>
												Deposit contract address:{" "}
												<Link to="/stake">
													{bentPool.options.address}
												</Link>
											</p>
											<p>
												Rewards contract address:{" "}
												<Link to="/stake">
													{bentPool.options.address}
												</Link>
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