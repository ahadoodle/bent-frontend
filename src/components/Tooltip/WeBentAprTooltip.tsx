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
		return parseFloat((bentAprs[TOKENS.BENTCVX.ADDR.toLowerCase()] || 0).toString());
	}

	const extraApr = () => {
		let apr = 0;
		POOLS.weBENT.RewardAssets.forEach(key => {
			apr += key === 'BENTCVX' ? 0 : (bentAprs[TOKENS[key].ADDR.toLowerCase()] || 0);
		})
		return parseFloat(apr.toFixed(2));
	}

	return (
		<UncontrolledTooltip target='webent-apr-info' className="bent-details" placement="bottom">
			<div style={{ padding: 15, lineHeight: '18px' }}>
				<Row className="mb-3">
					<Col>
						<div className="text-underline">Current APR:</div>
						<div className="green-color">{utils.commify(avgApr.toFixed(2))}%</div>
					</Col>
				</Row>
				APR breakdown:<br />
				- weBENT APR: {utils.commify(weBentApr.toFixed(2))}%<br />
				- bentCVX APR: {utils.commify(bentCvxApr().toFixed(2))}%<br />
				- Extras APR: {utils.commify(extraApr().toFixed(2))}%<br /><br />
				Extras APR breakdown:<br />
				{POOLS.weBENT.RewardAssets.map(key =>
					key !== 'BENTCVX' && (<div key={key}>
						- {TOKENS[key].SYMBOL} APR: {utils.commify(parseFloat((bentAprs[TOKENS[key].ADDR.toLowerCase()] || 0).toFixed(2)))}%<br />
					</div>)
				)}
			</div>
		</UncontrolledTooltip>
	)
}