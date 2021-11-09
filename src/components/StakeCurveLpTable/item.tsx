import { useActiveWeb3React, useERC20Contract } from "hooks";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
	Row, Col, Card, CardBody, CardTitle, UncontrolledCollapse, CardText,
	Nav, NavLink, NavItem, TabPane, TabContent, Button, Label, Input,
} from "reactstrap";
import classnames from "classnames";
import styled from "styled-components";
import CrvLogo from 'assets/images/token/CRV.png';
import { formatBigNumber, ERC20 } from "utils";
import { BigNumber, utils } from 'ethers';

interface Props {
	poolInfo: any
}

export const StakeCurveLpItem = (props: Props) => {
	const [symbol, setSymbol] = useState<string>('');
	const [collapsed, setCollapsed] = useState<boolean>(true);
	const [isApproved, setIsApproved] = useState<boolean>(false);
	const [currentActiveTab, setCurrentActiveTab] = useState('1');
	const [lpBalance, setLpBalance] = useState(0);
	const [stakeAmount, setStakeAmount] = useState('');
	const { account } = useActiveWeb3React();
	const depositTokenContract = useERC20Contract(props.poolInfo.DepositAsset);

	useEffect(() => {
		Promise.all([
			ERC20.getSymbol(depositTokenContract),
			ERC20.getBalanceOf(depositTokenContract, account)
		]).then(([depositSymbol, availableLp]) => {
			setSymbol(depositSymbol);
			setLpBalance(availableLp);
		})
	}, [depositTokenContract])

	const toggle = tab => {
		if (currentActiveTab !== tab) setCurrentActiveTab(tab);
	}
	
	const approve = async () => {
		await ERC20.approve(depositTokenContract, account, props.poolInfo.POOL, stakeAmount);
	}

	return (
		<div className="innerWrap p-0 pt-1 pb-1">
			<Wrapper
				onClick={() => setCollapsed(!collapsed)}
				collapsed={collapsed}
				className="bentInner"
				color="primary"
				id={`toggleInner-stake-curve-lp${props.poolInfo.Name}`}
				style={{ marginBottom: "1rem" }}
			>
				<Row className="align-items-center">
					<Col>
						<div className="imgText">
							<PoolLogo src={props.poolInfo.LOGO} alt=""/>
							<h4>{props.poolInfo.Name}</h4>
						</div>
					</Col>
					<Col>
						<span>$</span>0
					</Col>
					<Col>
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
					</Col>
					<Col>
						<div className="depositText">-{symbol}</div>
					</Col>
					<Col>
						<div className="tvlText">
							<span>$</span>220.70m
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
				toggler={`#toggleInner-stake-curve-lp${props.poolInfo.Name}`}
			>
				<div className="converttabs" style={{background: 'unset', borderTop: '1px solid black', borderRadius: 0 }}>
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
											Deposit liquidity into the {props.poolInfo.Name} pool (without staking in the Curve gauge),
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
													<Label>Available:{formatBigNumber(BigNumber.from(lpBalance), 18, 8)}</Label>
												</p>
												<div className="amutinput">
													<Input type="number" placeholder="0" onChange={(e) => setStakeAmount(e.target.value)} />
													<Button className="maxbtn">Max</Button>
												</div>
												<div className="btnouter">
													<p className="lineup"></p>
													<div className="btnwrapper">
														<Button
															className="approvebtn"
															disabled={
																BigNumber.from(lpBalance).isZero() || 
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
								<Col sm="6">
									<Card body>
										<CardText></CardText>
										<Button>Go somewhere</Button>
									</Card>
								</Col>
								<Col sm="6">
									<Card body>
										<CardTitle>Special Title Treatment</CardTitle>
										<CardText>
											With supporting text below as a natural lead-in
											to additional content.
										</CardText>
										<Button>Go somewhere</Button>
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
												CRV token address:{" "}
												<Link to="/stake">
													0xd533a949740bb3306d119cc777fa900ba034cd52
												</Link>
											</p>
											<p>
												cvxCRV token address:{" "}
												<Link to="/stake">
													0xd533a949740bb3306d119cc777fa900ba034cd52
												</Link>
											</p>
											<p>
												Deposit contract address:{" "}
												<Link to="/stake">
													0xd533a949740bb3306d119cc777fa900ba034cd52
												</Link>
											</p>
											<p>
												Rewards contract address:{" "}
												<Link to="/stake">
													0xd533a949740bb3306d119cc777fa900ba034cd52
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

const Wrapper = styled.div<{collapsed : boolean }>`
	cursor: pointer;
	background: ${props => props.collapsed ? 'transparent' : '#CAB8FF !important'};
`;

const InnerWrapper = styled(UncontrolledCollapse)`
	background: #CAB8FF;
	border: unset;
`;