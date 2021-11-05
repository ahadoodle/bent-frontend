import React from "react";
import { Container, Row, Col } from "reactstrap";
import CardCoin from "assets/images/cardCoin.png";
import DollorIcon from "assets/images/dollorIcon.png";

const BannerBlocks = () => {
  return (
    <React.Fragment>
      <Container>
        <div className="bannerBlockWrap">
          <Row>
            <Col xs="6">
              <div className="boxwrap">
                <img className="cardCoin" src={CardCoin} alt="Icon" />
                <p>Total Claimable</p>
                <h2>
                <span>$</span>
                <b>467</b>.12
                </h2>
              </div>
            </Col>
            <Col xs="6">
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
      </Container>
    </React.Fragment>
  );
};
export default BannerBlocks;
