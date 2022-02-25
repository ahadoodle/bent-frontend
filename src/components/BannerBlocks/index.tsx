import React from "react";
import { Container, Row, Col } from "reactstrap";
import {
  useBentCvxStakedUSD,
  useBentCvxTotalEarned,
  useBentCvxTvl,
  useBentEarnedUsd,
  useBentStakedUsd,
  useBentTvl,
  useCrvPoolTotalDepositedUsds,
  useCrvPoolTotalEarned,
  useCrvTotalTvl,
  useIsMobile,
  useSushiPoolTotalDepositedUsd,
  useSushiPoolTotalEarned,
  useSushiTotalTvl,
  useWeBentDepositsUsd,
  useWeBentEarnedUsd,
  useWeBentTvl
} from "hooks";
import { AnimNumber } from "components/AnimNumber";
import { BigNumber } from "ethers";
import CardCoin from "assets/images/cardCoin.png";
import ClaimIcon from "assets/images/claimIcon.svg";
import DollorIcon from "assets/images/dollorIcon.png";
import DepositIcon from "assets/images/depositIcon.svg";
import LockIcon from "assets/images/lockIcon.svg";

const BannerBlocks = (): React.ReactElement => {
  const crvEarnings = useCrvPoolTotalEarned();
  const sushiEarnings = useSushiPoolTotalEarned();
  const bentEarnings = useBentEarnedUsd();
  const bentCvxEarned = useBentCvxTotalEarned();
  const weBentEarned = useWeBentEarnedUsd();
  const crvDeposits = useCrvPoolTotalDepositedUsds();
  const sushiDeposits = useSushiPoolTotalDepositedUsd();
  const bentDeposits = useBentStakedUsd();
  const bentCvxDeposits = useBentCvxStakedUSD();
  const webentDeposits = useWeBentDepositsUsd();
  const crvTvl = useCrvTotalTvl();
  const sushiTvl = useSushiTotalTvl();
  const bentTvl = useBentTvl();
  const bentCvxTvl = useBentCvxTvl();
  const weBentTvl = useWeBentTvl();
  const isMobile = useIsMobile();

  const totalTvl = (): BigNumber => {
    return crvTvl.add(sushiTvl).add(bentTvl).add(bentCvxTvl).add(weBentTvl);
  }

  const totalEarnings = (): BigNumber => {
    return crvEarnings.add(sushiEarnings).add(bentEarnings).add(bentCvxEarned).add(weBentEarned);
  }

  const totalDeposits = (): BigNumber => {
    return crvDeposits.add(sushiDeposits).add(bentDeposits).add(bentCvxDeposits).add(webentDeposits)
  }

  return (
    <React.Fragment>
      <Container>
        {isMobile ?
          <div className="bannerBlockWrap mt-5">
            <Row>
              <Col xs="12" className="mb-3">
                <div className="boxwrap third">
                  <img className="bannerIcon" src={LockIcon} alt="Icon" />
                  <div className="mx-3">
                    <p>Bent TVL</p>
                    <h2>
                      <b>
                        <span className="small">$</span>
                        <AnimNumber
                          value={totalTvl()}
                          decimals={2}
                          precision={18}
                          isDecimalSpan={true}
                        />
                      </b>
                    </h2>
                  </div>
                </div>
              </Col>
            </Row>
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
                          value={totalEarnings()}
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
                          value={totalDeposits()}
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
              <Col xs="6" className="m-auto mb-5">
                <div className="boxwrap third">
                  <img className="bannerIcon" src={LockIcon} alt="Icon" />
                  <div className="mx-3">
                    <p>Bent TVL</p>
                    <h2>
                      <b>
                        <AnimNumber value={totalTvl()} decimals={2} precision={18} isDecimalSpan={true} />
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
                        <AnimNumber
                          value={totalEarnings()}
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
                          value={totalDeposits()}
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
