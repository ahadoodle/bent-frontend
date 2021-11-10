import React from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { POOLS } from "constant";
import { StakeCurveLpItem } from "./item";

export const StakeCurveLpTable = () => {
	return (
		<div className="convert-up">
			<h2 className="black">Stake Curve LP Tokens</h2>
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
							<Col>
								APR{" "}
								<i
									className="fa fa-caret-down"
									aria-hidden="true"
								></i>
							</Col>
							<Col>
								Deposits{" "}
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
								{ Object.keys(POOLS.BentPools).map(poolName =>
									<StakeCurveLpItem poolInfo={POOLS.BentPools[poolName]} poolKey={poolName} />)
								}
							</CardBody>
						</Card>
								
						{/* <tbody>
							{ Object.keys(POOLS.BentPools).map(poolName => <StakeCurveLpItem poolInfo={POOLS.BentPools[poolName]}/>)}
							<tr>
								<td colSpan={5}>
									<div className="text-center btnwrap">
										<button className="btn btnshow">
											Show all Bent pools{" "}
											<i
												className="fa fa-caret-down"
												aria-hidden="true"
											></i>
										</button>
									</div>
								</td>
							</tr>
						</tbody> */}
					</div>
				</div>
			</div>
		</div>
	)
}