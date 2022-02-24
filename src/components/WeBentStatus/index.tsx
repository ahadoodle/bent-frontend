import React from "react";
import styled from "styled-components";
import {
	Container, Button, Row, Col, UncontrolledTooltip
} from "reactstrap";
import {
	useIsMobile,
	useTheme,
	useTokenPrice,
	useVotingPower,
	useWeBentAvgApr,
	useWeBentBentBalance,
	useWeBentRatio
} from "hooks";
import { Theme } from "state/application/reducer";
import { formatBigNumber } from "utils";
import { utils } from "ethers";
import { useHistory } from "react-router";
import { TOKENS } from "constant";

export const WeBentStatus = (): React.ReactElement => {
	const theme = useTheme();
	const bentTotalStaked = useWeBentBentBalance();
	const avgApr = useWeBentAvgApr();
	const votingPower = useVotingPower();
	const webentRatio = useWeBentRatio();
	const cvxPrice = useTokenPrice(TOKENS.CVX.ADDR);
	const bentPrice = useTokenPrice(TOKENS.BENT.ADDR);
	const history = useHistory();
	const isMobile = useIsMobile();

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
					<StatusContainer theme={theme} mobile={isMobile}>
						<Button
							className="transBtn px-5"
							onClick={() => onBent()}
						>BENT to weBENT</Button>
						<StatusButton
							className={`px-5 ${isMobile && 'mt-3'}`}
							id="webent-status-voting-power"
							mobile={isMobile}
						>
							1 BENT = {formatBigNumber(votingPower, 2, 2)} CVX<br />
						</StatusButton>
						<UncontrolledTooltip
							target="webent-status-voting-power"
							className="bent-details p-3"
							placement="bottom"
						>
							<div style={{ padding: 15, lineHeight: '10px' }}>
								<div style={{ textDecoration: 'underline' }}>BENT Voting Power</div><br /><br />
								<div>1 BENT (${bentPrice}) = {formatBigNumber(votingPower, 2, 2)} CVX (${formatBigNumber(utils.parseEther(cvxPrice.toString()).mul(votingPower), 20, 2)})</div><br />
								<div>{webentRatio} BENT = 1 weBENT</div>
							</div>
						</UncontrolledTooltip>
						<div className="divider-left p-0"></div>
						<StatusButton
							className="px-4"
							mobile={isMobile}
						>
							{formatBigNumber(bentTotalStaked, 18, 2)}&nbsp;
							<span className="small">BENT Staked</span>
						</StatusButton>
						<div className="divider-left p-0"></div>
						<APRStatus
							className="px-4"
							mobile={isMobile}
						>{avgApr ? utils.commify(avgApr.toFixed(2)) : 'TBC'} % APR</APRStatus>
					</StatusContainer>
				</Col>
			</Row>
		</Container>
	)
}

const StatusContainer = styled.div<{ theme: Theme, mobile: boolean }>`
	border: 3px solid #414C5C;
	border-radius: 20px;
	background: #18202C;
	display: flex;
	flex-direction: ${props => props.mobile ? 'column' : 'row'};
	padding: 21px;
	justify-content: space-between;
	box-shadow: 10px 10px 0px 0px #607390;
`;

const StatusButton = styled.div<{ mobile: boolean }>`
	font-style: normal;
	font-weight: bold;
	font-size: 16px;
	line-height: 15px;
	text-align: center;
	letter-spacing: -0.24px;
	min-width: 185px;
	${props => !props.mobile && 'width: max-content;'}
	background: transparent;
	border: none;
	color: white;
	height: 42px;
	padding: 13px;
`;

const APRStatus = styled(StatusButton)`
	color: #C1FFD7;
`;