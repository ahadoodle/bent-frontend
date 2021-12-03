import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { POOLS } from "constant";
import { StakeCurveLpItem } from "./item";
import { formatBigNumber, formatMillionsBigNumber, getSumBigNumbers } from "utils";
import { useCrvAverageApr, useCrvPoolDepositedUsds, useCrvPoolEarns, useCrvTvls } from "hooks";
import { MorePoolsRow } from "components/MorePoolsRow";

export const StakeCurveLpTable = (): React.ReactElement => {
	const [showAll, setShowAll] = useState(false);
	const tvls = useCrvTvls();
	const earns = useCrvPoolEarns();
	const depostedUsd = useCrvPoolDepositedUsds();
	const avgApr = useCrvAverageApr();

	return (
		<Container className="convert-up">
			<Row>
				<Col md="12">
					<h2 className="section-header">Stake Curve LP Tokens</h2>
					<div className="toggleWrap tokentable table">
						<Row className="align-items-center thead">
							<Col>
								Pool Name{" "}
								<i
									className="fa fa-caret-down"
									aria-hidden="true"
								></i>
							</Col>
							<Col>
								<span className="small p-0">Total Earned (USD)</span><br />
								<b className="p-0">
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
								<span className="small">
									TVL
								</span><br />
								<b>
									<span className="small">$</span>
									<span className="h5">{formatMillionsBigNumber(getSumBigNumbers(tvls), 18, 0)}</span>
									&nbsp;<i className="fa fa-caret-down" aria-hidden="true" />
								</b>
							</Col>
						</Row>
						<Card>
							<CardBody>
								{
									Object.keys(POOLS.BentPools).map((poolName, index) =>
										<StakeCurveLpItem
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