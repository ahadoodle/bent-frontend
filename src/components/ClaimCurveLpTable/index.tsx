import React from "react";
import { Row, Col, Card, CardBody, Container } from "reactstrap";
import { POOLS } from "constant";
import CrvLogo from 'assets/images/token/CRV.svg';
import { ClaimCurveLpItem } from "./item";
import { useCrvPoolEarns, useCrvPoolDepositedUsds } from "hooks";
import { formatBigNumber, getSumBigNumbers } from "utils";

export const ClaimCurveLpTable = (): React.ReactElement => {
	const earns = useCrvPoolEarns();
	const depostedUsd = useCrvPoolDepositedUsds();
	return (
		<Container>
			<Row>
				<Col md="12">
					<div className="convert-up">
						<h2 className="white">
							Claim Earnings
						</h2>
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
								{/* <Col>
									<div className="earnValue">
										<p>Average APR</p>
										<b>
											-<span>%</span>
										</b>
									</div>
								</Col> */}
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
										/>)
									}
								</CardBody>
							</Card>
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	)
}