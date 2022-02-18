import React from "react";
import { withRouter } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import "font-awesome/css/font-awesome.min.css";
import BannerBlocks from "components/BannerBlocks";
import { LockWeBent } from "components/LockWeBent";
import { MyLocksTable } from "components/Locks";
import { DelegateVote } from "components/Delegate";

const Lock = () => {
	return (
		<React.Fragment>
			<Helmet>
				<title>Bent Finance | Lock BENT</title>
			</Helmet>
			<div className="banner">
				<div className="bannerboxes">
					<BannerBlocks />
				</div>
			</div>

			<div className="contentSection">
				<LockWeBent />
				<div className="section">
					<MyLocksTable />
				</div>
				<div className="section">
					<DelegateVote />
				</div>
			</div>
		</React.Fragment>
	);
};

export default withRouter(Lock);
