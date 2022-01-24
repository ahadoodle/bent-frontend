import React from "react";
import styled from "styled-components";
import {
	Container, Button, Row, Col
} from "reactstrap";
import { useTheme, useTokenPrice, useVlCvxBalance, useWeBentBentBalance } from "hooks";
import { Theme } from "state/application/reducer";
import { formatBigNumber } from "utils";
import { TOKENS } from "constant";
import { BigNumber, utils } from "ethers";

export const WeBentStatus = (): React.ReactElement => {
	const theme = useTheme();
	const vlCvxBalance = useVlCvxBalance();
	const bentTotalStaked = useWeBentBentBalance();
	const bentPrice = useTokenPrice(TOKENS['BENT'].ADDR);
	const cvxPrice = useTokenPrice(TOKENS['CVX'].ADDR);

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
						>BENT to weBENT</Button>
						<div className="divider-left p-0"></div>
						<StatusButton
							className="approvebtn px-5"
							disabled={true}
						>1 weBENT = {
								utils.commify(((utils.parseEther(cvxPrice.toString()).mul(vlCvxBalance).div(BigNumber.from(10).pow(16)).div(
									utils.parseEther(bentPrice.toString()).mul(bentTotalStaked).div(BigNumber.from(10).pow(18))
								)).toNumber() / 100).toFixed(2))
							} vlCVX</StatusButton>
						<StatusButton
							className="approvebtn px-4"
							disabled={true}
						>{formatBigNumber(bentTotalStaked, 18, 2)} BENT Locked</StatusButton>
						<StatusButton
							className="approvebtn px-4"
							disabled={true}
						>123 % APR</StatusButton>
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
`;