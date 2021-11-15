import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import {
  Container, Button, Row, Col, Input, Label,
} from "reactstrap";
import BannerBlocks from "components/BannerBlocks";
import "font-awesome/css/font-awesome.min.css";
import { ClaimCurveLpTable } from "components/ClaimCurveLpTable";
import { ClaimSushiLpTable } from "components/ClaimSushiLpTable";

export const Claim = (): React.ReactElement => {
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
      <Helmet>
        <title>Bent Protocol | Claim</title>
      </Helmet>
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
            <ClaimCurveLpTable />
            <ClaimSushiLpTable />
            {/* <div className="cliamBlockOne LastBlock">
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
            </div> */}
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Claim);
