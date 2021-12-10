import React from "react";
import { Container, Row, Col } from "reactstrap";
import CardCoin from "assets/images/cardCoin.png";
import DollorIcon from "assets/images/dollorIcon.png";
import ClaimIcon from "assets/images/claimIcon.svg";
import DepositIcon from "assets/images/depositIcon.svg";
import { useBentEarnedUsd, useBentStakedUsd, useBentTvl, useCrvPoolTotalDepositedUsds, useCrvPoolTotalEarned, useCrvTvls, useSushiPoolTotalDepositedUsd, useSushiPoolTotalEarned, useSushiTotalTvl } from "hooks";
import { formatBigNumber, getSumBigNumbers } from "utils";
import LockIcon from "assets/images/lockIcon.svg";
// import DbIcon from "assets/images/dbIcon.svg";

const BannerBlocks = (): React.ReactElement => {
  const crvEarnings = useCrvPoolTotalEarned();
  const sushiEarnings = useSushiPoolTotalEarned();
  const bentEarnings = useBentEarnedUsd();
  const crvDeposits = useCrvPoolTotalDepositedUsds();
  const sushiDeposits = useSushiPoolTotalDepositedUsd();
  const bentDeposits = useBentStakedUsd();
  const crvTvl = useCrvTvls();
  const sushiTvl = useSushiTotalTvl();
  const bentTvl = useBentTvl();

  const totalTvl = (): string => {
    return formatBigNumber(getSumBigNumbers(crvTvl).add(sushiTvl).add(bentTvl), 18, 2);
  }

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
          {/* <Row>
            <Col md="8" className="text-light m-auto mb-5">
              Dear Sers, whilst the Bent contracts are live and functioning with quite a bit of TVL; the frontend is still a WIP.
              Expect us to be  updating over the coming weeks.
              We have successfully completed one audit, more audits are scheduled.
              Please use this protocol at your own risk.
            </Col>
          </Row> */}
          <Row>
            <Col xs="6" className="m-auto mb-5">
              <div className="boxwrap third">
                <img className="bannerIcon" src={LockIcon} alt="Icon" />
                <div className="mx-3">
                  <p>Bent TVL</p>
                  <h2>
                    <b>
                      <span className="small">$</span>
                      {totalTvl().split('.')[0]}.
                      <span className="small">{totalTvl().split('.')[1]}</span>
                    </b>
                  </h2>
                </div>
              </div>
            </Col>
          </Row>
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
                      {totalEarnings().split('.')[0]}.
                      <span className="small">{totalEarnings().split('.')[1]}</span>
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
                      {totalDeposits().split('.')[0]}.
                      <span className="small">{totalDeposits().split('.')[1]}</span>
                    </b>
                  </h2>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default BannerBlocks;
