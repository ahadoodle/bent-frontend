import React from "react";
import { Container, Row, Col } from "reactstrap";
import CardCoin from "assets/images/cardCoin.png";
import DollorIcon from "assets/images/dollorIcon.png";
import ClaimIcon from "assets/images/claimIcon.svg";
import DepositIcon from "assets/images/depositIcon.svg";
import { useBentEarnedUsd, useBentStakedUsd, useCrvPoolTotalDepositedUsds, useCrvPoolTotalEarned, useSushiPoolTotalDepositedUsd, useSushiPoolTotalEarned } from "hooks";
import { formatBigNumber } from "utils";
// import LockIcon from "assets/images/lockIcon.svg";
// import DbIcon from "assets/images/dbIcon.svg";

const BannerBlocks = (): React.ReactElement => {
  const crvEarnings = useCrvPoolTotalEarned();
  const sushiEarnings = useSushiPoolTotalEarned();
  const bentEarnings = useBentEarnedUsd();
  const crvDeposits = useCrvPoolTotalDepositedUsds();
  const sushiDeposits = useSushiPoolTotalDepositedUsd();
  const bentDeposits = useBentStakedUsd();

  const totalEarnings = (): string => {
    return formatBigNumber(crvEarnings.add(sushiEarnings).add(bentEarnings), 18, 2);
  }

  const totalDeposits = (): string => {
    return formatBigNumber(crvDeposits.add(sushiDeposits).add(bentDeposits), 18, 2)
  }

  return (
    <React.Fragment>
      <Container>
        <div className="bannerBlockWrap">
          <Row>
            <Col md="8" className="text-light m-auto mb-5">
              Dear Sers, whilst the Bent contracts are live and functioning with quite a bit of TVL; the frontend is still a WIP.
              Expect us to be  updating over the coming weeks.
              We have successfully completed one audit, more audits are scheduled.
              Please use this protocol at your own risk.
            </Col>
          </Row>
          <Row>
            <Col xs="6">
              <div className="boxwrap">
                <img className="cardCoin" src={CardCoin} alt="Icon" />
                <img className="bannerIcon" src={ClaimIcon} alt="Icon" />
                <div className="mx-3">
                  <p>Total Claimable</p>
                  <h2>
                    <span>$</span>
                    <b>{totalEarnings().split('.')[0]}</b>.{totalEarnings().split('.')[1]}
                  </h2>
                </div>
              </div>
            </Col>
            <Col xs="6">
              <div className="boxwrap second">
                <img className="dollorCoin" src={DollorIcon} alt="Icon" />
                <img className="bannerIcon" src={DepositIcon} alt="Icon" />
                <div className="mx-3">
                  <p>Total Deposits</p>
                  <h2>
                    <span>$</span>
                    <b>{totalDeposits().split('.')[0]}</b>.{totalDeposits().split('.')[1]}
                  </h2>
                </div>
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
