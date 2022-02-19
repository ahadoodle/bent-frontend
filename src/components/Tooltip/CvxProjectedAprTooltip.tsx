import React from "react";
import { Col, Row, UncontrolledTooltip } from "reactstrap";
import { formatBigNumber } from "utils";
import { BigNumber, utils } from 'ethers';
import { CrvApy } from "state/contracts/reducer";

interface Props {
	target: string;
	apr: number;
	projectedApr: CrvApy;
	hasExtra: boolean;
	extraSymbol?: string;
}

export const CvxProjectedAprTooltip = (props: Props): React.ReactElement => {
	return (
		<UncontrolledTooltip target={props.target} className="bent-details" placement="bottom">
			<div style={{ padding: 15, lineHeight: '18px' }}>
				<Row className="mb-3">
					<Col>
						<div className="text-underline">Current APR:</div>
						<div className="green-color">{utils.commify(props.apr.toFixed(2))}%</div>
					</Col>
					<Col>
						<div className="text-underline">Projected APR:</div>
						<div className="green-color">{formatBigNumber(
							BigNumber.from(props.projectedApr.baseCrvvApr)
								.add(props.projectedApr.crvvApr)
								.add(props.projectedApr.cvxvApr)
								.add(props.projectedApr.bentApr)
								.add(props.projectedApr.additionalRewardvApr), 2, 2)}%
						</div>
					</Col>
				</Row>

				Projected APR breakdown:<br />
				- Base Curve APR: {formatBigNumber(props.projectedApr.baseCrvvApr, 2, 2)}%<br />
				- CRV APR(incl {props.projectedApr.crvBoost}x boost): {formatBigNumber(props.projectedApr.crvvApr, 2, 2)}%<br />
				- CVX APR: {formatBigNumber(props.projectedApr.cvxvApr, 2, 2)}%<br />
				- BENT APR: {formatBigNumber(props.projectedApr.bentApr, 2, 2)}%<br />
				{props.hasExtra && <>
					- Extras ({props.extraSymbol}) APR: {formatBigNumber(props.projectedApr.additionalRewardvApr, 2, 2)}%<br />
				</>}
				<br />
				Fees (already deducted from all figures shown):<br />
				- 10% distributed to bentCVX stakers<br />
				- 6% distributed to BENT stakers<br />
				- 1% operation fees for harvesters
			</div>
		</UncontrolledTooltip>
	)
}