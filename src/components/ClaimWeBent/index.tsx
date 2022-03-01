import React, { useState } from "react";
import {
	Container, Button, Row, Col, Card, CardText, CardBody, Input
} from "reactstrap";
import { POOLS, TOKENS, TOKEN_LOGO } from "constant";
import { formatBigNumber } from "utils";
import {
	useActiveWeb3React,
	useWeBentLocked,
	useTokenPrice,
	useWeBentAvgApr,
	useWeBentEarnedUsd,
	useWeBentRewardsAprs,
	useWeBentRewards,
	useWeBentRewardsUsd,
	useWeBentContract,
	useWeBentBalance,
} from 'hooks';
import { ethers, BigNumber, utils } from "ethers";
import { ClaimWeBentRewardItem } from "./item";
import { DecimalSpan } from "components/DecimalSpan";
import { WeBentAprTooltip } from "components/Tooltip";

export const ClaimWeBent = (): React.ReactElement => {
	const [claimBtnText, setClaimBtnText] = useState('Claim');
	const [checkAll, setCheckAll] = useState(false);
	const [claimChecked, setClaimChecked] = useState<Record<number, boolean>>({});
	const avgApr = useWeBentAvgApr();
	const rewardAprs = useWeBentRewardsAprs();
	const earnedUsd = useWeBentEarnedUsd();
	const bentRewards = useWeBentRewards();
	const bentRewardsUsd = useWeBentRewardsUsd();
	const weBentBent = useWeBentLocked();
	const weBentShare = useWeBentBalance();
	const bentPrice = useTokenPrice(TOKENS.BENT.ADDR);

	const { library } = useActiveWeb3React();
	const weBentContract = useWeBentContract();

	const checkedIndexes = () => {
		const checkedIndexes: string[] = [];
		Object.keys(claimChecked).forEach(key => {
			if (claimChecked[key]) checkedIndexes.push(key);
		})
		return checkedIndexes;
	}

	const onClaim = async () => {
		if (!library) return;
		const signer = await library.getSigner();
		await weBentContract.connect(signer).claim(checkedIndexes());
	}

	const onClaimCheckChange = (index: number, add: boolean) => {
		if (!add) setCheckAll(false);
		claimChecked[POOLS.weBENT.ClaimIndex[index]] = add;
		setClaimChecked(Object.assign({}, claimChecked));
		if (Object.keys(claimChecked).filter(key => claimChecked[key]).length === POOLS.weBENT.RewardAssets.length) {
			setCheckAll(true);
			setClaimBtnText('Claim All');
		} else {
			setClaimBtnText('Claim');
		}
	}

	const onCheckAll = () => {
		setCheckAll(!checkAll);
		POOLS.weBENT.RewardAssets.forEach((key, index) => {
			claimChecked[POOLS.weBENT.ClaimIndex[index]] = !checkAll;
		})
		setClaimChecked(Object.assign({}, claimChecked));
		if (!checkAll) {
			setClaimBtnText('Claim All');
		} else {
			setClaimBtnText('Claim');
		}
	}

	return (
		<Container className="stake-bent claim">
			<Row>
				<Col md="12">
					<div className="convert-up">
						<h2 className="white section-header">
							Claim Earnings
						</h2>
						<div className="toggleWrap tokentable table">
							<Row className="align-items-center thead p-0 pt-2 pb-2">
								<Col>
									<div className="imgText">
										<img src={TOKEN_LOGO.BENT} alt="" width="28" />
										<h2>weBENT</h2>
									</div>
								</Col>
								<Col>
									<div className="tableTitle">
										<p>Earned (USD)</p>
										<div className="boldText">
											<b>
												<span className="small">$</span>
												<DecimalSpan value={formatBigNumber(earnedUsd, 18, 2)} />
											</b>
										</div>
									</div>
								</Col>
								<Col>
									<div className="tableTitle">
										<p>APR</p>
										<div className="boldText">
											<b>
												{avgApr ? <>{utils.commify(avgApr.toFixed(2))}%</> : 'TBC'}&nbsp;
												<i className="fa fa-info-circle cursor-pointer text-small" id="webent-apr-info" aria-hidden="true" />
												<WeBentAprTooltip />
											</b>
										</div>
									</div>
								</Col>
								<Col style={{ flex: '1.3 0' }}>
									<div className="tableTitle">
										<p>{formatBigNumber(weBentShare, 18, 2)} weBENT = {formatBigNumber(weBentBent, 18, 2)} BENT</p>
										<div className="boldText">
											<b>
												<span className="small">$</span>
												<DecimalSpan value={formatBigNumber(utils.parseEther(bentPrice.toString()).mul(weBentBent), 18 * 2, 2)} />
											</b>
										</div>
									</div>
								</Col>
								<Col style={{ flex: '0.7 0' }}>
									<Button
										className="claimbtn"
										onClick={onClaim}
										disabled={checkedIndexes().length === 0}
									>{claimBtnText}</Button>
								</Col>
							</Row>
							<Card>
								<CardBody>
									<div className="innerAccordian">
										<div className="converttabs">
											<Row>
												<Col sm="6">
													<CardText className="mt-0">
														<span className="small">Breakdown of claimable earnings:</span>
														<Input type="checkbox" className="mx-3" checked={checkAll} onChange={onCheckAll} />
														<span className="small">Select All</span>
													</CardText>
													<div className="bent-rewards-container">
														{POOLS.weBENT.RewardAssets.map((key, index) =>
															<ClaimWeBentRewardItem
																key={key}
																index={index}
																tokenKey={key}
																apr={rewardAprs[TOKENS[key].ADDR.toLowerCase()] || 0}
																rewardUsd={bentRewardsUsd ? BigNumber.from(bentRewardsUsd[TOKENS[key].ADDR.toLowerCase()] || ethers.constants.Zero) : ethers.constants.Zero}
																reward={bentRewards ? BigNumber.from(bentRewards[TOKENS[key].ADDR.toLowerCase()] || ethers.constants.Zero) : ethers.constants.Zero}
																checked={claimChecked[POOLS.weBENT.ClaimIndex[index]] || false}
																onChange={onClaimCheckChange}
															/>
														)}
													</div>
												</Col>
											</Row>
										</div>
									</div>
								</CardBody>
							</Card>
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	)
}