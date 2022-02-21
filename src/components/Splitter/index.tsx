import React from "react";

export const SplitterH = (): React.ReactElement => {
	return (
		<div style={{ height: 1, background: '#677389', margin: '10px 0' }}></div>
	)
}

export const SplitterV = (): React.ReactElement => {
	return (
		<div style={{ width: 1, background: '#677389', margin: '0 10px' }}></div>
	)
}