import React, { useState } from "react";
import {
	Container, Button, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink,
	Card, CardTitle, CardText, Input, Label, CardBody,
} from "reactstrap";
import classnames from "classnames";
import { TOKENS, TOKEN_LOGO } from "constant";
import { getRewardTokenKeys } from "utils";

export const StakeBent = (): React.ReactElement => {
	const [activeTab, setActiveTab] = useState("1");
	const toggle = (tab) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	const rewardsTokenKeys = getRewardTokenKeys();

	return (
		<Container className="stake-bent">
			<Row>
				<Col md="12">
					<div className="convert-up">
						<h2 className="white section-header">
							Stake your BENT
						</h2>
						<div className="toggleWrap tokentable table">
							<Row className="align-items-center thead p-0 pt-2 pb-2">
								<Col>
									<div className="imgText">
										<img src={TOKEN_LOGO.BENT} alt="" width="28" />
										<h2>BENT</h2>
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
									<div className="tableTitle">
										<p>TVL</p>
										<div className="boldText">
											<b>
												<span className="small">$</span>0
											</b>
										</div>
									</div>
								</Col>
							</Row>
							<Card>
								<CardBody>
									<div className="innerAccordian">
										<div className="converttabs">
											<Nav tabs>
												<NavItem>
													<NavLink
														className={classnames({ active: activeTab === "1" })}
														onClick={() => toggle("1")}
													>Stake</NavLink>
												</NavItem>
												<NavItem>
													<NavLink
														className={classnames({ active: activeTab === "2" })}
														onClick={() => toggle("2")}
														disabled={true}
													>Unstake</NavLink>
												</NavItem>
												<NavItem>
													<NavLink
														className={classnames({ active: activeTab === "3" })}
														onClick={() => toggle("3")}
														disabled={true}
													>Info</NavLink>
												</NavItem>
											</Nav>
											<TabContent activeTab={activeTab}>
												<TabPane tabId="1">
													<Row>
														<Col sm="6" className="inverse">
															<Card body>
																<CardText className="mt-0">
																	Stake your <b>BENT</b> to earn a portion of the platforms revenue in:
																</CardText>
																<div className="bent-rewards-container">
																	{rewardsTokenKeys.map(key =>
																		<div className="imgText bent-rewards-item" key={key}>
																			<img src={TOKENS[key].LOGO} alt="Icon" width="28" />
																			<h4>{key}</h4>
																		</div>
																	)}
																</div>
															</Card>
														</Col>
														<Col sm="6" className="divider-left">
															<Card body>
																<div className="card-text">
																	<div className="amount-crv">
																		<p className="labeltext">
																			<Label>
																				Amount of BENT to stake
																			</Label>
																			<Label>Available:-</Label>
																		</p>
																		<div className="amountinput">
																			<Input type="text" placeholder="0" disabled={true} />
																			<img src={TOKEN_LOGO.BENT} alt="input-logo" className="inputlogo" />
																			<Button className="maxbtn" disabled={true} >Max</Button>
																		</div>
																		<div className="btnouter">
																			<p className="lineup"></p>
																			<div className="btnwrapper">
																				<Button className="approvebtn" disabled={true}>
																					Approve
																				</Button>
																				<Button className="approvebtn" disabled={true}>
																					Stake BENT
																				</Button>
																			</div>
																		</div>
																	</div>
																</div>
															</Card>
														</Col>
													</Row>
												</TabPane>
												<TabPane tabId="2">
													<Row>
														<Col sm="6">
															<Card body>
																<CardTitle>Special Title Treatment</CardTitle>
																<CardText>
																	With supporting text below as a natural lead-in to
																	additional content.
																</CardText>
																<Button>Go somewhere</Button>
															</Card>
														</Col>
														<Col sm="6">
															<Card body>
																<CardTitle>Special Title Treatment</CardTitle>
																<CardText>
																	With supporting text below as a natural lead-in to
																	additional content.
																</CardText>
																<Button>Go somewhere</Button>
															</Card>
														</Col>
													</Row>
												</TabPane>
												<TabPane tabId="3">
													<Row>
														<Col sm="6">
															<Card body>
																<CardTitle>Special Title Treatment</CardTitle>
																<CardText>
																	With supporting text below as a natural lead-in to
																	additional content.
																</CardText>
																<Button>Go somewhere</Button>
															</Card>
														</Col>
														<Col sm="6">
															<Card body>
																<CardTitle>Special Title Treatment</CardTitle>
																<CardText>
																	With supporting text below as a natural lead-in to
																	additional content.
																</CardText>
																<Button>Go somewhere</Button>
															</Card>
														</Col>
													</Row>
												</TabPane>
											</TabContent>
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