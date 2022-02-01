import React from "react";
import styled from "styled-components";
import { Col, Row, UncontrolledTooltip } from "reactstrap";
import { useTokenPrice, useBentCirculatingSupply, useWeBentBentBalance, useVlCvxBalance, useVotingPower } from "hooks";
import { TOKENS } from "constant";
import { formatMillionsBigNumber, formatBigNumber } from "utils";
import { utils, BigNumber } from "ethers";

interface Props {
	target: string;
}

export const BentPowerToolTip = (props: Props): React.ReactElement => {
	const bentPrice = useTokenPrice(TOKENS['BENT'].ADDR);
	const cvxPrice = useTokenPrice(TOKENS['CVX'].ADDR);
	const bentCirculatingSupply = useBentCirculatingSupply();
	const bentStaked = useWeBentBentBalance();
	const vlCvxBalance = useVlCvxBalance();
	const votingPower = useVotingPower();

	return (
		<UncontrolledTooltip className="bent-details" target={props.target} >
			<div style={{ padding: 15 }}>
				<Row>
					<Col md="5">BENT Price:</Col>
					<Col md="7" className="text-right">
						<b>
							${bentPrice.toString()}&nbsp;
							<a className="text-white" href="https://www.coingecko.com/en/coins/bent-finance" target="_blank" rel="noreferrer" >(Coingecko)</a>
						</b>
					</Col>
				</Row>
				<Row>
					<Col md="5">Marketcap:</Col>
					<Col md="7" className="text-right"><b>${
						formatMillionsBigNumber(utils.parseEther(bentPrice.toString()).mul(bentCirculatingSupply).div(BigNumber.from(10).pow(18)))
					}</b></Col>
				</Row>
				<Row>
					<Col md="5">Circulating Supply:</Col>
					<Col md="7" className="text-right"><b>{formatBigNumber(bentCirculatingSupply, 18, 2)} BENT</b></Col>
				</Row>
				<Row>
					<Col md="5">Staked BENT:</Col>
					<Col md="7" className="text-right">
						<b>
							{formatBigNumber(bentStaked, 18, 2)} BENT&nbsp;
							(${formatMillionsBigNumber(utils.parseEther(bentPrice.toString()).mul(bentStaked).div(BigNumber.from(10).pow(18)))})
						</b>
					</Col>
				</Row>
				<Row>
					<Col md="5">vlCVX:</Col>
					<Col md="7" className="text-right">
						<b>
							{formatBigNumber(vlCvxBalance, 18, 2)}&nbsp;
							(${formatMillionsBigNumber(utils.parseEther(cvxPrice.toString()).mul(vlCvxBalance).div(BigNumber.from(10).pow(18)))})
						</b>
					</Col>
				</Row>
			</div>
			<VotingPowerContainer>
				<Row>
					<Col md="5"><b>Voting Power</b></Col>
					<Col md="7" className="text-right">
						$1 weBENT = ${votingPower} vlCVX
					</Col>
				</Row>
			</VotingPowerContainer>
		</UncontrolledTooltip>
	)
}

const VotingPowerContainer = styled.div`
  background: #C1FFD7;
  padding: 15px;
  color: black;
`;