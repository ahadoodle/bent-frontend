import React from "react";
import styled from "styled-components";
import {
	Row, Col, Button
} from "reactstrap";
import {
	useActiveWeb3React,
	useBentMasterChefContract,
	useGasPrice,
	useSushiLpDeposited,
	useSushiPoolDepositedUsd,
	useSushiPoolEarnedUsd,
	useSushiPoolRewards,
} from "hooks";
import {
	formatBigNumber,
	BentMasterChef,
} from "utils";
import { BigNumber } from 'ethers';
import { POOLS, SushiPool } from "constant";

interface Props {
	poolInfo: SushiPool
	poolKey: string
}

export const ClaimSushiLpItem = (props: Props): React.ReactElement => {
	const symbol = props.poolInfo.Name + ' SLP';
	const { account } = useActiveWeb3React();
	const masterChef = useBentMasterChefContract(POOLS.SushiPools.MasterChef);
	const gasPrice = useGasPrice();
	const depositedLp = useSushiLpDeposited(props.poolKey);
	const stakedUsd = useSushiPoolDepositedUsd(props.poolKey);
	const rewards = useSushiPoolRewards(props.poolKey);
	const earned = useSushiPoolEarnedUsd(props.poolKey);

	const claim = async () => {
		await BentMasterChef.claim(masterChef, account, props.poolInfo.PoolId, gasPrice);
	}

	const haveRewards = () => {
		return !rewards.isZero();
	}

	return (
		<div className="innerWrap p-0 rounded">
			<Wrapper
				className="bentInner"
				color="primary"
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
						<b><span className="small">$</span>{formatBigNumber(earned)}</b><br />
						<span className="small text-muted">
							{formatBigNumber(BigNumber.from(rewards))}
							<span className="small text-bold"> BENT</span>
						</span>
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
						<b>
							~ ${formatBigNumber(BigNumber.from(stakedUsd), 18, 2)}
						</b><br />
						<span className="small text-muted">
							{formatBigNumber(BigNumber.from(depositedLp), 18, 2)} {symbol}
						</span>
					</Col>
					<Col>
						<div className="climBtn">
							<Button
								className="claimbtn"
								onClick={claim}
								disabled={!haveRewards()}
							>Claim</Button>
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

const Wrapper = styled.div`
	cursor: pointer;
	padding: 10px;
`;