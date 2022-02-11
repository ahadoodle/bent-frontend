import React, { Props } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { Button, Col, Container, Row } from "reactstrap";
import DashboardDiagram1 from 'assets/images/dashboard-diagram-1.png';
import StakeIcon from 'assets/images/stake-icon.svg';
import { DecimalSpan } from "components/DecimalSpan";
import { formatBigNumber } from "utils";
import { useTotalTvl } from "hooks";

interface MetricsProps {
	title: string;
	children: React.ReactElement
}

const Metrics = (props: MetricsProps) => {
	return (
		<div className="text-white">
			<span className="small">{props.title}</span><br />
			{props.children}
		</div>
	)
}

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
							<TopDiagram className="" src={DashboardDiagram1} alt="Icon" />
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

const MetricsValue = styled.h4`
	font-size: 20px;
`;

export default withRouter(Dashboard);
