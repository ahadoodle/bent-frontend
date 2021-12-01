import React from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { POOLS } from "constant";
import { StakeCurveLpItem } from "./item";
import { formatBigNumber, formatMillionsBigNumber, getSumBigNumbers } from "utils";
import { useCrvPoolEarns, useCrvTvls } from "hooks";

export const StakeCurveLpTable = (): React.ReactElement => {
	const tvls = useCrvTvls();
	const earns = useCrvPoolEarns();

	return (
		<Container>
			<Row>
				<Col md="12">
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
											<span className="small p-0">
												Earned (USD)&nbsp;
												<i className="fa fa-caret-down" aria-hidden="true" />
											</span><br />
											<b className="p-0">
												<span className="small">$</span>
												<span className="h5">{formatBigNumber(getSumBigNumbers(earns))}</span>
											</b>
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
											<span className="small">
												TVL&nbsp;
												<i className="fa fa-caret-down" aria-hidden="true" />
											</span><br />
											<b>
												<span className="small">$</span>
												<span className="h5">{formatMillionsBigNumber(getSumBigNumbers(tvls), 18, 0)}</span>
											</b>
										</Col>
									</Row>
									<Card>
										<CardBody>
											{
												Object.keys(POOLS.BentPools).map(poolName =>
													<StakeCurveLpItem
														poolInfo={POOLS.BentPools[poolName]}
														poolKey={poolName}
														key={poolName}
													/>)
											}
										</CardBody>
									</Card>

									{/* <tbody>
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
				</Col>
			</Row>
		</Container>
	)
}