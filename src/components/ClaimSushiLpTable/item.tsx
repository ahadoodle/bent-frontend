import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
	Row, Col, Button
} from "reactstrap";
import {
	useActiveWeb3React,
	useBlockNumber,
	useBentMasterChefContract,
	useGasPrice,
	useTokenPrice,
	useMulticallProvider
} from "hooks";
import {
	formatBigNumber,
	BentMasterChef,
	getMultiERC20Contract,
	getMultiBentMasterChef
} from "utils";
import { BigNumber, ethers, utils } from 'ethers';
import { POOLS, SushiPool, TOKENS } from "constant";

interface Props {
	poolInfo: SushiPool
	poolKey: string
}

export const ClaimSushiLpItem = (props: Props): React.ReactElement => {
	const [collapsed, setCollapsed] = useState<boolean>(true);
	const [symbol, setSymbol] = useState<string>('');
	const [depositedLp, setDepositedLp] = useState<BigNumber>(ethers.constants.Zero);
	const [pendingRewards, setPendingRewards] = useState<BigNumber>(ethers.constants.Zero);
	const [earnedUsd, setEarnedUsd] = useState<BigNumber>(ethers.constants.Zero);

	const { account } = useActiveWeb3React();
	const blockNumber = useBlockNumber();
	const masterChef = useBentMasterChefContract(POOLS.SushiPools.MasterChef);
	const gasPrice = useGasPrice();
	const multicall = useMulticallProvider();
	const bentPrice = useTokenPrice(TOKENS['BENT'].ADDR);

	useEffect(() => {
		const accAddr = account || ethers.constants.AddressZero
		const bentMasterChefMC = getMultiBentMasterChef(POOLS.SushiPools.MasterChef);
		multicall.all([
			getMultiERC20Contract(props.poolInfo.DepositAsset).symbol(),
			bentMasterChefMC.userInfo(props.poolInfo.PoolId, accAddr),
			bentMasterChefMC.pendingReward(props.poolInfo.PoolId, accAddr)
		]).then(([symbol, userInfo, pendingRewards]) => {
			setSymbol(symbol);
			setDepositedLp(userInfo.amount);
			setPendingRewards(pendingRewards);
			setEarnedUsd(utils.parseEther(bentPrice.toString()).mul(pendingRewards)
				.div(BigNumber.from(10).pow(TOKENS['BENT'].DECIMALS)));
		})
	}, [multicall, blockNumber, account, props, bentPrice])

	const claim = async () => {
		await BentMasterChef.claim(masterChef, account, props.poolInfo.PoolId, gasPrice);
	}

	const haveRewards = () => {
		return !BigNumber.from(pendingRewards).isZero();
	}

	return (
		<div className="innerWrap p-0 pt-1 pb-1 rounded">
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
							<PoolLogo src={props.poolInfo.LOGO[1]} alt="" style={{ marginLeft: -20 }} />
							<h4>{props.poolInfo.Name}</h4>
						</div>
					</Col>
					<Col>
						<b>
							{formatBigNumber(BigNumber.from(pendingRewards))}
							<span className="small text-bold"> BENT</span>
						</b>
						<span className="small text-muted"> ≈ ${formatBigNumber(earnedUsd)}</span>
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
							{formatBigNumber(BigNumber.from(depositedLp))}
							<span className="small text-bold"> {props.poolInfo.Name} {symbol}</span>
						</b>
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

const Wrapper = styled.div<{ collapsed: boolean }>`
	cursor: pointer;
	background: ${props => props.collapsed ? 'transparent' : '#CAB8FF !important'};
	padding: 13px 15px;
`;

// const InnerWrapper = styled(UncontrolledCollapse)`
// 	background: #CAB8FF;
// 	border: unset;
// `;