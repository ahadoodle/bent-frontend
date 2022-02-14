import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { Button, Col, Container, Row } from "reactstrap";
import DashboardDiagram1 from 'assets/images/dashboard-diagram-1.png';
import DashboardDiagram2 from 'assets/images/dashboard-diagram-2.svg';
import DashboardDiagram4 from 'assets/images/dashboard-diagram-4.png';
import DashboardDiagram5 from 'assets/images/dashboard-diagram-5.svg';
import DashboardDiagram6 from 'assets/images/dashboard-diagram-6.png';
import DashboardDiagram7 from 'assets/images/dashboard-diagram-7.svg';
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
			<BackgroundTop src={DashboardDiagram2} alt="BackgroundTop" />
			<PutCrvSection>
				<Container>
					<Row>
						<Col>
							<PutCrvDiagram src={DashboardDiagram4} alt="Icon" />
						</Col>
						<Col>
							<TitleSmall style={{ marginTop: 130 }}>CRV STAKERS</TitleSmall>
							<EarnCrvTitle className="mt-4">Put your CVX<br />to work</EarnCrvTitle>
							<EarnCrvDesc className="mt-4">
								Stake and earn additional CRV on top of<br />CVX tokens and Curve trading fees.
							</EarnCrvDesc>
						</Col>
					</Row>
				</Container>
			</PutCrvSection>
			<BackgroundTop src={DashboardDiagram7} alt="BackgroundTop" />
			<StakeBentSection>
				<Container>
					<Row>
						<Col>
							<TitleSmall style={{ marginTop: 90 }}>THE TOKEN</TitleSmall>
							<EarnCrvTitle className="mt-4">Stake BENT, earn<br />more and vote</EarnCrvTitle>
							<EarnCrvDesc className="mt-4">
								Stake your BENT rewards back into the<br />
								platform and earn platform fees and<br />
								vote on your future yield
							</EarnCrvDesc>
						</Col>
						<Col>
							<StakeBentDiagram src={DashboardDiagram6} alt="Icon" />
						</Col>
					</Row>
				</Container>
			</StakeBentSection>
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
	background: #C5B3FF;
	padding-top: 150px;
	padding-bottom: 100px;
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

const PutCrvSection = styled.div`
	padding-top: 20px;
	padding-bottom: 20px;
`;

const PutCrvDiagram = styled.img`
	width: 470px;
`;

const StakeBentSection = styled.div`
	background: #B5DEFF;
	padding-top: 20px;
	padding-bottom: 150px;
`;

const StakeBentDiagram = styled.img`
	width: 356px;
`;

const BackgroundTop = styled.img`
	background-repeat: no-repeat;
	background-size: cover;
	width: 100%;
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
