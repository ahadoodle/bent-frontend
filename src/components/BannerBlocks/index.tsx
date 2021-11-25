import React from "react";
import { Container, Row, Col } from "reactstrap";
import styled from "styled-components";
// import CardCoin from "assets/images/cardCoin.png";
// import DollorIcon from "assets/images/dollorIcon.png";
// import ClaimIcon from "assets/images/claimIcon.svg";
// import DepositIcon from "assets/images/depositIcon.svg";
// import LockIcon from "assets/images/lockIcon.svg";
// import DbIcon from "assets/images/dbIcon.svg";

const BannerBlocks = (): React.ReactElement => {
  return (
    <React.Fragment>
      <Container>
        <div className="bannerBlockWrap">
          <Row>
            <Col className="text-light">
              Dear Sers, while the Bent contracts are live and functioning with already quite a bit of TVL, the frontend is still a WIP.
              Expect us to be updating the TVL, APR and other goodies in the coming weeks.
              We have one audit already <Link href="/BENT_Audit_Report.pdf" download>here</Link> and more scheduled.
              Please use this protocol at your own risk.
            </Col>
            {/* <Col xs="6">
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
            </Col> */}
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

const Link = styled.a`
  color: white !important;
`;

export default BannerBlocks;
