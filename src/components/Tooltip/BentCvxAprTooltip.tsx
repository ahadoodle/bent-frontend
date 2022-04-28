import React from "react";
import { Col, Row, UncontrolledTooltip } from "reactstrap";
import { utils } from "ethers";
import { useBentCvxAvgApr, useBentCvxPoolApr } from "hooks";

export const BentCvxAprTooltip = (): React.ReactElement => {
	const avgApr = useBentCvxAvgApr();
	const bentPoolApr = useBentCvxPoolApr('BENT');
	const mcPoolApr = useBentCvxPoolApr('MC');

	return (
		<UncontrolledTooltip target='bentcvx-apr-info' className="bent-details" placement="bottom">
			<div style={{ padding: 15, lineHeight: '18px' }}>
				<Row className="mb-3">
					<Col>
						<div className="text-underline">Current APR:</div>
						<div className="green-color">{utils.commify(avgApr.toFixed(2))}%</div>
					</Col>
				</Row>
				APR breakdown:<br />
				- Bent Platform Earnings: {utils.commify(bentPoolApr.toFixed(2))}%<br />
				- BENT: {utils.commify(mcPoolApr.toFixed(2))}%<br />
			</div>
		</UncontrolledTooltip>
	)
}