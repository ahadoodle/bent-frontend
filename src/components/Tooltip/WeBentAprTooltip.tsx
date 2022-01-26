import React from "react";
import { Col, Row, UncontrolledTooltip } from "reactstrap";
import { POOLS, TOKENS } from "constant";
import { utils } from "ethers";
import { useWeBentApr, useWeBentAvgApr, useWeBentRewardsAprs } from "hooks";

export const WeBentAprTooltip = (): React.ReactElement => {
	const avgApr = useWeBentAvgApr();
	const weBentApr = useWeBentApr();
	const bentAprs = useWeBentRewardsAprs();

	const bentCvxApr = () => {
		return bentAprs[TOKENS.BENTCVX.ADDR.toLowerCase()];
	}

	const extraApr = () => {
		let apr = 0;
		POOLS.weBENT.RewardAssets.forEach(key => {
			apr += key === 'BENTCVX' ? 0 : bentAprs[TOKENS[key].ADDR.toLowerCase()];
		})
		return apr;
	}

	return (
		<UncontrolledTooltip target='webent-apr-info' className="bent-details" placement="bottom">
			<div style={{ padding: 15, lineHeight: '18px' }}>
				<Row className="mb-3">
					<Col>
						<div className="text-underline">Current APR:</div>
						<div className="green-color">{utils.commify(avgApr)}%</div>
					</Col>
				</Row>
				APR breakdown:<br />
				- weBENT APR: {utils.commify(weBentApr)}%<br />
				- bentCVX APR: {utils.commify(bentCvxApr())}%<br />
				- Extras APR: {utils.commify(extraApr())}%<br />
			</div>
		</UncontrolledTooltip>
	)
}