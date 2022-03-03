import React from "react";
import { withRouter } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import {
  Container
} from "reactstrap";
import "font-awesome/css/font-awesome.min.css";
import BannerBlocks from "components/BannerBlocks";
import { ClaimCurveLpTable } from "components/ClaimCurveLpTable";
import { ClaimSushiLpTable } from "components/ClaimSushiLpTable";
import { ClaimBent } from "components/ClaimBent";
import { ClaimBentCVX } from "components/ClaimBentCvx";
import { ClaimWeBent } from "components/ClaimWeBent";

export const Claim = (): React.ReactElement => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Bent Finance | Claim</title>
      </Helmet>
      <div className="banner">
        <div className="bannerboxes">
          <BannerBlocks />
        </div>
      </div>
      <div className="contentSection">
        <ClaimWeBent />
        <ClaimBent />
        <ClaimBentCVX />
        <ClaimCurveLpTable />
        <ClaimSushiLpTable />
        <Container>
          <div className="cliamBox">
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Claim);
