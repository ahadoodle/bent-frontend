import React, { useEffect, useState } from "react";
import {
	Row, Col, Card, CardTitle, UncontrolledCollapse, CardText,
	Nav, NavLink, NavItem, TabPane, TabContent, Button, Label, Input,
} from "reactstrap";
import classnames from "classnames";
import styled from "styled-components";
import {
	ERC20,
	BentBasePool,
	CrvFiLp,
	formatBigNumber,
	getCrvDepositLink,
	getTokenDecimals,
	getEtherscanLink,
	getMultiERC20Contract,
	getMultiBentPool,
	getMultiCvxRewardPool,
	formatMillionsBigNumber,
	getAnnualReward
} from "utils";
import { BigNumber, ethers, utils } from 'ethers';
import {
	useActiveWeb3React,
	useBentPoolContract,
	useBlockNumber,
	useCrvFiLp,
	useGasPrice,
	useMulticallProvider,
	useTokenPrices
} from "hooks";
import { BentPool, TOKENS } from "constant";

interface Props {
	poolInfo: BentPool
	poolKey: string
}

export const StakeCurveLpItem = (props: Props): React.ReactElement => {
	const [collapsed, setCollapsed] = useState<boolean>(true);
	const [isApproved, setIsApproved] = useState<boolean>(false);
	const [currentActiveTab, setCurrentActiveTab] = useState('1');
	const [stakeAmount, setStakeAmount] = useState('');
	const [withdrawAmount, setWithdrawAmount] = useState('');
	const [lpBalance, setLpBalance] = useState<BigNumber>(ethers.constants.Zero);
	const [allowance, setAllowance] = useState<BigNumber>(ethers.constants.Zero);
	const [depositedLp, setDepositedLp] = useState<BigNumber>(ethers.constants.Zero);
	const [tvl, setTvl] = useState<BigNumber>(ethers.constants.Zero);
	const [apr, setApr] = useState<number>(0);
	const [stakedUsd, setStakedUsd] = useState<BigNumber>(ethers.constants.Zero);
	const [estRewards, setEstRewards] = useState<BigNumber>(ethers.constants.Zero);

	const { account } = useActiveWeb3React();
	const depositTokenContract = useCrvFiLp(props.poolInfo.DepositAsset);
	const crvMinter = useCrvFiLp(props.poolInfo.CrvMinter || '');
	const bentPool = useBentPoolContract(props.poolKey);
	const gasPrice = useGasPrice();
	const tokenPrices = useTokenPrices();
	const blockNumber = useBlockNumber();
	const multicall = useMulticallProvider();
	const symbol = props.poolInfo.CrvLpSYMBOL;

	useEffect(() => {
		const accAddr = account || ethers.constants.AddressZero;
		const lpTokenContract = getMultiERC20Contract(props.poolInfo.DepositAsset);
		const bentPoolMC = getMultiBentPool(props.poolKey);
		const cvxRewardPool = getMultiCvxRewardPool(props.poolInfo.CvxRewardsAddr);
		multicall.all([
			lpTokenContract.balanceOf(accAddr),
			lpTokenContract.allowance(accAddr, props.poolInfo.POOL),
			bentPoolMC.balanceOf(accAddr),
			cvxRewardPool.balanceOf(props.poolInfo.POOL),
			bentPoolMC.pendingReward(accAddr),
			bentPoolMC.rewardPools(0),
			bentPoolMC.rewardPools(1),
			bentPoolMC.rewardPools(2),
			getMultiERC20Contract(TOKENS['BENT'].ADDR).totalSupply(),
		]).then(([availableLp, allowance, depositedLp, poolLpBalance, rewards, rewardsInfo1, rewardsInfo2, rewardsInfo3, bentSupply]) => {
			setLpBalance(availableLp);
			setAllowance(allowance);
			setDepositedLp(depositedLp);
			let totalReward = ethers.constants.Zero;
			props.poolInfo.RewardsAssets.forEach((key, index) => {
				const addr = TOKENS[key].ADDR.toLowerCase();
				totalReward = (tokenPrices[addr] && rewards[index]) ?
					utils.parseUnits(tokenPrices[addr].toString()).mul(rewards[index]).add(totalReward) : totalReward
			});
			setEstRewards(totalReward.div(BigNumber.from(10).pow(18)));

			// Calculate Crv Lp Price
			const lpFiContract = props.poolInfo.CrvMinter ? crvMinter : depositTokenContract;
			/* eslint-disable @typescript-eslint/no-explicit-any*/
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
				let totalUsd = ethers.constants.Zero;
				for (let i = 0; i < props.poolInfo.CrvCoinsLength; i++) {
					const addr = results[i * 2];
					const bal = results[i * 2 + 1];
					if (tokenPrices[addr.toLowerCase()]) {
						totalUsd = utils.parseEther(tokenPrices[addr.toLowerCase()].toString())
							.mul(bal).div(BigNumber.from(10).pow(getTokenDecimals(addr)))
							.add(totalUsd);
					}
				}
				const tvl = totalUsd.mul(poolLpBalance).div(lpTotalSupply)
				setTvl(tvl);
				setStakedUsd(totalUsd.mul(depositedLp).div(lpTotalSupply));

				// Cvx rewards
				let annualRewardsUsd = getAnnualReward(rewardsInfo1.rewardRate, rewardsInfo1.rewardToken, tokenPrices[rewardsInfo1.rewardToken.toLowerCase()]);
				annualRewardsUsd = getAnnualReward(rewardsInfo2.rewardRate, rewardsInfo2.rewardToken, tokenPrices[rewardsInfo2.rewardToken.toLowerCase()]).add(annualRewardsUsd);
				if (rewardsInfo3.rewardToken !== ethers.constants.AddressZero)
					annualRewardsUsd = getAnnualReward(rewardsInfo3.rewardRate, rewardsInfo3.rewardToken, tokenPrices[rewardsInfo3.rewardToken.toLowerCase()]).add(annualRewardsUsd);
				// Bent Rewards
				const bentMaxSupply = BigNumber.from(10).pow(8 + 18);
				const bentRewardRate = rewardsInfo2.rewardRate.mul(20).mul(bentMaxSupply.sub(bentSupply)).div(bentMaxSupply);
				annualRewardsUsd = getAnnualReward(bentRewardRate, TOKENS['BENT'].ADDR, tokenPrices[TOKENS['BENT'].ADDR.toLowerCase()]);
				setApr(annualRewardsUsd.mul(10000).div(tvl).toNumber() / 100);
			})
		})
	}, [multicall, depositTokenContract, account, blockNumber, crvMinter, tokenPrices, props])

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
		const res = await ERC20.approve(depositTokenContract, account, props.poolInfo.POOL, gasPrice);
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
				<Row className="align-items-center" style={{ padding: '0 10px' }}>
					<Col>
						<div className="imgText">
							<PoolLogo src={props.poolInfo.LOGO} alt="" />
							<h4>{props.poolInfo.Name}</h4>
						</div>
					</Col>
					<Col>
						<b><span className="small">$</span>{formatBigNumber(estRewards)}</b>
					</Col>
					<Col>
						<b>
							{apr ? `${apr}%` : 'TBC'}
						</b>
					</Col>
					<Col>
						<b>
							{formatBigNumber(BigNumber.from(depositedLp), 18, 2)}
							<span className="small text-bold"> {symbol}</span>
						</b>
						<span className="small text-muted"> ≈ <span className="small">$</span>
							{formatBigNumber(BigNumber.from(stakedUsd), 18, 2)}
						</span>
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
												<a href={getEtherscanLink(bentPool.options.address)} target="_blank" rel="noreferrer">
													{bentPool.options.address}
												</a>
											</p>
											<p>
												Rewards contract address:&nbsp;
												<a href={getEtherscanLink(bentPool.options.address)} target="_blank" rel="noreferrer">
													{bentPool.options.address}
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