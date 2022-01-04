import React from "react";

interface Props {
	logo: string,
	title: string,
	apr: number,
}

export const StakeBentRewardItem = (props: Props): React.ReactElement => {
	return (
		<div className={`imgText bent-rewards-item ${props.apr < 0.01 ? 'd-none' : ''}`}>
			<img src={props.logo} alt="Icon" width="28" />
			<div className="">
				<h4 className="mb-0">{props.title}</h4>
				<p className="apr">{props.apr}% APR</p>
			</div>
		</div>
	)
}