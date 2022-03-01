import { TOKENS } from "constant";
import React from "react";
import { formatBigNumber } from "utils";
import { BigNumber } from 'ethers';
import { Input } from "reactstrap";

interface Props {
	index: number
	tokenKey: string,
	rewardUsd: BigNumber,
	reward: BigNumber,
	apr: number,
	checked: boolean
	onChange: (index, add) => void
}

export const ClaimWeBentRewardItem = (props: Props): React.ReactElement => {
	const { tokenKey } = props
	return (
		<div className={`imgText bent-rewards-item ${tokenKey === 'SPELL' || (props.apr < 0.01 && !props.rewardUsd.gte(BigNumber.from(10).pow(16))) ? 'd-none' : ''}`}>
			<img src={TOKENS[tokenKey].LOGO} alt="Icon" width="28" />
			<div style={{ minWidth: 100 }}>
				<h4 className="mb-0">{TOKENS[tokenKey].SYMBOL}</h4>
				<p className="apr">{props.apr}% APR</p>
			</div>
			<div style={{ minWidth: 100 }}>
				<h4 className="mb-0"><span className="small">$</span>{formatBigNumber(props.rewardUsd, 18, 2)}</h4>
				<p className="rewards-token">{formatBigNumber(props.reward, TOKENS[tokenKey].DECIMALS)} {TOKENS[tokenKey].SYMBOL}</p>
			</div>
			<div className="claim-reward">
				<Input type="checkbox" checked={props.checked} onChange={e => props.onChange(props.index, e.target.checked)} />
			</div>
		</div>
	)
}