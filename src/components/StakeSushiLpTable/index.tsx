import React from "react";
import {
  Container, Row, Col, Card, CardBody
} from "reactstrap";
import { POOLS } from "constant";
import { StakeSushiLpItem } from "./item";

export const StakeSushiLpTable = ():React.ReactElement => {
	return (
		<Container>
			<Row>
				<Col md="12">
					<div className="convert-up">
						<h2 className="black">Provide liquidity on SushiSwap</h2>
						<div className="table-Responsive LpToken">
							<div className="table-Wrapper">
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
											Earned (USD){" "}
											<i
												className="fa fa-caret-down"
												aria-hidden="true"
											></i>
										</Col>
										{/* <Col>
											APR{" "}
											<i
												className="fa fa-caret-down"
												aria-hidden="true"
											></i>
										</Col> */}
										<Col>
											My Staked Balances{" "}
											<i
												className="fa fa-caret-down"
												aria-hidden="true"
											></i>
										</Col>
										<Col>
											TVL{" "}
											<i
												className="fa fa-caret-down"
												aria-hidden="true"
											></i>
										</Col>
									</Row>
									<Card>
										<CardBody>
											{ Object.keys(POOLS.SushiPools.Pools).map((poolName, index) =>
												<StakeSushiLpItem poolInfo={POOLS.SushiPools.Pools[poolName]} poolKey={poolName} key={index} />
											)}
										</CardBody>
									</Card>
								</div>
							</div>
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	)
}