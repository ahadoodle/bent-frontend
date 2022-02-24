import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
	Row, Col, Card, CardBody, UncontrolledCollapse, Button, CardText, UncontrolledTooltip
} from "reactstrap";
import {
	useActiveWeb3React,
	useBentCvxMasterChefContract,
	useCrvDeposit,
	useCrvPoolDepositedUsd,
	useCrvPoolEarnedUsd,
	useTokenPrices,
	useCrvPoolRewards,
	useCrvApr,
	useCrvProjectedApr
} from "hooks";
import {
	formatBigNumber,
	getTokenDecimals,
	increaseGasLimit,
} from "utils";
import { BigNumber, ethers, utils } from 'ethers';
import { BentPool, TOKENS } from "constant";
import { DecimalSpan } from "components/DecimalSpan";

interface Props {
	poolInfo: BentPool
	poolKey: string
	visible: boolean
}

export const ClaimBentCvxCurveLpItem = (props: Props): React.ReactElement => {
	const [collapsed, setCollapsed] = useState<boolean>(true);
	const [showBreakdown, setShowBreakdown] = useState(false);
	const [usdRewards, setUsdRewards] = useState<BigNumber[]>([]);
	const { library } = useActiveWeb3React();
	const bentPool = useBentCvxMasterChefContract();
	const tokenPrices = useTokenPrices();
	const symbol = props.poolInfo.CrvLpSYMBOL;
	const depositedLp = useCrvDeposit(props.poolKey);
	const earnedUsd = useCrvPoolEarnedUsd(props.poolKey);
	const stakedUsd = useCrvPoolDepositedUsd(props.poolKey);
	const rewards = useCrvPoolRewards(props.poolKey);
	const apr = useCrvApr(props.poolKey);
	const projectedApr = useCrvProjectedApr(props.poolKey);

	const currentApr = () => {
		return apr + projectedApr.baseCrvvApr.toNumber() / 100
	}

	const haveRewards = () => {
		let enable = false;
		rewards.forEach(reward => enable = enable || reward.toString() !== '0');
		return enable;
	}

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

	const claim = async () => {
		if (!library) return;
		const signer = await library.getSigner();
		const account = await signer.getAddress();
		const gasLimit = await bentPool.connect(signer).estimateGas.claim(0, account);
		await bentPool.connect(signer).claim(0, account, { gasLimit: increaseGasLimit(gasLimit) });
	}

	return (
		<div className={`innerWrap p-0 rounded ${collapsed ? '' : 'open'} ${props.visible ? '' : 'd-none'}`} >
			<Wrapper
				className={`bentInner ${collapsed ? '' : 'open'}`}
				color="primary"
				id={`toggleInner-claim-curve-lp-${props.poolInfo.Name}`}
				onClick={() => setCollapsed(!collapsed)}
				collapsed={collapsed}
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
							{depositedLp.isZero() ? '--' : formatBigNumber(depositedLp, 18, 2)}
							<span className="text-bold"> {symbol}</span>
						</span>
					</Col>
					<Col>
						<div className="climBtn">
							<Button
								className="claimbtn"
								onClick={claim}
								disabled={!haveRewards()}
							>Claim</Button>
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
				<Card className="splitter-horizontal" style={{ borderRadius: 0 }}>
					<CardBody className="p-1 converttabs">
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
								<Col></Col>
								<Col></Col>
							</Row>
						)}
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

const Wrapper = styled.div<{ collapsed: boolean }>`
	cursor: pointer;
	padding: 10px;
`;

const InnerWrapper = styled(UncontrolledCollapse)`
	background: #CAB8FF;
	border: unset;
`;