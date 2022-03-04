import React, { useState } from "react";
import styled from "styled-components";
import {
	Row, Col, Input
} from "reactstrap";
import { DecimalSpan } from "components/DecimalSpan";
import { BigNumber, ethers, utils } from 'ethers';
import { TOKENS } from "constant";
import { useBentCvxEarned, useBentCvxPoolApr, useBentCvxRewards } from "hooks";
import { formatBigNumber } from "utils";

interface Props {
	poolKey: string
	poolInfo: {
		Pool: string,
		RewardsAssets: string[],
	}
	onClaimCheckChange: (key, indexes) => void
}

export const ClaimBentCvxRewarderMasterChef = (props: Props): React.ReactElement => {
	const [claimChecked, setClaimChecked] = useState<boolean>(false);
	const earned = useBentCvxEarned(props.poolKey);
	const rewards = useBentCvxRewards(props.poolKey);
	const apr = useBentCvxPoolApr(props.poolKey);

	const onClaimCheckChange = () => {
		setClaimChecked(!claimChecked);
		props.onClaimCheckChange(props.poolKey, { '0': !claimChecked });
	}

	return (
		<div className={`innerWrap p-0 rounded position-relative`} >
			<Wrapper
				className={`bentInner`}
				color="primary"
				id={`toggleInner-claim-bentCvx-${props.poolKey}`}
				collapsed={false}
			>
				<Row className="align-items-center" style={{ padding: '0 10px' }}>
					<Col>
						<div className="imgText">
							<PoolLogo src={TOKENS.BENT.LOGO} alt="" />
							<h4>BENT</h4>
						</div>
					</Col>
					<Col>
						<b>
							<span className="small">$</span>
							<DecimalSpan value={formatBigNumber(earned, 18, 2)} />
						</b><br />
						<span className="small text-muted">
							{formatBigNumber(BigNumber.from(rewards.length ? rewards[0] : ethers.constants.Zero), 18, 2)} BENT
						</span>
					</Col>
					<Col>
						<b>
							{apr ? <>{utils.commify(apr.toFixed(2))}%</> : 'TBC'}
						</b>
					</Col>
					<Col></Col>
					<Col></Col>
				</Row>
			</Wrapper>
			<div className="checkall-container">
				<Input type="checkbox" checked={claimChecked} onChange={onClaimCheckChange} />
			</div>
		</div>
	)
}

const PoolLogo = styled.img`
	max-width: 100px;
	height: 28px;
`

const Wrapper = styled.div<{ collapsed: boolean }>`
	cursor: pointer;
	padding: 10px;
`;