import React from "react";
import { withRouter } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import "font-awesome/css/font-awesome.min.css";
import BannerBlocks from "components/BannerBlocks";
import { VoteInfluencerTable } from "components/VoteInfluencerTable";

const Consolidate = () => {
	return (
		<React.Fragment>
			<Helmet>
				<title>Bent Finance | Consolidate</title>
			</Helmet>
			<div className="banner">
				<div className="bannerboxes">
					<BannerBlocks />
				</div>
			</div>
			<div className="contentSection">
				<VoteInfluencerTable />
			</div>
		</React.Fragment>
	);
};

export default withRouter(Consolidate);
