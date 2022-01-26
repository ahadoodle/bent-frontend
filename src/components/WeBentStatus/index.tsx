import React from "react";
import styled from "styled-components";
import {
	Container, Button, Row, Col, UncontrolledTooltip
} from "reactstrap";
import { useTheme, useTokenPrice, useVlCvxBalance, useWeBentAvgApr, useWeBentBentBalance } from "hooks";
import { Theme } from "state/application/reducer";
import { formatBigNumber } from "utils";
import { TOKENS } from "constant";
import { BigNumber, utils } from "ethers";
import { useHistory } from "react-router";

export const WeBentStatus = (): React.ReactElement => {
	const theme = useTheme();
	const vlCvxBalance = useVlCvxBalance();
	const bentTotalStaked = useWeBentBentBalance();
	const bentPrice = useTokenPrice(TOKENS['BENT'].ADDR);
	const cvxPrice = useTokenPrice(TOKENS['CVX'].ADDR);
	const avgApr = useWeBentAvgApr();
	const history = useHistory();

	const votingPower = () => {
		const bentTvl = utils.parseEther(bentPrice.toString()).mul(bentTotalStaked).div(BigNumber.from(10).pow(18));
		return bentTvl.isZero() ? 0 : utils.commify(((utils.parseEther(cvxPrice.toString()).mul(vlCvxBalance).div(BigNumber.from(10).pow(16)).div(bentTvl)).toNumber() / 100).toFixed(2))
	}

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
							className="approvebtn"
							onClick={() => onBent()}
						>BENT to weBENT</Button>
						<div className="divider-left p-0"></div>
						<StatusButton
							className="approvebtn px-5"
							id="webent-status-voting-power"
						>1 weBENT = {votingPower()} vlCVX</StatusButton>
						<UncontrolledTooltip
							target="webent-status-voting-power"
							className="bent-details p-3"
							placement="bottom"
						>
							<div style={{ padding: 15, lineHeight: '10px', textAlign: 'center' }}>weBENT Voting Power</div>
						</UncontrolledTooltip>
						<StatusButton
							className="approvebtn px-4"
						>{formatBigNumber(bentTotalStaked, 18, 2)} BENT Locked</StatusButton>
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
	padding: 21px 16px;
	justify-content: space-between;
`;

const StatusButton = styled(Button)`
	min-width: 185px;
	width: max-content !important;
	background: transparent !important;
	border: 2px solid #9BA2AC !important;
	color: #FAFAFA !important;
	opacity: .65;
`;