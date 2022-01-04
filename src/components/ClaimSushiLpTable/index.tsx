import React from "react";
import { Row, Col, Card, CardBody, Container } from "reactstrap";
import { POOLS, TOKEN_LOGO } from "constant";
import { ClaimSushiLpItem } from "./item";

export const ClaimSushiLpTable = (): React.ReactElement => {
	return (
		<Container className="mt-5">
			<Row>
				<Col md="12">
					<div className="toggleWrap tokentable table">
						<Row className="align-items-center thead p-0 pt-2 pb-2">
							<Col>
								<div className="imgText">
									<img src={TOKEN_LOGO.SUSHI} alt="" width="28" />
									<h2>Sushi Pools</h2>
								</div>
							</Col>
							<Col>
								Earned
							</Col>
							<Col>
								APR
							</Col>
							<Col>
								Deposits
							</Col>
							<Col>
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