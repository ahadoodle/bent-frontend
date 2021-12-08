import React from 'react';

interface Props {
	value: string
}

export const DecimalSpan = (props: Props): React.ReactElement => {
	return (
		<>
			{props.value.split('.')[0]}.
			<span className="small">{props.value.split('.')[1]}</span>
		</>
	)
}