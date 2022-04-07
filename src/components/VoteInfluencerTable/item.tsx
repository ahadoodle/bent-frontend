import React from "react";
import styled from "styled-components";
import { Col, Row } from "reactstrap";
import { Voter } from "state/contracts/reducer";
import { formatAddress, formatBigNumber } from "utils";
import { utils } from "ethers";
import { useIsMobile, useTotalVp } from "hooks";
import { ViewOnExp } from "components/ViewOnExp";
import { CopyAddress } from "components/CopyAddress";

interface Props {
	voter: Voter
}

export const VoteInfluencerItem = (props: Props): React.ReactElement => {
	const isMobile = useIsMobile();
	const totalVp = useTotalVp();
	return <div className={`innerWrap p-0 rounded `} >
		<div
			className={`bentInner`}
			color="primary"
			id={`toggleInner-stake-curve-lp-${props.voter.id}`}
			style={{ marginBottom: "1rem" }}
		>
			<Row className="align-items-center" style={{ padding: '0 10px' }}>
				<Col style={{ flex: '1.3 0' }}>
					<div className="imgText">
						<PoolLogo src={`https://stamp.fyi/avatar/eth:${props.voter.voter}?s=36`} alt="" />
						<h4>
							{props.voter.ens !== '' ? props.voter.ens :
								(isMobile ? formatAddress(props.voter.voter, 12) : props.voter.voter)
							}
						</h4>
						<ViewOnExp address={props.voter.voter} style={{ marginLeft: isMobile ? 10 : 30, marginRight: 5 }} />
						<CopyAddress address={props.voter.voter} style={{ marginLeft: 0 }} />
					</div>
				</Col>
				<Col style={{ flex: '0.7 0' }}>
					{formatBigNumber(utils.parseEther(props.voter.vp.toString()), 18, 2)}
					<span className="small"> weBENT</span><br />
					<span className="small text-muted">{(props.voter.vp * 100 / totalVp).toFixed(2)}%</span>
				</Col>
			</Row>
		</div>
	</div>;
}

const PoolLogo = styled.img`
	width: 28px;
	border-radius: 50%;
`