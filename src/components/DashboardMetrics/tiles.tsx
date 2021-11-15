import React from "react";
import { Container, Row, Col } from "reactstrap";
import ClaimIcon from "assets/images/claimIcon.svg";
import DepositIcon from "assets/images/depositIcon.svg";
// import LockIcon from "assets/images/lockIcon.svg";
// import DbIcon from "assets/images/dbIcon.svg";

const Tiles = (): React.ReactElement => {
  return (
    <React.Fragment>
      <Container>
        <div className="bannerboxes">
          <Row>
            <Col md="2"></Col>
            <Col md="4" xs="6">
              <div className="boxwrap">
                <img src={ClaimIcon} alt="Icon" />
                <p>Total Claimable</p>
                <h2>
                  <span>$</span>
                  <b>467</b>.12
                </h2>
              </div>
            </Col>
            <Col md="4" xs="6">
              <div className="boxwrap second">
                <img src={DepositIcon} alt="Icon" />
                <p>Total Deposit</p>
                <h2>
                  <span>$</span>
                  <b>511</b>.96
                </h2>
              </div>
            </Col>
            <Col md="2"></Col>
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
export default Tiles;
