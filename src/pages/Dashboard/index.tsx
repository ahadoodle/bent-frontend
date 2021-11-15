import React from "react";
import { withRouter } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import "font-awesome/css/font-awesome.min.css";
import { StakeCurveLpTable } from "components/StakeCurveLpTable";
import Tiles from "components/DashboardMetrics/tiles";
// import { ConvertCrv } from 'components/ConvertCrv';
import { StakeBent } from 'components/StakeBent';
import { StakeSushiLpTable } from "components/StakeSushiLpTable";

const Dashboard = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Bent Protocol | Dashboard</title>
      </Helmet>
      <div className="banner">
        <Tiles />
      </div>

      <div className="contentSection">
        <StakeBent />
        {/* <ConvertCrv /> */}
        <div className="stakebent-token">
          <StakeCurveLpTable />
        </div>
        <div className="stakebent-token">
          <StakeSushiLpTable />
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Dashboard);
