import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
	Row, Col, Button
} from "reactstrap";
import { 
	useActiveWeb3React,
	useBlockNumber,
	useERC20Contract,
	useBentMasterChefContract,
	useGasPrice
} from "hooks";
import { ERC20, formatBigNumber, BentMasterChef } from "utils";
import { BigNumber } from 'ethers';
import { POOLS, SushiPool } from "constant";

interface Props {
	poolInfo: SushiPool
	poolKey: string
}

export const ClaimSushiLpItem = (props: Props): React.ReactElement => {
	const [collapsed, setCollapsed] = useState<boolean>(true);
	const [symbol, setSymbol] = useState<string>('');
	const [deposit, setDeposit] = useState(0);
	const [pendingRewards, setPendingRewards] = useState(0);
	const { account } = useActiveWeb3React();
	const blockNumber = useBlockNumber();
	const depositTokenContract = useERC20Contract(props.poolInfo.DepositAsset);
	const masterChef = useBentMasterChefContract(POOLS.SushiPools.MasterChef);
	const gasPrice = useGasPrice();

	useEffect(() => {
		Promise.all([
			ERC20.getSymbol(depositTokenContract),
			BentMasterChef.getDepositedAmount(masterChef, account, props.poolInfo.PoolId),
			BentMasterChef.getPendingRewards(masterChef, account, props.poolInfo.PoolId)
		]).then(([symbol, depositedLp, pendingRewards]) => {
			setSymbol(symbol);
			setDeposit(depositedLp.amount);
			setPendingRewards(pendingRewards);
		})
	}, [depositTokenContract, masterChef, blockNumber, account, props.poolInfo.PoolId])

	const claim = async () => {
		await BentMasterChef.claim(masterChef, account, props.poolInfo.PoolId, gasPrice);
	}

	return (
		<div className="innerWrap p-0 pt-1 pb-1">
			<Wrapper
				className="bentInner"
				color="primary"
				id={`toggleInner-claim-curve-lp-${props.poolInfo.Name}`}
				onClick={() => setCollapsed(!collapsed)}
				collapsed={collapsed}
			>
				<Row className="align-items-center">
					<Col>
						<div className="imgText">
							<PoolLogo src={props.poolInfo.LOGO[0]} alt="" />
							<PoolLogo src={props.poolInfo.LOGO[1]} alt="" style={{marginLeft: -20}} />
							<h4>{props.poolInfo.Name}</h4>
						</div>
					</Col>
					<Col>
						<b>
							{formatBigNumber(BigNumber.from(pendingRewards))} BENT
						</b>
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
						<div className="climBtn">
							<Button className="claimbtn" onClick={claim}>Claim</Button>
							{/* <i
								className="fa fa-caret-down"
								aria-hidden="true"
							></i> */}
						</div>
					</Col>
				</Row>
			</Wrapper>
			{/* <InnerWrapper
				className="innerAccordian"
				toggler={`#toggleInner-claim-curve-lp-${props.poolInfo.Name}`}
			>
				<Card>
					<CardBody>
						<Row className="align-items-center">
							<Col sm={12}>
								<p>Breakdown of claimable earnings:</p>
							</Col>
						</Row>
						<Row className="align-items-center">
							<Col>
								<div className="imgText">
									<img src={props.poolInfo.LOGO} alt="" />
									<h4>Chainlink</h4>
								</div>
							</Col>
							<Col>
								<b>
									<span>$</span>0
								</b>
							</Col>
							<Col> </Col>
							<Col> </Col>
							<Col> </Col>
						</Row>
					</CardBody>
				</Card>
			</InnerWrapper> */}
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
	padding: 13px 15px;
`;

// const InnerWrapper = styled(UncontrolledCollapse)`
// 	background: #CAB8FF;
// 	border: unset;
// `;