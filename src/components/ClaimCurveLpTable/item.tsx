import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
	Row, Col, Card, CardBody, UncontrolledCollapse, Button
} from "reactstrap";
import { 
	useActiveWeb3React,
	useBlockNumber,
	useERC20Contract,
	useBentPoolContract,
	useGasPrice
} from "hooks";
import { ERC20, BentPasePool, formatBigNumber } from "utils";
import { BigNumber } from 'ethers';

interface Props {
	poolInfo: any
	poolKey: string
}

export const ClaimCurveLpItem = (props: Props) => {
	const [collapsed, setCollapsed] = useState<boolean>(true);
	const [symbol, setSymbol] = useState<string>('');
	const [deposit, setDeposit] = useState(0);
	const { account } = useActiveWeb3React();
	const blockNumber = useBlockNumber();
	const depositTokenContract = useERC20Contract(props.poolInfo.DepositAsset);
	const bentPool = useBentPoolContract(props.poolKey);
	const gasPrice = useGasPrice();

	useEffect(() => {
		Promise.all([
			ERC20.getSymbol(depositTokenContract),
			BentPasePool.getDepositedAmount(bentPool, account)
		]).then(([symbol, depositedLp]) => {
			setSymbol(symbol);
			setDeposit(depositedLp);
		})
	}, [depositTokenContract, blockNumber, account])

	const claim = async () => {
		await BentPasePool.harvest(bentPool, account, gasPrice);
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
							<PoolLogo src={props.poolInfo.LOGO} alt="" />
							<h4>{props.poolInfo.Name}</h4>
						</div>
					</Col>
					<Col>
						<b>
							<span>$</span>0
						</b>
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
						<div className="depositText">{formatBigNumber(BigNumber.from(deposit))} {symbol}</div>
					</Col>
					<Col>
						<div className="climBtn">
							<Button className="claimbtn" onClick={claim}>Claim</Button>
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
	padding: 13px 15px;
`;

const InnerWrapper = styled(UncontrolledCollapse)`
	background: #CAB8FF;
	border: unset;
`;