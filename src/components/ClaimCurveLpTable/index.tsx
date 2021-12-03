import React, { useState } from "react";
import { Row, Col, Card, CardBody, Container } from "reactstrap";
import { POOLS } from "constant";
import CrvLogo from 'assets/images/token/CRV.svg';
import { ClaimCurveLpItem } from "./item";
import { useCrvPoolEarns, useCrvPoolDepositedUsds, useCrvAverageApr } from "hooks";
import { formatBigNumber, getSumBigNumbers } from "utils";
import { MorePoolsRow } from "components/MorePoolsRow";

export const ClaimCurveLpTable = (): React.ReactElement => {
	const [showAll, setShowAll] = useState(false);
	const earns = useCrvPoolEarns();
	const depostedUsd = useCrvPoolDepositedUsds();
	const avgApr = useCrvAverageApr();

	return (
		<Container className="mt-5">
			<Row>
				<Col md="12">
					<div className="toggleWrap tokentable table">
						<Row className="align-items-center thead p-0 pt-2 pb-2">
							<Col>
								<div className="imgText">
									<img src={CrvLogo} alt="" width="28" />
									<h2>Curve Pools</h2>
								</div>
							</Col>
							<Col>
								<span className="small">
									Total Earned (USD)
								</span><br />
								<b>
									<span className="small">$</span>
									<span className="h5">{formatBigNumber(getSumBigNumbers(earns))}</span>
									&nbsp;<i className="fa fa-caret-down" aria-hidden="true" />
								</b>
							</Col>
							<Col>
								<span className="small p-0">My Average APR</span><br />
								<b className="p-0">
									<span className="h5">{avgApr}</span>
									<span className="small">%</span>
									&nbsp;<i className="fa fa-caret-down" aria-hidden="true" />
								</b>
							</Col>
							<Col>
								<span className="small p-0">My Total Deposits</span><br />
								<b className="p-0">
									<span className="small">$</span>
									<span className="h5">{formatBigNumber(getSumBigNumbers(depostedUsd), 18, 2)}</span>
									&nbsp;<i className="fa fa-caret-down" aria-hidden="true" />
								</b>
							</Col>
							<Col>
								<div className="clmBtn">
									{/* <Button className="claimbtn">Claim All</Button>
										<i
											className="fa fa-caret-down"
											aria-hidden="true"
										></i> */}
								</div>
							</Col>
						</Row>
						<Card>
							<CardBody>
								{Object.keys(POOLS.BentPools).map((poolName, index) =>
									<ClaimCurveLpItem
										poolInfo={POOLS.BentPools[poolName]}
										poolKey={poolName}
										key={poolName}
										visible={index < 5 || showAll}
									/>)
								}
								<MorePoolsRow onShowMore={() => setShowAll(true)} visible={!showAll} />
							</CardBody>
						</Card>
					</div>
				</Col>
			</Row>
		</Container>
	)
}