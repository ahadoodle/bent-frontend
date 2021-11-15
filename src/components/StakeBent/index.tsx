import React, { useState } from "react";
import {
	Container, Button, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink,
	Card, CardTitle, CardText, Input, Label,
} from "reactstrap";
import classnames from "classnames";
import BentLogo from 'assets/images/token/BENT.png';

export const StakeBent = (): React.ReactElement => {
	const [activeTab, setActiveTab] = useState("1");
	const toggle = (tab) => {
		if (activeTab !== tab) setActiveTab(tab);
	};
	return (
		<Container>
			<Row>
				<Col md="12">
					<div className="convert-up">
						<h2 className="white">Stake your BENT (coming soon - you'll earn platform fees)</h2>
						<div className="convert-table">
							<div className="convert-tableTitle">
								<Row className="">
									<Col>
										<div className="tableTitle mt-1">
											<img src={BentLogo} alt="Icon" /> <b> BENT </b>
										</div>
									</Col>
									<Col>
										<div className="tableTitle">
											<p>Earned (USD value)</p>
											<div className="boldText">
												{" "}
												<b>
													<span>$</span>0
												</b>
											</div>
										</div>
									</Col>
									<Col>
										<div className="tableTitle">
											<p>APR</p>
											<div className="boldText">
												{" "}
												<b>
													60.56<span>%</span>
												</b>
											</div>
										</div>
									</Col>
									<Col>
										<div className="tableTitle">
											<p>My BENT Staked</p>
											<div className="boldText">
												<b>-</b>
											</div>
										</div>
									</Col>
									<Col>
										<div className="tableTitle">
											<p>TVL</p>
											<div className="boldText">
												<b>
													<span>$</span>220.70m
												</b>
											</div>
										</div>
									</Col>
								</Row>
							</div>

							<div className="converttabs">
								<Nav tabs>
									<NavItem>
										<NavLink
											className={classnames({ active: activeTab === "1" })}
											onClick={() => {
												toggle("1");
											}}
										>
											Stake
										</NavLink>
									</NavItem>
									<NavItem>
										<NavLink
											className={classnames({ active: activeTab === "2" })}
											onClick={() => {
												toggle("2");
											}}
										>
											Unstake
										</NavLink>
									</NavItem>
									<NavItem>
										<NavLink
											className={classnames({ active: activeTab === "3" })}
											onClick={() => {
												toggle("3");
											}}
										>
											Info
										</NavLink>
									</NavItem>
								</Nav>
								<TabContent activeTab={activeTab}>
									<TabPane tabId="1">
										<Row>
											<Col sm="6" className="inverse">
												<Card body>
													<CardText className="mt-0">
														Stake your BENT to additional rewards and earn a portion of the platforms
														revenue distributed as CRV, CVX and cvxCRV.
													</CardText>
												</Card>
											</Col>
											<Col sm="6" className="divider-left">
												<Card body>
													<div className="card-text mt-4">
														<div className="amount-crv">
															<p className="labeltext">
																<Label>
																	Amount of BENT to stake
																</Label>
																<Label>Available:-</Label>
															</p>
															<div className="amountinput">
																<Input type="text" placeholder="0" />
																<img src={BentLogo} alt="input-logo" className="inputlogo"/>
																<Button className="maxbtn">Max</Button>
															</div>
															<div className="btnouter">
																<p className="lineup"></p>
																<div className="btnwrapper">
																	<Button className="approvebtn" disabled={true}>
																		Approve
																	</Button>
																	<Button className="approvebtn" disabled={true}>
																		Convert BENT
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
					</div>
				</Col>
			</Row>
		</Container>
	)
}