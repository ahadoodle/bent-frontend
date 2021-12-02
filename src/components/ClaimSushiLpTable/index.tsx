import React from "react";
import { Row, Col, Card, CardBody, Container } from "reactstrap";
import { POOLS } from "constant";
import SushiLogo from 'assets/images/token/SUSHI.png';
import { ClaimSushiLpItem } from "./item";

export const ClaimSushiLpTable = (): React.ReactElement => {
	return (
		<Container className="convert-up">
			<Row>
				<Col md="12">
					<div className="toggleWrap tokentable table">
						<Row className="align-items-center thead p-0 pt-2 pb-2">
							<Col>
								<div className="imgText">
									<img src={SushiLogo} alt="" width="28" />
									<h2>Sushi Pools</h2>
								</div>
							</Col>
							<Col>
								Earned
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
								Deposits
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
								{Object.keys(POOLS.SushiPools.Pools).map(poolName =>
									<ClaimSushiLpItem poolInfo={POOLS.SushiPools.Pools[poolName]} poolKey={poolName} key={poolName} />)
								}
							</CardBody>
						</Card>
					</div>
				</Col>
			</Row>
		</Container>
	)
}