import React from "react";
import { Col, Row, UncontrolledTooltip } from "reactstrap";
import { POOLS, TOKENS } from "constant";
import { utils } from "ethers";
import { useWeBentApr, useWeBentAvgApr, useWeBentRewardsAprs } from "hooks";

export const WeBentAprTooltip = (): React.ReactElement => {
	const avgApr = useWeBentAvgApr();
	const weBentApr = useWeBentApr();
	const bentAprs = useWeBentRewardsAprs();

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
				{POOLS.weBENT.RewardAssets.map(key =>
					<>
						- {TOKENS[key].SYMBOL} APR: {utils.commify(bentAprs[TOKENS[key].ADDR.toLowerCase()])}%
					</>
				)}
			</div>
		</UncontrolledTooltip>
	)
}