import React from "react";
import styled from "styled-components";
import {
	Row, Col, Button
} from "reactstrap";
import {
	useActiveWeb3React,
	useBentMasterChefContract,
	useSushiLpDeposited,
	useSushiPoolDepositedUsd,
	useSushiPoolEarnedUsd,
	useSushiPoolRewards,
	useSushiApr
} from "hooks";
import {
	formatBigNumber,
} from "utils";
import { BigNumber, utils } from 'ethers';
import { SushiPool } from "constant";
import { DecimalSpan } from "components/DecimalSpan";

interface Props {
	poolInfo: SushiPool
	poolKey: string
}

export const ClaimSushiLpItem = (props: Props): React.ReactElement => {
	const symbol = props.poolInfo.Name + ' SLP';
	const { account, library } = useActiveWeb3React();
	const masterChef = useBentMasterChefContract();
	const depositedLp = useSushiLpDeposited(props.poolKey);
	const stakedUsd = useSushiPoolDepositedUsd(props.poolKey);
	const rewards = useSushiPoolRewards(props.poolKey);
	const earned = useSushiPoolEarnedUsd(props.poolKey);
	const apr = useSushiApr(props.poolKey);

	const claim = async () => {
		if (!library) return;
		const signer = await library.getSigner();
		const gasLimit = await masterChef.connect(signer).estimateGas.claim(props.poolInfo.PoolId, account);
		await masterChef.connect(signer).claim(props.poolInfo.PoolId, account, { gasLimit })
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
						<b>
							<span className="small">$</span>
							<DecimalSpan value={formatBigNumber(earned, 18, 2)} />
						</b><br />
						<span className="small text-muted">
							{rewards.isZero() ? '--' : formatBigNumber(BigNumber.from(rewards))}
							<span className="small text-bold"> BENT</span>
						</span>
					</Col>
					<Col>
						<b>
							{apr ? <>{utils.commify(apr)}%</> : 'TBC'}
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