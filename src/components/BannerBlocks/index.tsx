import React from "react";
import { Container, Row, Col } from "reactstrap";
import CardCoin from "assets/images/cardCoin.png";
import DollorIcon from "assets/images/dollorIcon.png";
import ClaimIcon from "assets/images/claimIcon.svg";
import DepositIcon from "assets/images/depositIcon.svg";
// import LockIcon from "assets/images/lockIcon.svg";
// import DbIcon from "assets/images/dbIcon.svg";

const BannerBlocks = (): React.ReactElement => {
  return (
    <React.Fragment>
      <Container>
        <div className="bannerBlockWrap">
          <Row>
            <Col xs="6">
              <div className="boxwrap">
                <img className="cardCoin" src={CardCoin} alt="Icon" />
                <img src={ClaimIcon} alt="Icon" />
                <p>Total Claimable</p>
                <h2>
                <span>$</span>
                <b>---</b>
                </h2>
              </div>
            </Col>
            <Col xs="6">
              <div className="boxwrap second">
                <img className="dollorCoin" src={DollorIcon} alt="Icon" />
                <img src={DepositIcon} alt="Icon" />
                <p>Total Deposit</p>
                <h2>
                <span>$</span>
                <b>---</b>
                </h2>
              </div>
            </Col>
            {/* <Col md="4">
              <Row>
                <Col md="12">
                  <div className="boxwrap smallone">
                    <Row>
                      <Col xs="4">
                        <img src={LockIcon} alt="Icon" />
                      </Col>
                      <Col xs="8">
                        <p>TVL</p>
                        <h2>
                          <span>$</span>
                          <b>467</b>.12
                        </h2>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <div className="boxwrap smalltwo">
                    <Row>
                      <Col xs="4">
                        <img src={DbIcon} alt="Icon" />
                      </Col>
                      <Col xs="8">
                        <p>TVL</p>
                        <h2>
                          <span>$</span>
                          <b>467</b>.12
                        </h2>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Col> */}
          </Row>
        </div>
      </Container>
    </React.Fragment>
  );
};
export default BannerBlocks;
