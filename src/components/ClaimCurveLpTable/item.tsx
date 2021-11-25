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
	useGasPrice,
	useTokenPrices
} from "hooks";
import { ERC20, BentBasePool, formatBigNumber, getTokenDecimals } from "utils";
import { BigNumber, ethers, utils } from 'ethers';
import { BentPool, TOKENS } from "constant";

interface Props {
	poolInfo: BentPool
	poolKey: string
}

export const ClaimCurveLpItem = (props: Props): React.ReactElement => {
	const [collapsed, setCollapsed] = useState<boolean>(true);
	const [symbol, setSymbol] = useState<string>('');
	const [deposit, setDeposit] = useState<BigNumber>(ethers.constants.Zero);
	const [rewards, setRewards] = useState<BigNumber[]>([]);
	const [usdRewards, setUsdRewards] = useState<BigNumber[]>([]);
	const { account } = useActiveWeb3React();
	const blockNumber = useBlockNumber();
	const depositTokenContract = useERC20Contract(props.poolInfo.DepositAsset);
	const bentPool = useBentPoolContract(props.poolKey);
	const gasPrice = useGasPrice();
	const tokenPrices = useTokenPrices();

	const totalEarned = (): BigNumber => {
		let sum = ethers.constants.Zero;
		usdRewards.forEach(reward => {
			sum = sum.add(reward)
		})
		return sum;
	}

	const haveRewards = () => {
		let enable = false;
		rewards.forEach(reward => enable = enable || reward.toString() !== '0');
		return enable;
	}

	useEffect(() => {
		Promise.all([
			ERC20.getSymbol(depositTokenContract),
			BentBasePool.getDepositedAmount(bentPool, account),
			BentBasePool.getPendingReward(bentPool, account),
		]).then(([symbol, depositedLp, rewards]) => {
			setSymbol(symbol);
			setDeposit(depositedLp);
			setRewards(rewards);
			setUsdRewards(props.poolInfo.RewardsAssets.map((key, index) => {
				const addr = TOKENS[key].ADDR.toLowerCase();
				if (tokenPrices[addr] && rewards[index]) {
					return utils.parseUnits((tokenPrices[addr].toString()))
						.mul(rewards[index]).div(BigNumber.from(10).pow(getTokenDecimals(addr)));
				} else
					return ethers.constants.Zero;
			}));
		})
	}, [depositTokenContract, bentPool, blockNumber, account, props.poolInfo.RewardsAssets, props, tokenPrices])

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
						<b>
							{formatBigNumber(BigNumber.from(deposit))}
							<span className="small text-bold"> {symbol}</span>
						</b>
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
						{props.poolInfo.RewardsAssets.map((tokenKey, index) =>
							<Row className="align-items-center mb-1" key={tokenKey} >
								<Col>
									<div className="imgText">
										<img src={TOKENS[tokenKey].LOGO} alt="" width="28" />
										<h4>{tokenKey}</h4>
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
	background: ${props => props.collapsed ? 'transparent' : '#CAB8FF !important'};
	padding: 13px 15px;
`;

const InnerWrapper = styled(UncontrolledCollapse)`
	background: #CAB8FF;
	border: unset;
`;