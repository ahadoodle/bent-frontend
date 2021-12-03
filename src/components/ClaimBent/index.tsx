import React from "react";
import {
	Container, Button, Row, Col, Card, CardText, CardBody,
} from "reactstrap";
import { TOKENS, TOKEN_LOGO } from "constant";
import { getRewardTokenKeys } from "utils";

export const ClaimBent = (): React.ReactElement => {
	const rewardsTokenKeys = getRewardTokenKeys();

	return (
		<Container className="stake-bent claim">
			<Row>
				<Col md="12">
					<div className="convert-up">
						<h2 className="white section-header">
							Claim Earnings
						</h2>
						<div className="toggleWrap tokentable table">
							<Row className="align-items-center thead p-0 pt-2 pb-2">
								<Col>
									<div className="imgText">
										<img src={TOKEN_LOGO.BENT} alt="" width="28" />
										<h2>Staked BENT</h2>
									</div>
								</Col>
								<Col>
									<div className="tableTitle">
										<p>Total Earned (USD)</p>
										<div className="boldText">
											{" "}
											<b>
												<span className="small">$</span>0
											</b>
										</div>
									</div>
								</Col>
								<Col>
									<div className="tableTitle">
										<p>Average APR</p>
										<div className="boldText">
											<b>
												0<span className="small">%</span>
											</b>
										</div>
									</div>
								</Col>
								<Col>
									<div className="tableTitle">
										<p>My Staked BENT (--)</p>
										<div className="boldText">
											<span className="small">$</span><b>0</b>
										</div>
									</div>
								</Col>
								<Col>
									<Button className="claimbtn">Claim</Button>
								</Col>
							</Row>
							<Card>
								<CardBody>
									<div className="innerAccordian">
										<div className="converttabs">
											<Row>
												<Col sm="6">
													<CardText className="mt-0">
														<span className="small">Breakdown of claimable earnings:</span>
													</CardText>
													<div className="bent-rewards-container">
														{rewardsTokenKeys.map(key =>
															<div className="imgText bent-rewards-item" key={key}>
																<img src={TOKENS[key].LOGO} alt="Icon" width="28" />
																<h4>{key}</h4>
															</div>
														)}
													</div>
												</Col>
											</Row>
										</div>
									</div>
								</CardBody>
							</Card>
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	)
}