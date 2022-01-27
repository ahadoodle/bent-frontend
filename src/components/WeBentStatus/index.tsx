import React from "react";
import styled from "styled-components";
import {
	Container, Button, Row, Col, UncontrolledTooltip
} from "reactstrap";
import { useTheme, useVotingPower, useWeBentAvgApr, useWeBentBentBalance } from "hooks";
import { Theme } from "state/application/reducer";
import { formatBigNumber } from "utils";
import { utils } from "ethers";
import { useHistory } from "react-router";

export const WeBentStatus = (): React.ReactElement => {
	const theme = useTheme();
	const bentTotalStaked = useWeBentBentBalance();
	const avgApr = useWeBentAvgApr();
	const votingPower = useVotingPower();
	const history = useHistory();

	const onBent = () => {
		history.push('/lock');
	}

	return (
		<Container className="stake-bent">
			<Row>
				<Col md="12">
					<div className="convert-up">
						<h2 className="white section-header">
							Stake BENT for weBENT
						</h2>
					</div>
					<StatusContainer theme={theme}>
						<Button
							className="transBtn px-5"
							onClick={() => onBent()}
						>BENT to weBENT</Button>
						<StatusButton
							className="approvebtn px-5"
							id="webent-status-voting-power"
						>1 weBENT = {votingPower} vlCVX</StatusButton>
						<UncontrolledTooltip
							target="webent-status-voting-power"
							className="bent-details p-3"
							placement="bottom"
						>
							<div style={{ padding: 15, lineHeight: '10px', textAlign: 'center' }}>weBENT Voting Power</div>
						</UncontrolledTooltip>
						<div className="divider-left p-0"></div>
						<StatusButton
							className="approvebtn px-4"
						>{formatBigNumber(bentTotalStaked, 18, 2)} BENT Locked</StatusButton>
						<div className="divider-left p-0"></div>
						<StatusButton
							className="approvebtn px-4"
						>{avgApr ? utils.commify(avgApr) : 'TBC'} % APR</StatusButton>
					</StatusContainer>
				</Col>
			</Row>
		</Container>
	)
}

const StatusContainer = styled.div<{ theme: Theme }>`
	border: 3px solid #414C5C;
	border-radius: 8px;
	background: #18202C;
	display: flex;
	padding: 21px;
	justify-content: space-between;
	box-shadow: 10px 15px 0px 0px #607390;
`;

const StatusButton = styled.div`
	font-style: normal;
	font-weight: bold;
	font-size: 16px;
	line-height: 15px;
	text-align: center;
	letter-spacing: -0.24px;
	min-width: 185px;
	width: max-content !important;
	background: transparent !important;
	border: none !important;
	color: white !important;
	height: 42px;
	padding: 13px;
`;