import React from "react";
import { Container, Row, Col } from "reactstrap";
import {
  useTotalDeposits,
  useTotalEarnings,
  useIsMobile
} from "hooks";
import { AnimNumber } from "components/AnimNumber";
import CardCoin from "assets/images/cardCoin.png";
import ClaimIcon from "assets/images/claimIcon.svg";
import DollorIcon from "assets/images/dollorIcon.png";
import DepositIcon from "assets/images/depositIcon.svg";
// import LockIcon from "assets/images/lockIcon.svg";

const BannerBlocks = (): React.ReactElement => {
  const isMobile = useIsMobile();
  const totalEarnings = useTotalEarnings();
  const totalDeposits = useTotalDeposits();

  return (
    <React.Fragment>
      <Container>
        {isMobile ?
          <div className="bannerBlockWrap mt-5">
            <Row>
              <Col xs="12" className="mb-3">
                <div className="boxwrap">
                  <img className="cardCoin" src={CardCoin} alt="Icon" />
                  <img className="bannerIcon" src={ClaimIcon} alt="Icon" />
                  <div className="mx-3">
                    <p>My Claimable</p>
                    <h2>
                      <b>
                        <span className="small">$</span>
                        <AnimNumber
                          value={totalEarnings}
                          decimals={2}
                          precision={18}
                          isDecimalSpan={true}
                          invalid={'0.0'}
                        />
                      </b>
                    </h2>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs="12" className="mb-3">
                <div className="boxwrap second">
                  <img className="dollorCoin" src={DollorIcon} alt="Icon" />
                  <img className="bannerIcon" src={DepositIcon} alt="Icon" />
                  <div className="mx-3">
                    <p>My Deposits</p>
                    <h2>
                      <b>
                        <span className="small">$</span>
                        <AnimNumber
                          value={totalDeposits}
                          decimals={2}
                          precision={18}
                          isDecimalSpan={true}
                          invalid={'0.0'}
                        />
                      </b>
                    </h2>
                  </div>
                </div>
              </Col>
            </Row>
          </div> :
          <div className="bannerBlockWrap">
            <Row>
              <Col xs="6">
                <div className="boxwrap">
                  <img className="cardCoin" src={CardCoin} alt="Icon" />
                  <img className="bannerIcon" src={ClaimIcon} alt="Icon" />
                  <div className="mx-3">
                    <p>My Claimable</p>
                    <h2>
                      <b>
                        <span className="small">$</span>
                        <AnimNumber
                          value={totalEarnings}
                          decimals={2}
                          precision={18}
                          isDecimalSpan={true}
                          invalid={'0.0'}
                        />
                      </b>
                    </h2>
                  </div>
                </div>
              </Col>
              <Col xs="6">
                <div className="boxwrap second">
                  <img className="dollorCoin" src={DollorIcon} alt="Icon" />
                  <img className="bannerIcon" src={DepositIcon} alt="Icon" />
                  <div className="mx-3">
                    <p>My Deposits</p>
                    <h2>
                      <b>
                        <span className="small">$</span>
                        <AnimNumber
                          value={totalDeposits}
                          decimals={2}
                          precision={18}
                          isDecimalSpan={true}
                          invalid={'0.0'}
                        />
                      </b>
                    </h2>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        }
      </Container>
    </React.Fragment>
  );
};

export default BannerBlocks;
