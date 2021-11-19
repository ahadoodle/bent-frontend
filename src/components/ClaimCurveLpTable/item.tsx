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
import { ERC20, BentBasePool, formatBigNumber, getPrice } from "utils";
import { BigNumber, utils } from 'ethers';
import { BentPool, TOKENS } from "constant";

interface Props {
	// poolIndex: number
	poolInfo: BentPool
	poolKey: string
	// updateEarning: (i, e) => void
}

export const ClaimCurveLpItem = (props: Props): React.ReactElement => {
	const [collapsed, setCollapsed] = useState<boolean>(true);
	const [symbol, setSymbol] = useState<string>('');
	const [deposit, setDeposit] = useState(0);
	const [rewards, setRewards] = useState<number[]>([]);
	const [estRewards, setEstRewards] = useState<number[]>([]);
	const { account } = useActiveWeb3React();
	const blockNumber = useBlockNumber();
	const depositTokenContract = useERC20Contract(props.poolInfo.DepositAsset);
	const bentPool = useBentPoolContract(props.poolKey);
	const gasPrice = useGasPrice();

	const totalEarned = () => {
		let sum = BigNumber.from(0);
		estRewards.forEach(reward => {
			sum = sum.add(utils.parseUnits(reward.toString()).div(BigNumber.from(10).pow(18)))
		})
		return sum;
	}

	const haveRewards = () => {
		let enable = false;
		rewards.forEach(reward => enable = rewards.toString() === '0');
		return enable;
	}

	useEffect(() => {
		Promise.all([
			ERC20.getSymbol(depositTokenContract),
			BentBasePool.getDepositedAmount(bentPool, account),
			BentBasePool.getPendingReward(bentPool, account),
			getPrice(props.poolInfo.RewardsAssets.map(key => {
				return TOKENS[key].ADDR;
			}), 'usd'),
		]).then(([symbol, depositedLp, rewards, rTokenPrices]) => {
			setSymbol(symbol);
			setDeposit(depositedLp);
			setRewards(rewards);
			setEstRewards(props.poolInfo.RewardsAssets.map((key, index) => {
				const addr = TOKENS[key].ADDR.toLowerCase();
				if(rTokenPrices[addr] && rewards[index]) {
					return parseFloat(rewards[index].toString()) * rTokenPrices[addr]['usd'];
				} else
					return 0;
			}));
			// props.updateEarning(props.poolIndex, totalEarned());
		})
	}, [depositTokenContract, bentPool, blockNumber, account, props.poolInfo.RewardsAssets, props])

	const claim = async () => {
		await BentBasePool.harvest(bentPool, account, gasPrice);
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
							<span>$</span>
							{formatBigNumber(totalEarned())}
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
				<Card>
					<CardBody>
						<Row className="align-items-center">
							<Col sm={12}>
								<p>Breakdown of claimable earnings:</p>
							</Col>
						</Row>
						{ props.poolInfo.RewardsAssets.map((tokenKey, index) => 
							<Row className="align-items-center mb-1" key={tokenKey} >
								<Col>
									<div className="imgText">
										<img src={TOKENS[tokenKey].LOGO} alt="" width="28"/>
										<h4>{tokenKey}</h4>
									</div>
								</Col>
								<Col>
									<b>
										{formatBigNumber(BigNumber.from(rewards[index] || 0))}
										<span className="small text-bold"> {tokenKey}</span>
									</b>
									<span className="small text-muted"> ≈ ${
										estRewards[index] ? formatBigNumber(utils.parseUnits(estRewards[index].toString()).div(BigNumber.from(10).pow(18))) : 0
									}</span>
								</Col>
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

const Wrapper = styled.div<{collapsed : boolean }>`
	cursor: pointer;
	background: ${props => props.collapsed ? 'transparent' : '#CAB8FF !important'};
	padding: 13px 15px;
`;

const InnerWrapper = styled(UncontrolledCollapse)`
	background: #CAB8FF;
	border: unset;
`;