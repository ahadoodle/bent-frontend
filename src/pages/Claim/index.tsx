import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Container,
  Button,
  Row,
  Col,
  Card,
  Input,
  Label,
  CardBody,
  UncontrolledCollapse,
} from "reactstrap";
import BannerBlocks from "components/BannerBlocks";
import podsIcon from "assets/images/airPods.png";
import starIcon from "assets/images/starIcon.png";
import starActive from "assets/images/starActive.png";
import CrvIcon from "assets/images/token/CRV.png";
import BitCoin from "assets/images/token/BTC.png";
import UsdIcon from "assets/images/token/USDT.png";
import EthereumIcon from "assets/images/token/ETH.png";
import chainIcon from "assets/images/token/LINK.png";
import busdIcon from "assets/images/token/BUSD.png";
import sushiIcon from "assets/images/token/SUSHI.png";
import "font-awesome/css/font-awesome.min.css";

const Claim = () => {
  const [autoClaimStatus, setAutoClaimStatus] = useState(false);
  const [autoText, setAutoText] = useState(0);
  const [stakeStatus, setStakeStatus] = useState("none");
  const handleStakeStus = (value) => {
    setStakeStatus(value);
  };
  const handleAutoActiveStatus = async (e) => {
    console.log("value", e.target.value);
    const { value } = e.target;
    console.log("value", value);
    if (value === 0) {
      setAutoClaimStatus(true);
      setAutoText(1);
    } else {
      setAutoClaimStatus(false);
      setAutoText(0);
    }
  };
  return (
    <React.Fragment>
      <div className="banner">
        <div className="bannerboxes">
          <BannerBlocks />
          <div className="autoText">
            <div className="advance-btn">
              <Label className="switch">
                <Input
                  type="checkbox"
                  value={autoText}
                  name="checkbox"
                  onChange={handleAutoActiveStatus}
                />
                <span className="slider"></span>
              </Label>
              <span className="textadvance">
                Auto claim all positions & stake
              </span>
            </div>
          </div>
          {autoClaimStatus === true ? (
            <div className="aproveCheckbox">
              <Container>
                <Row>
                  <Col md="12">
                    <h2>When claiming also stake:</h2>
                  </Col>
                  <Col lg="6">
                    <div className="numberCheck">
                      <Label className="contain">
                        <Input
                          type="radio"
                          onChange={() => handleStakeStus("none")}
                          checked={stakeStatus === "none"}
                          name="radio"
                        />
                        <span className="checkmark"></span>
                        <span className="checkText">None</span>
                      </Label>
                      <Label className="contain">
                        <Input
                          type="radio"
                          onChange={() => handleStakeStus("crv")}
                          checked={stakeStatus === "crv"}
                          name="radio"
                        />
                        <span className="checkmark"></span>
                        <span className="checkText">CRV</span>
                      </Label>
                      <Label className="contain">
                        CVX
                        <Input
                          type="radio"
                          onChange={() => handleStakeStus("cvx")}
                          checked={stakeStatus === "cvx"}
                          name="radio"
                        />
                        <span className="checkmark"></span>
                        <span className="checkText">CVX</span>
                      </Label>
                      <Label className="contain">
                        <Input
                          type="radio"
                          onChange={() => handleStakeStus("both")}
                          checked={stakeStatus === "both"}
                          name="radio"
                        />
                        <span className="checkmark"></span>
                        <span className="checkText">CRV & CVX</span>
                      </Label>
                    </div>
                    <div className="bannerBtns">
                      <p>
                        <span className="count">1</span>
                        <Button className="greyBtn">Approve</Button>
                      </p>
                      <p>
                        <span className="count">2</span>
                        <Button className="greyBtn">Convert Stake</Button>
                      </p>
                      <p>
                        <span className="count">3</span>
                        <Button className="greyBtn">
                          Claim All & Convert CRV & Stake CVX
                        </Button>
                      </p>
                    </div>
                  </Col>
                  <Col lg="6">
                    <div className="thisDo">
                      <h3>What can this do?</h3>
                      <ul>
                        <li>
                          Claim all rewards from the selected staking contracts
                        </li>
                        <li>Convert the cliamed CRV to cvxCRV</li>
                        <li>Stake the converted cvxCRV</li>
                        <li>Stake the claimed CVX</li>
                      </ul>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="claimText">
        <Container>
          <div className="cliamBox">
            <h2 className="white">Claim Earnings</h2>
            <div className="cliamBlockOne">
              <div className="table-Responsive">
                <div className="table-Wrapper">
                  <div className="toggleWrap">
                    <Button
                      className="bentPool"
                      color="primary"
                      id="toggler"
                      style={{ marginBottom: "1rem" }}
                    >
                      <Row className="align-items-center">
                        <Col>
                          <div className="imgText">
                            <img src={CrvIcon} alt="" />
                            <h2>Bent Pool</h2>
                          </div>
                        </Col>
                        <Col>
                          <div className="earnValue">
                            <p>Earned (USD value)</p>
                            <b>
                              <span>$</span>0
                            </b>
                            <i
                              className="fa fa-caret-down"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </Col>
                        <Col>
                          <div className="earnValue">
                            <p>Average APR</p>
                            <b>
                              -<span>%</span>
                            </b>
                          </div>
                        </Col>
                        <Col>
                          <h3>Deposits</h3>
                        </Col>
                        <Col>
                          <div className="clmBtn">
                            <Button className="claimbtn">Claim All</Button>
                            <i
                              className="fa fa-caret-down"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </Col>
                      </Row>
                    </Button>

                    <UncontrolledCollapse
                      toggler="#toggler"
                      className="bentpoolText"
                    >
                      <Card>
                        <CardBody>
                          <div className="innerWrapother">
                            <div className="bentInnertext" color="primary">
                              <Row className="align-items-center">
                                <Col>
                                  <div className="imgText">
                                    <img src={BitCoin} alt="" />
                                    <h4>Bitcoin</h4>
                                  </div>
                                </Col>
                                <Col>
                                  <b>
                                    <span>$</span>0
                                  </b>
                                </Col>
                                <Col>
                                  <div className="earnValue">
                                    <b>
                                      6.56% <span>(proj.6.74%)</span>
                                    </b>
                                    <p>CRV boost: 1.7x</p>
                                  </div>
                                </Col>
                                <Col>
                                  <div className="depositText">-cCRV</div>
                                </Col>
                                <Col> </Col>
                              </Row>
                            </div>
                          </div>

                          <div className="innerWrap">
                            <Button
                              className="bentInner"
                              color="primary"
                              id="togglerInner"
                              style={{ marginBottom: "1rem" }}
                            >
                              <Row className="align-items-center">
                                <Col>
                                  <div className="imgText">
                                    <img src={UsdIcon} alt="" />
                                    <h4>Bitcoin</h4>
                                  </div>
                                </Col>
                                <Col>
                                  <b>
                                    <span>$</span>0
                                  </b>
                                </Col>
                                <Col>
                                  <div className="earnValue">
                                    <b>
                                      6.56% <span>(proj.6.74%)</span>
                                    </b>
                                    <p>CRV boost: 1.7x</p>
                                    <i
                                      className="fa fa-info-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                </Col>
                                <Col>
                                  <div className="depositText">-cCRV</div>
                                </Col>
                                <Col>
                                  <div className="climBtn">
                                    <Button className="claimbtn">Claim </Button>
                                    <i
                                      className="fa fa-caret-down"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                </Col>
                              </Row>
                            </Button>
                            <UncontrolledCollapse
                              className="innerAccordian"
                              toggler="#togglerInner"
                            >
                              <Card>
                                <CardBody>
                                  <Row className="align-items-center">
                                    <Col sm={12}>
                                      <p>Breakdown of claimable earnings:</p>
                                    </Col>
                                  </Row>
                                  <Row className="align-items-center">
                                    <Col>
                                      <div className="imgText">
                                        <img src={chainIcon} alt="" />
                                        <h4>Chainlink</h4>
                                      </div>
                                    </Col>
                                    <Col>
                                      <b>
                                        <span>$</span>0
                                      </b>
                                    </Col>
                                    <Col> </Col>
                                    <Col> </Col>
                                    <Col> </Col>
                                  </Row>
                                </CardBody>
                              </Card>
                            </UncontrolledCollapse>
                          </div>
                        </CardBody>
                      </Card>
                      <div className="innerWrapother">
                        <div className="bentInnertext" color="primary">
                          <Row className="align-items-center">
                            <Col>
                              <div className="imgText">
                                <img src={EthereumIcon} alt="" />
                                <h4>Ethereum hello</h4>
                              </div>
                            </Col>
                            <Col>
                              <b>
                                <span>$</span>0
                              </b>
                            </Col>
                            <Col>
                              <div className="earnValue">
                                <b>
                                  6.56% <span>(proj.6.74%)</span>
                                </b>
                                <p>CRV boost: 1.7x</p>
                              </div>
                            </Col>
                            <Col>
                              <div className="depositText">-cCRV</div>
                            </Col>
                            <Col> </Col>
                          </Row>
                        </div>
                      </div>
                      <div className="innerWrapother">
                        <div className="bentInnertext" color="primary">
                          <Row className="align-items-center">
                            <Col>
                              <div className="imgText">
                                <img src={busdIcon} alt="" />
                                <h4>BUSD</h4>
                              </div>
                            </Col>
                            <Col>
                              <b>
                                <span>$</span>0
                              </b>
                            </Col>
                            <Col>
                              <div className="earnValue">
                                <b>
                                  6.56% <span>(proj.6.74%)</span>
                                </b>
                                <p>CRV boost: 1.7x</p>
                              </div>
                            </Col>
                            <Col>
                              <div className="depositText">-cCRV</div>
                            </Col>
                            <Col> </Col>
                          </Row>
                        </div>
                      </div>
                      <div className="innerWrapother">
                        <div className="bentInnertext" color="primary">
                          <Row className="align-items-center">
                            <Col>
                              <div className="imgText">
                                <img src={chainIcon} alt="" />
                                <h4>Chainlink</h4>
                              </div>
                            </Col>
                            <Col>
                              <b>
                                <span>$</span>0
                              </b>
                            </Col>
                            <Col>
                              <div className="earnValue">
                                <b>
                                  6.56% <span>(proj.6.74%)</span>
                                </b>
                                <p>CRV boost: 1.7x</p>
                              </div>
                            </Col>
                            <Col>
                              <div className="depositText">-cCRV</div>
                            </Col>
                            <Col> </Col>
                          </Row>
                        </div>
                      </div>
                    </UncontrolledCollapse>
                  </div>
                </div>
              </div>
            </div>

            {/* Second BLock Start */}
            <div className="cliamBlockOne">
              <div className="table-Responsive">
                <div className="table-Wrapper">
                  <div className="toggleWrap">
                    <Button
                      className="bentPool"
                      color="primary"
                      id="togglerSecond"
                      style={{ marginBottom: "1rem" }}
                    >
                      <Row className="align-items-center">
                        <Col>
                          <div className="imgText">
                            <img src={CrvIcon} alt="" />
                            <h2>Staked cvxCRV</h2>
                          </div>
                        </Col>
                        <Col>
                          <div className="earnValue">
                            <p>Earned (USD value)</p>
                            <b>
                              <span>$</span>0
                            </b>
                            <i
                              className="fa fa-caret-down"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </Col>
                        <Col>
                          <div className="earnValue">
                            <p>Average APR</p>
                            <b>
                              66.8<span>%</span>
                            </b>
                          </div>
                        </Col>
                        <Col>
                          <h3>Deposits</h3>
                        </Col>
                        <Col>
                          <div className="clmBtn">
                            <Button className="claimbtn">Claim All</Button>
                            <i
                              className="fa fa-caret-down"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </Col>
                      </Row>
                    </Button>

                    <UncontrolledCollapse
                      toggler="#togglerSecond"
                      className="bentpoolText"
                    >
                      <Card>
                        <CardBody>
                          <div className="innerWrapother">
                            <div className="bentInnertext" color="primary">
                              <Row className="align-items-center">
                                <Col>
                                  <div className="imgText">
                                    <img src={BitCoin} alt="" />
                                    <h4>Bitcoin</h4>
                                  </div>
                                </Col>
                                <Col>
                                  <b>
                                    <span>$</span>0
                                  </b>
                                </Col>
                                <Col>
                                  <div className="earnValue">
                                    <b>
                                      6.56% <span>(proj.6.74%)</span>
                                    </b>
                                    <p>CRV boost: 1.7x</p>
                                  </div>
                                </Col>
                                <Col>
                                  <div className="depositText">-cCRV</div>
                                </Col>
                                <Col> </Col>
                              </Row>
                            </div>
                          </div>

                          <div className="innerWrap">
                            <Button
                              className="bentInner"
                              color="primary"
                              id="togglerInner"
                              style={{ marginBottom: "1rem" }}
                            >
                              <Row className="align-items-center">
                                <Col>
                                  <div className="imgText">
                                    <img src={UsdIcon} alt="" />
                                    <h4>Bitcoin</h4>
                                  </div>
                                </Col>
                                <Col>
                                  <b>
                                    <span>$</span>0
                                  </b>
                                </Col>
                                <Col>
                                  <div className="earnValue">
                                    <b>
                                      6.56% <span>(proj.6.74%)</span>
                                    </b>
                                    <p>CRV boost: 1.7x</p>
                                    <i
                                      className="fa fa-info-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                </Col>
                                <Col>
                                  <div className="depositText">-cCRV</div>
                                </Col>
                                <Col>
                                  <div className="climBtn">
                                    <Button className="claimbtn">Claim </Button>
                                    <i
                                      className="fa fa-caret-down"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                </Col>
                              </Row>
                            </Button>
                            <UncontrolledCollapse
                              className="innerAccordian"
                              toggler="#togglerInner"
                            >
                              <Card>
                                <CardBody>
                                  <Row className="align-items-center">
                                    <Col sm={12}>
                                      <p>Breakdown of claimable earnings:</p>
                                    </Col>
                                  </Row>
                                  <Row className="align-items-center">
                                    <Col>
                                      <div className="imgText">
                                        <img src={chainIcon} alt="" />
                                        <h4>Chainlink</h4>
                                      </div>
                                    </Col>
                                    <Col>
                                      <b>
                                        <span>$</span>0
                                      </b>
                                    </Col>
                                    <Col> </Col>
                                    <Col> </Col>
                                    <Col> </Col>
                                  </Row>
                                </CardBody>
                              </Card>
                            </UncontrolledCollapse>
                          </div>
                        </CardBody>
                      </Card>
                      <div className="innerWrapother">
                        <div className="bentInnertext" color="primary">
                          <Row className="align-items-center">
                            <Col>
                              <div className="imgText">
                                <img src={EthereumIcon} alt="" />
                                <h4>Ethereum</h4>
                              </div>
                            </Col>
                            <Col>
                              <b>
                                <span>$</span>0
                              </b>
                            </Col>
                            <Col>
                              <div className="earnValue">
                                <b>
                                  6.56% <span>(proj.6.74%)</span>
                                </b>
                                <p>CRV boost: 1.7x</p>
                              </div>
                            </Col>
                            <Col>
                              <div className="depositText">-cCRV</div>
                            </Col>
                            <Col> </Col>
                          </Row>
                        </div>
                      </div>
                      <div className="innerWrapother">
                        <div className="bentInnertext" color="primary">
                          <Row className="align-items-center">
                            <Col>
                              <div className="imgText">
                                <img src={busdIcon} alt="" />
                                <h4>BUSD</h4>
                              </div>
                            </Col>
                            <Col>
                              <b>
                                <span>$</span>0
                              </b>
                            </Col>
                            <Col>
                              <div className="earnValue">
                                <b>
                                  6.56% <span>(proj.6.74%)</span>
                                </b>
                                <p>CRV boost: 1.7x</p>
                              </div>
                            </Col>
                            <Col>
                              <div className="depositText">-cCRV</div>
                            </Col>
                            <Col> </Col>
                          </Row>
                        </div>
                      </div>
                      <div className="innerWrapother">
                        <div className="bentInnertext" color="primary">
                          <Row className="align-items-center">
                            <Col>
                              <div className="imgText">
                                <img src={chainIcon} alt="" />
                                <h4>Chainlink</h4>
                              </div>
                            </Col>
                            <Col>
                              <b>
                                <span>$</span>0
                              </b>
                            </Col>
                            <Col>
                              <div className="earnValue">
                                <b>
                                  6.56% <span>(proj.6.74%)</span>
                                </b>
                                <p>CRV boost: 1.7x</p>
                              </div>
                            </Col>
                            <Col>
                              <div className="depositText">-cCRV</div>
                            </Col>
                            <Col> </Col>
                          </Row>
                        </div>
                      </div>
                    </UncontrolledCollapse>
                  </div>
                </div>
              </div>
            </div>
            {/* Second BLock  End*/}
            {/* Third BLock  Start*/}
            <div className="cliamBlockOne">
              <div className="table-Responsive">
                <div className="table-Wrapper">
                  <div className="toggleWrap">
                    <Button
                      className="bentPool"
                      color="primary"
                      id="togglerThird"
                      style={{ marginBottom: "1rem" }}
                    >
                      <Row className="align-items-center">
                        <Col>
                          <div className="imgText">
                            <img src={CrvIcon} alt="" />
                            <h2>Staked CVX</h2>
                          </div>
                        </Col>
                        <Col>
                          <div className="earnValue">
                            <p>Earned (USD value)</p>
                            <b>
                              <span>$</span>0
                            </b>
                            <i
                              className="fa fa-caret-down"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </Col>
                        <Col>
                          <div className="earnValue">
                            <p>Average APR</p>
                            <b>
                              7.88<span>%</span>
                            </b>
                          </div>
                        </Col>
                        <Col>
                          <h3>Deposits</h3>
                        </Col>
                        <Col>
                          <div className="clmBtn">
                            <Button className="claimbtn">Claim All</Button>
                            <i
                              className="fa fa-caret-down"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </Col>
                      </Row>
                    </Button>

                    <UncontrolledCollapse
                      toggler="#togglerThird"
                      className="bentpoolText"
                    >
                      <Card>
                        <CardBody>
                          <div className="innerWrapother">
                            <div className="bentInnertext" color="primary">
                              <Row className="align-items-center">
                                <Col>
                                  <div className="imgText">
                                    <img src={BitCoin} alt="" />
                                    <h4>Bitcoin</h4>
                                  </div>
                                </Col>
                                <Col>
                                  <b>
                                    <span>$</span>0
                                  </b>
                                </Col>
                                <Col>
                                  <div className="earnValue">
                                    <b>
                                      6.56% <span>(proj.6.74%)</span>
                                    </b>
                                    <p>CRV boost: 1.7x</p>
                                  </div>
                                </Col>
                                <Col>
                                  <div className="depositText">-cCRV</div>
                                </Col>
                                <Col> </Col>
                              </Row>
                            </div>
                          </div>

                          <div className="innerWrap">
                            <Button
                              className="bentInner"
                              color="primary"
                              id="togglerInner"
                              style={{ marginBottom: "1rem" }}
                            >
                              <Row className="align-items-center">
                                <Col>
                                  <div className="imgText">
                                    <img src={UsdIcon} alt="" />
                                    <h4>Bitcoin</h4>
                                  </div>
                                </Col>
                                <Col>
                                  <b>
                                    <span>$</span>0
                                  </b>
                                </Col>
                                <Col>
                                  <div className="earnValue">
                                    <b>
                                      6.56% <span>(proj.6.74%)</span>
                                    </b>
                                    <p>CRV boost: 1.7x</p>
                                    <i
                                      className="fa fa-info-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                </Col>
                                <Col>
                                  <div className="depositText">-cCRV</div>
                                </Col>
                                <Col>
                                  <div className="climBtn">
                                    <Button className="claimbtn">Claim </Button>
                                    <i
                                      className="fa fa-caret-down"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                </Col>
                              </Row>
                            </Button>
                            <UncontrolledCollapse
                              className="innerAccordian"
                              toggler="#togglerInner"
                            >
                              <Card>
                                <CardBody>
                                  <Row className="align-items-center">
                                    <Col sm={12}>
                                      <p>Breakdown of claimable earnings:</p>
                                    </Col>
                                  </Row>
                                  <Row className="align-items-center">
                                    <Col>
                                      <div className="imgText">
                                        <img src={chainIcon} alt="" />
                                        <h4>Chainlink</h4>
                                      </div>
                                    </Col>
                                    <Col>
                                      <b>
                                        <span>$</span>0
                                      </b>
                                    </Col>
                                    <Col> </Col>
                                    <Col> </Col>
                                    <Col> </Col>
                                  </Row>
                                </CardBody>
                              </Card>
                            </UncontrolledCollapse>
                          </div>
                        </CardBody>
                      </Card>
                      <div className="innerWrapother">
                        <div className="bentInnertext" color="primary">
                          <Row className="align-items-center">
                            <Col>
                              <div className="imgText">
                                <img src={EthereumIcon} alt="" />
                                <h4>Ethereum</h4>
                              </div>
                            </Col>
                            <Col>
                              <b>
                                <span>$</span>0
                              </b>
                            </Col>
                            <Col>
                              <div className="earnValue">
                                <b>
                                  6.56% <span>(proj.6.74%)</span>
                                </b>
                                <p>CRV boost: 1.7x</p>
                              </div>
                            </Col>
                            <Col>
                              <div className="depositText">-cCRV</div>
                            </Col>
                            <Col> </Col>
                          </Row>
                        </div>
                      </div>
                      <div className="innerWrapother">
                        <div className="bentInnertext" color="primary">
                          <Row className="align-items-center">
                            <Col>
                              <div className="imgText">
                                <img src={busdIcon} alt="" />
                                <h4>BUSD</h4>
                              </div>
                            </Col>
                            <Col>
                              <b>
                                <span>$</span>0
                              </b>
                            </Col>
                            <Col>
                              <div className="earnValue">
                                <b>
                                  6.56% <span>(proj.6.74%)</span>
                                </b>
                                <p>CRV boost: 1.7x</p>
                              </div>
                            </Col>
                            <Col>
                              <div className="depositText">-cCRV</div>
                            </Col>
                            <Col> </Col>
                          </Row>
                        </div>
                      </div>
                      <div className="innerWrapother">
                        <div className="bentInnertext" color="primary">
                          <Row className="align-items-center">
                            <Col>
                              <div className="imgText">
                                <img src={chainIcon} alt="" />
                                <h4>Chainlink</h4>
                              </div>
                            </Col>
                            <Col>
                              <b>
                                <span>$</span>0
                              </b>
                            </Col>
                            <Col>
                              <div className="earnValue">
                                <b>
                                  6.56% <span>(proj.6.74%)</span>
                                </b>
                                <p>CRV boost: 1.7x</p>
                              </div>
                            </Col>
                            <Col>
                              <div className="depositText">-cCRV</div>
                            </Col>
                            <Col> </Col>
                          </Row>
                        </div>
                      </div>
                    </UncontrolledCollapse>
                  </div>
                </div>
              </div>
            </div>

            {/* Third BLock  End */}

            {/* Fourth Block Start */}

            <div className="cliamBlockOne">
              <div className="table-Responsive">
                <div className="table-Wrapper">
                  <div className="toggleWrap">
                    <Button
                      className="bentPool"
                      color="primary"
                      id="togglerFourth"
                      style={{ marginBottom: "1rem" }}
                    >
                      <Row className="align-items-center">
                        <Col>
                          <div className="imgText">
                            <img src={sushiIcon} alt="" />
                            <h2>Sushi LP</h2>
                          </div>
                        </Col>
                        <Col>
                          <div className="earnValue">
                            <p>Earned (USD value)</p>
                            <b>
                              <span>$</span>0
                            </b>
                            <i
                              className="fa fa-caret-down"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </Col>
                        <Col>
                          <div className="earnValue">
                            <p>Average APR</p>
                            <b>
                              -<span>%</span>
                            </b>
                          </div>
                        </Col>
                        <Col>
                          <h3>Deposits</h3>
                        </Col>
                        <Col>
                          <div className="clmBtn">
                            <Button className="claimbtn">Claim All</Button>
                            <i
                              className="fa fa-caret-down"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </Col>
                      </Row>
                    </Button>

                    <UncontrolledCollapse
                      toggler="#togglerFourth"
                      className="bentpoolText"
                    >
                      <Card>
                        <CardBody>
                          <div className="innerWrapother">
                            <div className="bentInnertext" color="primary">
                              <Row className="align-items-center">
                                <Col>
                                  <div className="imgText">
                                    <img src={BitCoin} alt="" />
                                    <h4>Bitcoin</h4>
                                  </div>
                                </Col>
                                <Col>
                                  <b>
                                    <span>$</span>0
                                  </b>
                                </Col>
                                <Col>
                                  <div className="earnValue">
                                    <b>
                                      6.56% <span>(proj.6.74%)</span>
                                    </b>
                                    <p>CRV boost: 1.7x</p>
                                  </div>
                                </Col>
                                <Col>
                                  <div className="depositText">-cCRV</div>
                                </Col>
                                <Col> </Col>
                              </Row>
                            </div>
                          </div>

                          <div className="innerWrap">
                            <Button
                              className="bentInner"
                              color="primary"
                              id="togglerInner"
                              style={{ marginBottom: "1rem" }}
                            >
                              <Row className="align-items-center">
                                <Col>
                                  <div className="imgText">
                                    <img src={UsdIcon} alt="" />
                                    <h4>Bitcoin</h4>
                                  </div>
                                </Col>
                                <Col>
                                  <b>
                                    <span>$</span>0
                                  </b>
                                </Col>
                                <Col>
                                  <div className="earnValue">
                                    <b>
                                      6.56% <span>(proj.6.74%)</span>
                                    </b>
                                    <p>CRV boost: 1.7x</p>
                                    <i
                                      className="fa fa-info-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                </Col>
                                <Col>
                                  <div className="depositText">-cCRV</div>
                                </Col>
                                <Col>
                                  <div className="climBtn">
                                    <Button className="claimbtn">Claim </Button>
                                    <i
                                      className="fa fa-caret-down"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                </Col>
                              </Row>
                            </Button>
                            <UncontrolledCollapse
                              className="innerAccordian"
                              toggler="#togglerInner"
                            >
                              <Card>
                                <CardBody>
                                  <Row className="align-items-center">
                                    <Col sm={12}>
                                      <p>Breakdown of claimable earnings:</p>
                                    </Col>
                                  </Row>
                                  <Row className="align-items-center">
                                    <Col>
                                      <div className="imgText">
                                        <img src={chainIcon} alt="" />
                                        <h4>Chainlink</h4>
                                      </div>
                                    </Col>
                                    <Col>
                                      <b>
                                        <span>$</span>0
                                      </b>
                                    </Col>
                                    <Col> </Col>
                                    <Col> </Col>
                                    <Col> </Col>
                                  </Row>
                                </CardBody>
                              </Card>
                            </UncontrolledCollapse>
                          </div>
                        </CardBody>
                      </Card>
                      <div className="innerWrapother">
                        <div className="bentInnertext" color="primary">
                          <Row className="align-items-center">
                            <Col>
                              <div className="imgText">
                                <img src={EthereumIcon} alt="" />
                                <h4>Ethereum</h4>
                              </div>
                            </Col>
                            <Col>
                              <b>
                                <span>$</span>0
                              </b>
                            </Col>
                            <Col>
                              <div className="earnValue">
                                <b>
                                  6.56% <span>(proj.6.74%)</span>
                                </b>
                                <p>CRV boost: 1.7x</p>
                              </div>
                            </Col>
                            <Col>
                              <div className="depositText">-cCRV</div>
                            </Col>
                            <Col> </Col>
                          </Row>
                        </div>
                      </div>
                      <div className="innerWrapother">
                        <div className="bentInnertext" color="primary">
                          <Row className="align-items-center">
                            <Col>
                              <div className="imgText">
                                <img src={busdIcon} alt="" />
                                <h4>BUSD</h4>
                              </div>
                            </Col>
                            <Col>
                              <b>
                                <span>$</span>0
                              </b>
                            </Col>
                            <Col>
                              <div className="earnValue">
                                <b>
                                  6.56% <span>(proj.6.74%)</span>
                                </b>
                                <p>CRV boost: 1.7x</p>
                              </div>
                            </Col>
                            <Col>
                              <div className="depositText">-cCRV</div>
                            </Col>
                            <Col> </Col>
                          </Row>
                        </div>
                      </div>
                      <div className="innerWrapother">
                        <div className="bentInnertext" color="primary">
                          <Row className="align-items-center">
                            <Col>
                              <div className="imgText">
                                <img src={chainIcon} alt="" />
                                <h4>Chainlink</h4>
                              </div>
                            </Col>
                            <Col>
                              <b>
                                <span>$</span>0
                              </b>
                            </Col>
                            <Col>
                              <div className="earnValue">
                                <b>
                                  6.56% <span>(proj.6.74%)</span>
                                </b>
                                <p>CRV boost: 1.7x</p>
                              </div>
                            </Col>
                            <Col>
                              <div className="depositText">-cCRV</div>
                            </Col>
                            <Col> </Col>
                          </Row>
                        </div>
                      </div>
                    </UncontrolledCollapse>
                  </div>
                </div>
              </div>
            </div>

            {/* Fourth Block End */}

            {/* Fifth Block Start */}

            <div className="cliamBlockOne LastBlock">
              <div className="table-Responsive">
                <div className="table-Wrapper">
                  <div className="toggleWrap">
                    <Button
                      className="bentPool"
                      color="primary"
                      id="togglerFifth"
                      style={{ marginBottom: "1rem" }}
                    >
                      <Row className="align-items-center">
                        <Col>
                          <div className="imgText">
                            <img src={podsIcon} alt="" />
                            <h2>Airdrops</h2>
                          </div>
                        </Col>
                        <Col>
                          <div className="clmBtn">
                            <i
                              className="fa fa-caret-down"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </Col>
                      </Row>
                    </Button>

                    <UncontrolledCollapse
                      toggler="#togglerFifth"
                      className="bentpoolText"
                    >
                      <Card>
                        <CardBody>
                          <div className="innerWrapother">
                            <div className="bentInnertext" color="primary">
                              <Row className="align-items-center">
                                <Col sm={12}>
                                  <p className="epsText">
                                    The EPS airdrop is an initiative of the
                                    Ellipsis platform, running on Binance Smart
                                    Chain (BSC), to offer part of its governance
                                    and revenue flow to Curve ecosystem
                                    stakeholders. You’re part of these
                                    stakeholders when you stake cvxCRV tokens on
                                    Convex. Every week, EPS tokens are
                                    airdropped to all cvxCRV stakers, and can be
                                    claimed below. Since Ellipsis is running on
                                    Binance Smart Chain, you need to connect to
                                    the BSC network in order to claim this
                                    airdrop.
                                  </p>
                                </Col>
                                <Col>
                                  <div className="imgOverText">
                                    <img
                                      className="starIcon"
                                      src={starIcon}
                                      alt=""
                                    />
                                    <div className="textlayer">
                                      <h6>Week 1</h6>
                                      <h4>Nothing to claim</h4>
                                    </div>
                                  </div>
                                </Col>
                                <Col>
                                  <div className="imgOverText">
                                    <img
                                      className="starIcon"
                                      src={starIcon}
                                      alt=""
                                    />
                                    <div className="textlayer">
                                      <h6>Week 1</h6>
                                      <h4>Nothing to claim</h4>
                                    </div>
                                  </div>
                                </Col>
                                <Col>
                                  <div className="imgOverText">
                                    <img
                                      className="starIcon"
                                      src={starIcon}
                                      alt=""
                                    />
                                    <div className="textlayer">
                                      <h6>Week 1</h6>
                                      <h4>Nothing to claim</h4>
                                    </div>
                                  </div>
                                </Col>
                                <Col>
                                  <div className="imgOverText">
                                    <img
                                      className="starIcon"
                                      src={starIcon}
                                      alt=""
                                    />
                                    <div className="textlayer">
                                      <h6>Week 1</h6>
                                      <h4>Nothing to claim</h4>
                                    </div>
                                  </div>
                                </Col>
                                <Col>
                                  <div className="imgOverText">
                                    <img
                                      className="starIcon"
                                      src={starIcon}
                                      alt=""
                                    />
                                    <div className="textlayer">
                                      <h6>Week 1</h6>
                                      <h4>Nothing to claim</h4>
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <div className="imgOverText">
                                    <img
                                      className="starIcon"
                                      src={starIcon}
                                      alt=""
                                    />
                                    <div className="textlayer">
                                      <h6>Week 1</h6>
                                      <h4>Nothing to claim</h4>
                                    </div>
                                  </div>
                                </Col>
                                <Col>
                                  <div className="imgOverText">
                                    <img
                                      className="starIcon"
                                      src={starIcon}
                                      alt=""
                                    />
                                    <div className="textlayer">
                                      <h6>Week 1</h6>
                                      <h4>Nothing to claim</h4>
                                    </div>
                                  </div>
                                </Col>
                                <Col>
                                  <div className="imgOverText Active">
                                    <img
                                      className="starIcon"
                                      src={starActive}
                                      alt=""
                                    />
                                    <div className="textlayer">
                                      <h6>Week 1</h6>
                                      <h4>Nothing to claim</h4>
                                    </div>
                                  </div>
                                </Col>
                                <Col>
                                  <div className="imgOverText">
                                    <img
                                      className="starIcon"
                                      src={starIcon}
                                      alt=""
                                    />
                                    <div className="textlayer">
                                      <h6>Week 1</h6>
                                      <h4>Nothing to claim</h4>
                                    </div>
                                  </div>
                                </Col>
                                <Col>
                                  <div className="imgOverText">
                                    <img
                                      className="starIcon"
                                      src={starIcon}
                                      alt=""
                                    />
                                    <div className="textlayer">
                                      <h6>Week 1</h6>
                                      <h4>Nothing to claim</h4>
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </UncontrolledCollapse>
                  </div>
                </div>
              </div>
            </div>

            {/* Fifth Block End */}
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Claim);
