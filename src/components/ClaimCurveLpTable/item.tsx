import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
	Row, Col, Card, CardBody, UncontrolledCollapse, Button, CardText
} from "reactstrap";
import {
	useActiveWeb3React,
	useBentPoolContract,
	useCrvDeposit,
	useCrvPoolDepositedUsd,
	useCrvPoolEarnedUsd,
	useTokenPrices,
	useCrvPoolRewards,
	useCrvApr,
	useCrvProjectedApr,
} from "hooks";
import {
	formatBigNumber,
	getTokenDecimals,
} from "utils";
import { BigNumber, ethers, utils } from 'ethers';
import { BentPool, TOKENS } from "constant";
import { DecimalSpan } from "components/DecimalSpan";
import { CvxProjectedAprTooltip } from "components/CvxProjectedAprTooltip";

interface Props {
	poolInfo: BentPool
	poolKey: string
	visible: boolean
}

export const ClaimCurveLpItem = (props: Props): React.ReactElement => {
	const [collapsed, setCollapsed] = useState<boolean>(true);
	const [showBreakdown, setShowBreakdown] = useState(false);
	const [usdRewards, setUsdRewards] = useState<BigNumber[]>([]);
	const { library } = useActiveWeb3React();
	const bentPool = useBentPoolContract(props.poolKey);
	const tokenPrices = useTokenPrices();
	const symbol = props.poolInfo.CrvLpSYMBOL;
	const depositedLp = useCrvDeposit(props.poolKey);
	const earnedUsd = useCrvPoolEarnedUsd(props.poolKey);
	const stakedUsd = useCrvPoolDepositedUsd(props.poolKey);
	const rewards = useCrvPoolRewards(props.poolKey);
	const apr = useCrvApr(props.poolKey);
	const projectedApr = useCrvProjectedApr(props.poolKey);

	const haveRewards = () => {
		let enable = false;
		rewards.forEach(reward => enable = enable || reward.toString() !== '0');
		return enable;
	}

	const visible = () => {
		if (!props.visible) return 'd-none';
		if (props.poolInfo.isLegacy && depositedLp.isZero()) return 'd-none'
		return '';
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
		await bentPool.connect(signer).harvest();
	}

	return (
		<div className={`innerWrap p-0 rounded ${collapsed ? '' : 'open'} ${visible()}`} >
			<Wrapper
				className={`bentInner ${collapsed ? '' : 'open'}`}
				color="primary"
				id={`toggleInner-claim-curve-lp-${props.poolInfo.Name}`}
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
									{utils.commify(apr)}%&nbsp;
									<i className="fa fa-info-circle cursor-pointer" aria-hidden="true" id={`crv-${props.poolKey}-apr-breakdown`}
										onClick={(e) => {
											setShowBreakdown(!showBreakdown)
											e.stopPropagation();
										}} />
									<CvxProjectedAprTooltip
										target={`crv-${props.poolKey}-apr-breakdown`}
										apr={apr}
										projectedApr={projectedApr}
										hasExtra={props.poolInfo.RewardsAssets.length > 3}
										extraSymbol={props.poolInfo.RewardsAssets[props.poolInfo.RewardsAssets.length - 1]}
									/>
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
				onEntering={() => setCollapsed(false)}
				onExit={() => setCollapsed(true)}
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
										{formatBigNumber(BigNumber.from(rewards[index] || 0))}
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