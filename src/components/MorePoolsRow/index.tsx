import React from "react";

interface Props {
	title: string;
	visible: boolean
	onShowMore: () => void
	iconClass?: string;
	showIcon?: string;
	iconPlacement?: "Start" | "End";
}

export const MorePoolsRow = (props: Props): React.ReactElement => {
	const icon = () => {
		return <i
			className={`fa ${props.iconClass ?? 'fa-caret-down'}`}
			aria-hidden="true"
			style={{
				paddingLeft: props.iconPlacement === 'Start' ? 0 : 15,
				paddingRight: props.iconPlacement === 'Start' ? 15 : 0,
			}}
		></i>
	}
	return (
		<div className={`innerWrap p-0 rounded ${props.visible ? '' : 'd-none'}`} >
			<div className="text-center btnwrap">
				<button className="btn btnshow" onClick={() => props.onShowMore()}>
					{props.iconPlacement === "Start" && icon()}
					{props.title}
					{props.iconPlacement !== "Start" && icon()}
				</button>
			</div>
		</div>
	)
}