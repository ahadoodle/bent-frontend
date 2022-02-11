import React from "react";
import { withRouter } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import "font-awesome/css/font-awesome.min.css";
import { StakeCurveLpTable } from "components/StakeCurveLpTable";
import { StakeBentCVX } from 'components/StakeBentCVX';
import { StakeBent } from 'components/StakeBent';
import { StakeSushiLpTable } from "components/StakeSushiLpTable";
import BannerBlocks from "components/BannerBlocks";
import { WeBentStatus } from "components/WeBentStatus";

const Stake = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Bent Finance | Stake</title>
      </Helmet>
      <div className="banner">
        <div className="bannerboxes">
          <BannerBlocks />
        </div>
      </div>

      <div className="contentSection">
        <WeBentStatus />
        <div className="section">
          <StakeBent />
        </div>
        <div className="section">
          <StakeBentCVX />
        </div>
        <div className="section">
          <StakeCurveLpTable />
        </div>
        <div className="section">
          <StakeSushiLpTable />
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Stake);
