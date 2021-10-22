import React from "react";
import { Container, Row, Col, Input, Label, Button } from "reactstrap";
import CardCoin from "../../assets/images/cardCoin.png";
import DollorIcon from "../../assets/images/dollorIcon.png";
import LockIcon from "../../assets/images/lockIcon.png";
import DbIcon from "../../assets/images/dbIcon.png";

const BannerBlocks = () => {
  return (
    <React.Fragment>
      <Container>
        <div className="bannerboxes">
            <div className="bannerBlockWrap">
                <Row>
                    <Col md="6">
                    <div className="boxwrap">
                        <img className="cardCoin" src={CardCoin} alt="Icon" />
                        <p>Total Claimable</p>
                        <h2>
                        <span>$</span>
                        <b>467</b>.12
                        </h2>
                    </div>
                    </Col>
                    <Col md="6">
                    <div className="boxwrap second">
                        <img className="dollorCoin" src={DollorIcon} alt="Icon" />
                        <p>Total Deposit</p>
                        <h2>
                        <span>$</span>
                        <b>511</b>.96
                        </h2>
                    </div>
                    </Col>
                </Row>
            </div>
            <div className="autoText">
                <div className="advance-btn">
                    <Label className="switch"> 
                        <Input type="checkbox"  name="checkbox" />
                        <span className="slider"></span> 
                    </Label> 
                    <span className="textadvance">Auto claim all positions & stake</span>
                </div>
            </div>
            <div className="aproveCheckbox">
                <Container>
                    <Row>
                        <Col md="12">
                            <h2>When claiming also stake:</h2>
                        </Col>
                        <Col md="6">
                            <div className="numberCheck">
                                <Label className="contain">
                                    <Input type="radio" checked="checked" name="radio" />
                                    <span className="checkmark"></span>
                                    <span className="checkText">None</span>
                                </Label>
                                <Label className="contain">
                                    <Input type="radio" name="radio" />
                                    <span className="checkmark"></span>
                                    <span className="checkText">CRV</span>
                                </Label>
                                <Label className="contain">CVX
                                    <Input type="radio" name="radio" />
                                    <span className="checkmark"></span>
                                    <span className="checkText">CVX</span>
                                </Label>
                                <Label className="contain">
                                    <Input type="radio" name="radio" />
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
                                    <Button className="greyBtn">Claim All & Convert CRV & Stake CVX</Button>
                                </p>
                            </div>
                        
                        </Col>
                        <Col md="6">
                            <div className="thisDo">
                                <h3>What can this do?</h3>
                                <ul>
                                    <li>Claim all rewards from the selected staking contracts</li>
                                    <li>Convert the cliamed CRV to cvxCRV</li>
                                    <li>Stake the converted cvxCRV</li>
                                    <li>Stake the claimed CVX</li>
                                </ul>
                            </div>
                        </Col>
                    </Row>

                </Container>
            </div>
        </div>
      </Container>
    </React.Fragment>
  );
};
export default BannerBlocks;
