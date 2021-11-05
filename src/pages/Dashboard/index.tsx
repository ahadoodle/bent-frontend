import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import {
  Container,
  Button,
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardTitle,
  CardText,
  Table,
  Input,
  Label,
} from "reactstrap";
import classnames from "classnames";
import CrvIcon from "assets/images/crvIcon.png";
import BitCoin from "assets/images/bitCoin.png";
import UsdIcon from "assets/images/usdIcon.png";
import EthereumIcon from "assets/images/EthereumIcon.png";
import CvxIcon from "assets/images/cvxIcon.png";
import BitcoinCombo from "assets/images/bitCoinCombo.png";
import SolIcon from "assets/images/SolIcon.png";
import BitcoinTwice from "assets/images/bitCoinTwice.png";
import Tiles from "components/DashboardMetrics/tiles";
import "font-awesome/css/font-awesome.min.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <React.Fragment>
      {/* Content part Start*/}
      <div className="banner">
        <Tiles />
      </div>

      <div className="contentSection">
        <Container>
          <Row>
            <Col md="12">
              <div className="convert-up">
                <h2 className="white">Convert CRV</h2>
                <div className="convert-table">
                  <div className="convert-tableTitle">
                    <Row className="">
                      <Col>
                        <div className="tableTitle">
                          <img src={CrvIcon} alt="Icon" /> <b> CRV </b>
                        </div>
                      </Col>
                      <Col>
                        <div className="tableTitle">
                          <p>Earned (USD value)</p>
                          <div className="boldText">
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
                            <b>
                              60.56<span>%</span>
                            </b>
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div className="tableTitle">
                          <p>My cvxCRV Staked</p>
                          <div className="boldText">
                            <b>-cvxCRV</b>
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
                          Convert
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
                          <Col md="6" className="inverse">
                            <Card body>
                              <CardText>
                                Convert CRV to cvxCRV. By staking cvxCRV, you're
                                earning the usual rewards from veCRV (3crv
                                governani fae distribution from Curve+am
                                airdrop), plus a share of 10% of the Convex LPs
                                boosted CRV earnings and CVX tokens on top of
                                that.{" "}
                              </CardText>
                            </Card>
                            <CardText>
                              {" "}
                              <i>
                                Important: Converting CRV to cvCRV is
                                ineversible. You may stake and unstake cviCRV
                                tokens but not convert them back to CRV
                                Secondary markets may however exist to allow the
                                exchange of eviCRV for CRV{" "}
                              </i>
                            </CardText>
                          </Col>
                          <Col md="6" className="divider-left">
                            <Card body>
                              <CardTitle>
                                <div className="advance-btn">
                                  <Label className="switch">
                                    <Input type="checkbox" />
                                    <span className="slider"></span>
                                  </Label>
                                  <span className="textadvance">Advanced</span>
                                </div>
                              </CardTitle>
                              <div className="card-text mt-4">
                                <div className="amount-crv">
                                  <p className="labeltext">
                                    <Label>
                                      Amount of CRV to convert and stake
                                    </Label>
                                    <Label>Available:-</Label>
                                  </p>
                                  <div className="amutinput">
                                    <Input type="text" placeholder="0" />
                                    <Button className="maxbtn">Max</Button>
                                  </div>
                                  <div className="btnouter">
                                    <p className="lineup"></p>
                                    <div className="btnwrapper">
                                      <Button className="approvebtn">
                                        Approve
                                      </Button>
                                      <Button className="approvebtn">
                                        Convert Stake
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
                              <CardText></CardText>
                              <Button>Go somewhere</Button>
                            </Card>
                          </Col>
                          <Col sm="6">
                            <Card body>
                              <CardTitle>Special Title Treatment</CardTitle>
                              <CardText>
                                With supporting text below as a natural lead-in
                                to additional content.
                              </CardText>
                              <Button>Go somewhere</Button>
                            </Card>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="3">
                        <Row>
                          <Col sm="12">
                            <Card body>
                              <div className="infoWrap card-text mt-4">
                                <p>
                                  CRV token address:{" "}
                                  <Link to="/stake">
                                    0xd533a949740bb3306d119cc777fa900ba034cd52
                                  </Link>
                                </p>
                                <p>
                                  cvxCRV token address:{" "}
                                  <Link to="/stake">
                                    0xd533a949740bb3306d119cc777fa900ba034cd52
                                  </Link>
                                </p>
                                <p>
                                  Deposit contract address:{" "}
                                  <Link to="/stake">
                                    0xd533a949740bb3306d119cc777fa900ba034cd52
                                  </Link>
                                </p>
                                <p>
                                  Rewards contract address:{" "}
                                  <Link to="/stake">
                                    0xd533a949740bb3306d119cc777fa900ba034cd52
                                  </Link>
                                </p>
                              </div>
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
        <div className="stakebent-token">
          <Container>
            <Row>
              <Col md="12">
                <div className="convert-up">
                  <h2 className="black">Stake Bent LP Tokens</h2>
                  <div className="table-Responsive LpToken">
                    <div className="table-Wrapper">
                      <Table className="tokentable">
                        <thead>
                          <tr>
                            <th>
                              Pool Name{" "}
                              <i
                                className="fa fa-caret-down"
                                aria-hidden="true"
                              ></i>
                            </th>
                            <th>
                              Earned (USD){" "}
                              <i
                                className="fa fa-caret-down"
                                aria-hidden="true"
                              ></i>
                            </th>
                            <th>
                              APR{" "}
                              <i
                                className="fa fa-caret-down"
                                aria-hidden="true"
                              ></i>
                            </th>
                            <th>
                              Deposits{" "}
                              <i
                                className="fa fa-caret-down"
                                aria-hidden="true"
                              ></i>
                            </th>
                            <th>
                              TVL{" "}
                              <i
                                className="fa fa-caret-down"
                                aria-hidden="true"
                              ></i>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <img src={BitCoin} alt="" /> Bitcoin
                            </td>
                            <td>
                              <span>$</span>0
                            </td>
                            <td>
                              6.56% <span>(proj.6.74%)</span>
                              <p>CRV boost: 1.7x</p>
                              <i
                                className="fa fa-info-circle"
                                aria-hidden="true"
                              ></i>
                            </td>
                            <td>-cCRV</td>
                            <td className="tvlText">
                              <span>$</span>220.70m
                              <i
                                className="fa fa-caret-down"
                                aria-hidden="true"
                              ></i>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <img src={UsdIcon} alt="" /> Bitcoin
                            </td>
                            <td>
                              <span>$</span>0
                            </td>
                            <td className="tvlText">
                              6.56% <span>(proj.6.74%)</span>
                              <p>CRV boost: 1.7x</p>
                              <i
                                className="fa fa-info-circle"
                                aria-hidden="true"
                              ></i>
                            </td>
                            <td>-cCRV</td>
                            <td className="tvlText">
                              <span>$</span>220.70m
                              <i
                                className="fa fa-caret-down"
                                aria-hidden="true"
                              ></i>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <img src={EthereumIcon} alt="" /> Ethereum
                            </td>
                            <td>
                              <span>$</span>0
                            </td>
                            <td>
                              6.56% <span>(proj.6.74%)</span>
                              <p>CRV boost: 1.7x</p>
                              <i
                                className="fa fa-info-circle"
                                aria-hidden="true"
                              ></i>
                            </td>
                            <td>-cCRV</td>
                            <td className="tvlText">
                              <span>$</span>220.70m
                              <i
                                className="fa fa-caret-down"
                                aria-hidden="true"
                              ></i>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <img src={BitCoin} alt="" /> Bitcoin
                            </td>
                            <td>
                              <span>$</span>0
                            </td>
                            <td>
                              6.56% <span>(proj.6.74%)</span>
                              <p>CRV boost: 1.7x</p>
                              <i
                                className="fa fa-info-circle"
                                aria-hidden="true"
                              ></i>
                            </td>
                            <td>-cCRV</td>
                            <td className="tvlText">
                              <span>$</span>220.70m
                              <i
                                className="fa fa-caret-down"
                                aria-hidden="true"
                              ></i>
                            </td>
                          </tr>
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
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Container>
          <div className="convert-up cvxSection">
            <h2 className="black">Stake your CVX to earn cvxCRV</h2>
            <div className="convert-table">
              <div className="convert-tableTitle">
                <Row className="">
                  <Col>
                    <div className="tableTitle">
                      <img src={CvxIcon} alt="Icon" /> <b> CVX </b>
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
                      <p>My cvxCRV Staked</p>
                      <div className="boldText">
                        <b>-cvxCRV</b>
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
                      Convert
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
                          <CardText>
                            Stake CVX on Convex to earn a portion of the
                            platform's revenue, distributed as cvxCRV token.{" "}
                          </CardText>
                        </Card>
                        <CardText>
                          {" "}
                          <i>
                            Note you can also lock CVX to earn a higher portion
                            of the platform's revenue and be able to vote on the
                            platform's periodic decisions
                          </i>
                        </CardText>
                      </Col>
                      <Col sm="6" className="divider-left">
                        <Card body>
                          <div className="card-text mt-4">
                            <div className="amount-crv">
                              <p className="labeltext">
                                <Label>
                                  Amount of CRV to convert and stake
                                </Label>
                                <Label>Available:-</Label>
                              </p>
                              <div className="amutinput">
                                <Input type="text" placeholder="0" />
                                <Button className="maxbtn">Max</Button>
                              </div>
                              <div className="btnouter">
                                <p className="lineup"></p>
                                <div className="btnwrapper">
                                  <Button className="approvebtn">
                                    Approve
                                  </Button>
                                  <Button className="approvebtn">
                                    Convert Stake
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
        </Container>

        <div className="stakebent-token">
          <Container>
            <Row>
              <Col md="12">
                <div className="convert-up">
                  <h2 className="black">Provide liquidity on SushiSwap</h2>
                  <div className="table-Responsive">
                    <div className="table-Wrapper">
                      <Table className="tokentable">
                        <thead>
                          <tr>
                            <th>Pool Name </th>
                            <th>Earned (USD) </th>
                            <th>APR </th>
                            <th>My Staked Balances </th>
                            <th>TVL </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <img src={BitcoinTwice} alt="" /> BTC/ETH
                            </td>
                            <td>
                              <span>$</span>0
                            </td>
                            <td>
                              6.56% <span>(proj.6.74%)</span>
                              <p>CRV boost: 1.7x</p>
                            </td>
                            <td>-cCRV</td>
                            <td>
                              <span>$</span>220.70m
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <img src={SolIcon} alt="" /> SOL/USDT
                            </td>
                            <td>
                              <span>$</span>0
                            </td>
                            <td>
                              6.56% <span>(proj.6.74%)</span>
                              <p>CRV boost: 1.7x</p>
                            </td>
                            <td>-cCRV</td>
                            <td>
                              <span>$</span>220.70m
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <img src={BitcoinCombo} alt="" /> LUNA/BTC
                            </td>
                            <td>
                              <span>$</span>0
                            </td>
                            <td>
                              6.56% <span>(proj.6.74%)</span>
                              <p>CRV boost: 1.7x</p>
                            </td>
                            <td>-cCRV</td>
                            <td>
                              <span>$</span>220.70m
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Dashboard);
