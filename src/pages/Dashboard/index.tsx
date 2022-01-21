import React from "react";
import { withRouter } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import "font-awesome/css/font-awesome.min.css";
import { StakeCurveLpTable } from "components/StakeCurveLpTable";
import { StakeBentCVX } from 'components/StakeBentCVX';
import { StakeBent } from 'components/StakeBent';
import { StakeSushiLpTable } from "components/StakeSushiLpTable";
import BannerBlocks from "components/BannerBlocks";
import { LockWeBent } from "components/LockWeBent";

const Dashboard = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Bent Finance | Dashboard</title>
      </Helmet>
      <div className="banner">
        <div className="bannerboxes">
          <BannerBlocks />
        </div>
      </div>

      <div className="contentSection">
        <LockWeBent />
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

export default withRouter(Dashboard);
