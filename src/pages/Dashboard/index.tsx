import React from "react";
import styled from "styled-components";
import { withRouter, useHistory } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { Button, Col, Container, Row } from "reactstrap";
import DashboardDiagram1 from 'assets/images/dashboard-diagram-1.png';
import DashboardDiagram2 from 'assets/images/dashboard-diagram-2.svg';
import DashboardDiagram3 from 'assets/images/dashboard-diagram-3.svg';
import DashboardDiagram4 from 'assets/images/dashboard-diagram-4.png';
import DashboardDiagram5 from 'assets/images/dashboard-diagram-5.png';
import DashboardDiagram6 from 'assets/images/dashboard-diagram-6.png';
import DashboardDiagram7 from 'assets/images/dashboard-diagram-7.svg';
import DashboardDiagram8 from 'assets/images/dashboard-diagram-8.svg';
import DashboardDiagram9 from 'assets/images/dashboard-diagram-9.svg';
import DashboardTwitter from 'assets/images/dashboard-twitter.png';
import DashboardTelegram from 'assets/images/dashboard-telegram.png';
import DashboardGithub from 'assets/images/dashboard-github.png';
import DocIcon from 'assets/images/doc.svg';
import StakeIcon from 'assets/images/stake-icon.svg';
import StakeBlackIcon from 'assets/images/stake-black.svg';
import { DecimalSpan } from "components/DecimalSpan";
import { useIsMobile, useTotalTvl, useVlCvxBalance } from "hooks";
import { formatBigNumber } from "utils";
import { SOCIAL } from "constant";

const Dashboard = () => {
	const isMobile = useIsMobile();
	const totalTvl = useTotalTvl();
	const totalCvx = useVlCvxBalance();
	const history = useHistory();

	const onStake = () => {
		history.push('/stake');
	}

	const openUrl = (url) => {
		window.open(url, '_blank');
	}

	return (
		<React.Fragment>
			<Helmet>
				<title>Bent Finance | Dashboard</title>
			</Helmet>
			<div className="banner">
				<Container>
					<Row className="pt-5">
						<Col style={isMobile ? {} : { maxHeight: 170 }}>
							<TopHeader mobile={isMobile} >Boosted Bent<br />Staking</TopHeader>
							<TopDiagram src={DashboardDiagram1} alt="Icon" mobile={isMobile} />
						</Col>
					</Row>
					<Row className="pt-3">
						<Col>
							<h4 className="text-muted">Deposit liquidity, earn boosted<br /> CRV and rewards</h4>
						</Col>
					</Row>
					<Row className="pt-4">
						<Col>
							<StakeButton className="transBtn p-2 px-4" onClick={onStake}>
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
									<DecimalSpan value={formatBigNumber(totalTvl, 18, 2)} />
								</b>
							</div>
						</Col>
						<Col>
							<div className="text-white">
								<span className="small">Total CVX</span><br />
								<b>
									<span className="small"></span>
									<DecimalSpan value={formatBigNumber(totalCvx, 18, 2)} />
								</b>
							</div>
						</Col>
						<Col>
						</Col>
						<Col>
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
						<Col style={isMobile ? {} : { maxHeight: 130 }}>
							<EarnCrvTitle>Earn CRV with a<br />better boost</EarnCrvTitle>
							<EarnCrvDiagram src={DashboardDiagram5} alt="Icon" mobile={isMobile} />
						</Col>
					</Row>
					<Row>
						<Col>
							<EarnCrvDesc style={{ width: isMobile ? 'inherit' : 400 }}>
								Deposit your Curve LP tokens to earn Curve trading fees, boosted CRV, CVX and BENT rewards.
							</EarnCrvDesc>
						</Col>
					</Row>
					<Row>
						<Col>
							<EarnCrvDesc style={isMobile ? { width: 'inherit', marginTop: 10 } : { marginLeft: "auto", width: 300 }}>
								Boost is pooled from CVX stakers so you do not need to worry about locking yourself.
							</EarnCrvDesc>
						</Col>
					</Row>
				</Container>
			</EarnCrvSection>
			<BackgroundTop src={DashboardDiagram2} alt="BackgroundTop" />
			<PutCrvSection>
				<Container>
					{isMobile ?
						<Row>
							<Col>
								<TitleSmall style={{ marginTop: 50 }}>CRV STAKERS</TitleSmall>
								<EarnCrvTitle className="mt-4">Put your CVX<br />to work</EarnCrvTitle>
								<PutCrvDiagram src={DashboardDiagram4} alt="Icon" mobile={isMobile} />
								<EarnCrvDesc className="mt-4">
									Stake and earn additional CRV on top of CVX tokens and Curve trading fees.
								</EarnCrvDesc>
							</Col>
						</Row> :
						<Row>
							<Col>
								<PutCrvDiagram src={DashboardDiagram4} alt="Icon" mobile={isMobile} />
							</Col>
							<Col>
								<TitleSmall style={{ marginTop: 130 }}>CRV STAKERS</TitleSmall>
								<EarnCrvTitle className="mt-4">Put your CVX<br />to work</EarnCrvTitle>
								<EarnCrvDesc className="mt-4">
									Stake and earn additional CRV on top of<br />CVX tokens and Curve trading fees.
								</EarnCrvDesc>
							</Col>
						</Row>
					}
				</Container>
			</PutCrvSection>
			<BackgroundTop src={DashboardDiagram7} alt="BackgroundTop" />
			<StakeBentSection className="d-flex">
				{!isMobile && <StakeBentDiagram2 src={DashboardDiagram3} alt="DashboardDiagram" />}
				<Container>
					<Row>
						<Col>
							<TitleSmall style={{ marginTop: 90 }}>THE TOKEN</TitleSmall>
							{
								isMobile ?
									<EarnCrvTitle className="mt-4">
										Stake BENT, earn more and vote
									</EarnCrvTitle> :
									<EarnCrvTitle className="mt-4">
										Stake BENT, earn<br />more and vote
									</EarnCrvTitle>
							}
							<EarnCrvDesc className="mt-4" style={{ width: isMobile ? 'inherit' : 400 }}>
								Stake your BENT rewards back into the platform and earn platform fees and vote on your future yield.
							</EarnCrvDesc>
						</Col>
						<Col>
							<StakeBentDiagram src={DashboardDiagram6} alt="Icon" />
						</Col>
					</Row>
				</Container>
			</StakeBentSection>
			<AuditSection>
				<Container>
					<Row>
						<Col>
							<AuditTitle>AUDITS</AuditTitle>
							<div className="d-flex">
								<AuditDesc className="mt-4" style={{ maxWidth: 700 }}>
									Hacken is a team of experienced developers providing top-notch blockchain solutions, smart contract security audits and tech advisory.
								</AuditDesc>
								{!isMobile && <img src={DashboardDiagram8} alt="Icon" style={{ marginLeft: 28 }} />}
							</div>
							<div style={isMobile ? { display: 'grid' } : {}}>
								{isMobile && <img src={DashboardDiagram8} alt="Icon" style={{ marginLeft: 28, marginTop: 10 }} />}
								<AuditButton
									className={`${isMobile && 'm-auto mt-4'}`}
									onClick={() => window.open('https://hacken.io/audits/#bent_finance', '_blank')}
								>
									<img src={DocIcon} alt="DocIcon" />&nbsp;
									View Report
								</AuditButton>
							</div>
						</Col>
					</Row>
				</Container>
			</AuditSection>
			<BoostCrvSection>
				<Container className={`${isMobile ? 'text-center' : "d-flex"}`}>
					<BoostCrvTitle className="ml-auto">
						Boost
						<img src={DashboardDiagram9} alt="Icon" className="mx-2" />
						CRV Rewards
					</BoostCrvTitle>
					<StakeButton className={`btn btnshow ${isMobile && 'mt-3'}`} onClick={onStake}>
						<img src={StakeBlackIcon} alt="Icon" />
						&nbsp;Stake Now
					</StakeButton>
				</Container>
			</BoostCrvSection>
			<CommunitySection>
				<Container className={`${isMobile ? 'text-center' : "d-flex"}`}>
					<CommunityTitle
						style={{ width: isMobile ? 'inherit' : 150, marginBottom: isMobile ? 10 : 0 }}
					>JOIN OUR COMMUNITY :</CommunityTitle>
					<CommunityIcon src={DashboardTwitter} alt="CommunityIcon" onClick={() => openUrl(SOCIAL.TWITTER)} />
					<CommunityIcon src={DashboardTelegram} alt="CommunityIcon" onClick={() => openUrl(SOCIAL.TELEGRAM)} />
					<CommunityIcon src={DashboardGithub} alt="CommunityIcon" onClick={() => openUrl(SOCIAL.GIHUB)} />
				</Container>
			</CommunitySection>
		</React.Fragment>
	);
};

const TopHeader = styled.h1<{ mobile: boolean }>`
	font-style: normal;
	font-weight: bold;
	font-size: 83px;
	line-height: 83px;
	letter-spacing: -0.04em;
	color: white;
	${props => props.mobile && `
	font-size: 50px;
	line-height: 50px;
	`};
`;

const TopDiagram = styled.img<{ mobile: boolean }>`
	${props => props.mobile ? `
	width: inherit;
	` : `
	position: relative;
	margin-left: 300px;
	top: -120px;
	width: 800px;
	`}
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

const EarnCrvDiagram = styled.img<{ mobile: boolean }>`
	${props => props.mobile ? `
	width: inherit;
	` : `
	position: relative;
	margin-left: 450px;
	top: -120px;
	width: 600px;
	`}
`;

const PutCrvSection = styled.div`
	padding-top: 20px;
	padding-bottom: 20px;
`;

const PutCrvDiagram = styled.img<{ mobile: boolean }>`
	width: ${props => props.mobile ? 'inherit' : '470px'};
`;

const StakeBentSection = styled.div`
	background: #B5DEFF;
	padding-top: 20px;
	padding-bottom: 150px;
`;

const StakeBentDiagram = styled.img`
	width: 356px;
`;

const StakeBentDiagram2 = styled.img`
	position: relative;
	width: 70px;
`;

const AuditSection = styled.div`
	margin-top: 150px;
`;

const AuditTitle = styled.div`
	font-style: normal;
	font-weight: 500;
	font-size: 20px;
	line-height: 24px;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	color: #85878B;
`

const AuditDesc = styled.div`
	font-style: normal;
	font-weight: 500;
	font-size: 30px;
	line-height: 38px;
	letter-spacing: -0.2px;
`;

const AuditButton = styled.button`
	font-style: normal;
	font-weight: bold;
	font-size: 22px;
	line-height: 26px;
	letter-spacing: -0.24px;
	color: #10151D;
	background: linear-gradient(0deg, #c1ffd7, rgba(255,0,0,0) 70.71%);
	border: unset;
`

const BoostCrvSection = styled.div`
	margin-top: 115px;
`

const BoostCrvTitle = styled.div`
	text-align: center;
	font-style: normal;
	font-weight: bold;
	font-size: 48px;
	line-height: 56px;
	letter-spacing: -0.03em;
	font-feature-settings: 'ss01' on;
`

const CommunitySection = styled.div`
	margin-top: 144px;
	margin-bottom: 144px;
`

const CommunityTitle = styled.div`
	font-style: normal;
	font-weight: 500;
	font-size: 20px;
	line-height: 28px;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	margin-right: 100px;
`

const CommunityIcon = styled.img`
	width: 56px;
	margin-right: 32px;
	cursor: pointer;
	&:last-child {
		margin-right: 0;
	}
`

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
