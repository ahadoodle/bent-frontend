import React from "react";
import { withRouter } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import "font-awesome/css/font-awesome.min.css";
import { StakeCurveLpTable } from "components/StakeCurveLpTable";
// import { ConvertCrv } from 'components/ConvertCrv';
import { StakeBent } from 'components/StakeBent';
import { StakeSushiLpTable } from "components/StakeSushiLpTable";
import BannerBlocks from "components/BannerBlocks";

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
        <StakeBent />
        {/* <ConvertCrv /> */}
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
