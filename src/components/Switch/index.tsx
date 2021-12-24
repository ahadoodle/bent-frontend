import React, { useState } from "react";
import { Input, Label } from "reactstrap";

interface Props {
	label: string
	onChange: (value) => void
	defaultValue?: boolean
	className?: string
	labelClassName?: string
}

export const SwitchSlider = (props: Props): React.ReactElement => {
	const [check, setCheck] = useState<boolean>(props.defaultValue ?? false);

	const onChange = () => {
		setCheck(!check);
		props.onChange(!check);
	}

	return (
		<div className={`advance-btn ${props.className}`}>
			<Label className="switch">
				<Input type="checkbox" checked={check} onChange={onChange} />
				<span className="slider"></span>
			</Label>
			<span className={`textadvance ${props.labelClassName}`}>{props.label}</span>
		</div>
	)
}