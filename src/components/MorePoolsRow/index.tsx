import React from "react";

interface Props {
	visible: boolean
	onShowMore: () => void
}

export const MorePoolsRow = (props: Props): React.ReactElement => {
	return (
		<div className={`innerWrap p-0 rounded ${props.visible ? '' : 'd-none'}`} >
			<div className="text-center btnwrap">
				<button className="btn btnshow" onClick={() => props.onShowMore()}>
					More Pools
					<i
						className="fa fa-caret-down"
						aria-hidden="true"
					></i>
				</button>
			</div>
		</div>
	)
}