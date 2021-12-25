import React, { useState } from "react";
import {
	Container, Button, Row, Col, Card, CardBody
} from "reactstrap";
import { POOLS, TOKEN_LOGO } from "constant";
import { formatBigNumber } from "utils";
import {
	useActiveWeb3React,
	useBentCvxStakingContract,
	useBentCvxStakedUSD,
	useBentCvxStaked,
	useBentCvxTotalEarned,
	useBentCvxAvgApr,
} from 'hooks';
import { utils } from "ethers";
import { DecimalSpan } from "components/DecimalSpan";
import { ClaimBentCvxRewarderCvx } from "./rewarderCvx";
import { ClaimBentCvxRewarderMasterChef } from "./rewarderMasterchef";

export const ClaimBentCVX = (): React.ReactElement => {
	const [claimChecked, setClaimChecked] = useState<Record<string, Record<string, boolean>>>({
		CVX: {}, BENT: {}, MC: {}
	});
	const bentCvxStaked = useBentCvxStaked();
	const bentCvxStakedUsd = useBentCvxStakedUSD();
	const avgApr = useBentCvxAvgApr();
	const earnedUsd = useBentCvxTotalEarned();

	const { library } = useActiveWeb3React();
	const bentCvxStaking = useBentCvxStakingContract();

	const checkedIndexes = () => {
		const checkedIndexes: string[][] = [];
		Object.keys(claimChecked).forEach(key => {
			const indexes: string[] = [];
			Object.keys(claimChecked[key]).forEach(index => {
				if (claimChecked[key][index]) indexes.push(index);
			})
			checkedIndexes.push(indexes);
		})
		return checkedIndexes;
	}

	const onClaimCheckChange = (key: string, indexes: Record<number, boolean>) => {
		claimChecked[key] = indexes;
		setClaimChecked(Object.assign({}, claimChecked));
	}

	const onClaim = async () => {
		if (!library) return;
		console.log(checkedIndexes());
		const signer = await library.getSigner();
		const gasLimit = await bentCvxStaking.connect(signer).estimateGas.claim(checkedIndexes());
		await bentCvxStaking.connect(signer).claim(checkedIndexes(), { gasLimit });
	}

	return (
		<Container className="mt-5">
			<Row>
				<Col md="12">
					<div className="toggleWrap tokentable table">
						<Row className="align-items-center thead p-0 pt-2 pb-2">
							<Col>
								<div className="imgText" style={{ paddingRight: 0 }}>
									<img src={TOKEN_LOGO.BENTCVX} alt="" width="28" />
									<h2>Staked bentCVX</h2>
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
											{avgApr ? <>{utils.commify(avgApr)}%</> : 'TBC'}
										</b>
									</div>
								</div>
							</Col>
							<Col>
								<div className="tableTitle">
									<p>My Staked ({bentCvxStaked.isZero() ? '--' : formatBigNumber(bentCvxStaked, 18, 2)} bentCVX)</p>
									<div className="boldText">
										<b>
											<span className="small">$</span>
											<DecimalSpan value={formatBigNumber(bentCvxStakedUsd, 18, 2)} />
										</b>
									</div>
								</div>
							</Col>
							<Col>
								<Button
									className="claimbtn"
									onClick={onClaim}
									disabled={checkedIndexes().length === 0}
								>Claim</Button>
							</Col>
						</Row>
						<Card>
							<CardBody>
								<ClaimBentCvxRewarderCvx
									poolKey="CVX"
									poolInfo={POOLS.BentCvxStaking.BentCvxRewarderCvx}
									onClaimCheckChange={onClaimCheckChange}
								/>
								<ClaimBentCvxRewarderCvx
									poolKey="BENT"
									poolInfo={POOLS.BentCvxStaking.BentCvxRewarderBent}
									onClaimCheckChange={onClaimCheckChange}
								/>
								<ClaimBentCvxRewarderMasterChef
									poolKey="MC"
									poolInfo={POOLS.BentCvxStaking.BentCvxRewarderMasterchef}
									onClaimCheckChange={onClaimCheckChange}
								/>
							</CardBody>
						</Card>
					</div>
				</Col>
			</Row>
		</Container>
	)
}