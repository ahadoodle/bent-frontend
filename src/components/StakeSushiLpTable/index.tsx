import React from "react";
import {
	Container, Row, Col, Card, CardBody
} from "reactstrap";
import { POOLS } from "constant";
import { StakeSushiLpItem } from "./item";

export const StakeSushiLpTable = (): React.ReactElement => {
	return (
		<Container className="convert-up">
			<Row>
				<Col md="12">
					<h2 className="section-header">Provide liquidity on SushiSwap</h2>
					<div className="toggleWrap tokentable table">
						<Row className="align-items-center thead">
							<Col>
								Pool Name
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
								TVL
							</Col>
						</Row>
						<Card>
							<CardBody>
								{Object.keys(POOLS.SushiPools.Pools).map((poolName, index) =>
									<StakeSushiLpItem poolInfo={POOLS.SushiPools.Pools[poolName]} poolKey={poolName} key={index} />
								)}
							</CardBody>
						</Card>
					</div>
				</Col>
			</Row>
		</Container>
	)
}