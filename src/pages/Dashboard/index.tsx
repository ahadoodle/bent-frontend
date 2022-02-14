import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { Button, Col, Container, Row } from "reactstrap";
import DashboardDiagram1 from 'assets/images/dashboard-diagram-1.png';
import DashboardDiagram2 from 'assets/images/dashboard-diagram-2.svg';
import DashboardDiagram5 from 'assets/images/dashboard-diagram-5.svg';
import StakeIcon from 'assets/images/stake-icon.svg';
import { DecimalSpan } from "components/DecimalSpan";
import { useTotalTvl } from "hooks";

const Dashboard = () => {
	const totalTvl = useTotalTvl();

	return (
		<React.Fragment>
			<Helmet>
				<title>Bent Finance | Dashboard</title>
			</Helmet>
			<div className="banner">
				<Container>
					<Row className="pt-5">
						<Col style={{ maxHeight: 170 }}>
							<TopHeader>Boosted Bent<br />Staking</TopHeader>
							<TopDiagram src={DashboardDiagram1} alt="Icon" />
						</Col>
					</Row>
					<Row className="pt-3">
						<Col>
							<h4 className="text-muted">Deposit liquidity, earn boosted<br /> CRV and rewards</h4>
						</Col>
					</Row>
					<Row className="pt-4">
						<Col>
							<StakeButton className="transBtn p-2 px-4">
								<img src={StakeIcon} alt="Icon" />
								&nbsp;Stake
							</StakeButton>
						</Col>
					</Row>
					<Row className="thead mt-5 pt-5" style={{ width: '60%' }}>
						<Col>
							<div className="text-white">
								<span className="small">TVL</span><br />
								<b>
									<span className="small">$</span>
									<DecimalSpan value={totalTvl} />
								</b>
							</div>
						</Col>
						<Col>
							<div className="text-white">
								<span className="small">Revenue Earned</span><br />
								<b>
									<span className="small">$</span>
									<DecimalSpan value={totalTvl} />
								</b>
							</div>
						</Col>
						<Col>
							<div className="text-white">
								<span className="small">Total CRV</span><br />
								<b>
									<span className="small">$</span>
									<DecimalSpan value={totalTvl} />
								</b>
							</div>
						</Col>
						<Col>
							<div className="text-white">
								<span className="small">Airdrops</span><br />
								<b>
									<span className="small">$</span>
									<DecimalSpan value={totalTvl} />
								</b>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
			<EarnCrvSection>
				<Container>
					<Row>
						<Col>
							<TitleSmall>LIQUIDITY PROVIDERS</TitleSmall>
						</Col>
					</Row>
					<Row className="pt-3">
						<Col style={{ maxHeight: 130 }}>
							<EarnCrvTitle>Earn CRV with a<br />better boost</EarnCrvTitle>
							<EarnCrvDiagram src={DashboardDiagram5} alt="Icon" />
						</Col>
					</Row>
					<Row>
						<Col>
							<EarnCrvDesc>
								Deposit your Curve LP tokens to earn<br />Curve trading fees, boosted CRV, CVX<br /> and BENT rewards.
							</EarnCrvDesc>
						</Col>
					</Row>
					<Row>
						<Col>
							<EarnCrvDesc style={{ marginLeft: "auto", width: "fit-content" }}>
								Boost is pooled from CVX<br /> stakers so you do not need to<br /> worry about locking yourself.
							</EarnCrvDesc>
						</Col>
					</Row>
				</Container>
			</EarnCrvSection>
		</React.Fragment>
	);
};

const TopHeader = styled.h1`
	font-style: normal;
	font-weight: bold;
	font-size: 83px;
	line-height: 83px;
	letter-spacing: -0.04em;
	color: white;
`;

const TopDiagram = styled.img`
	position: relative;
	margin-left: 300px;
	top: -120px;
	width: 800px;
`;

const StakeButton = styled(Button)`
	font-size: 22px !important;
	line-height: 26px !important;
`;

const EarnCrvSection = styled.div`
	background: url(${DashboardDiagram2});
	background-repeat: no-repeat;
	background-size: cover;
	padding-top: 160px;
	padding-bottom: 160px;
`;

const EarnCrvTitle = styled.div`
	font-style: normal;
	font-weight: bold;
	font-size: 48px;
	line-height: 56px;
	letter-spacing: -0.03em;
	font-feature-settings: 'ss01' on;
`;

const EarnCrvDesc = styled.div`
	font-style: normal;
	font-weight: normal;
	font-size: 22px;
	line-height: 32px;
	color: #10151D;
	opacity: 0.8;
`;

const EarnCrvDiagram = styled.img`
	position: relative;
	margin-left: 450px;
	top: -120px;
	width: 356px;
`;

const TitleSmall = styled.div`
	width: fit-content;
	background: #9EDBB3;
	border: 1px solid #10151D;
	box-sizing: border-box;
	border-radius: 4px;
	padding: 5px 10px;
	font-style: normal;
	font-weight: 500;
	font-size: 16px;
	line-height: 19px;
	letter-spacing: 0.08em;
`;

export default withRouter(Dashboard);
