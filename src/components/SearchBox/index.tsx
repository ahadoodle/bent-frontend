import React, { useState } from "react";
import { Input, Label } from "reactstrap";
import styled from "styled-components";

interface Props {
	className?: string
	onChange: (value) => void
}

export const SearchBox = (props: Props): React.ReactElement => {
	const [value, setValue] = useState('');

	const onChangeValue = (newValue) => {
		setValue(newValue);
		props.onChange(newValue);
	}

	return (
		<Container className={props.className}>
			<InputLabel className="text-white" >Search Pools</InputLabel>
			<InputContainer >
				<SearchInput
					onChange={e => onChangeValue(e.target.value)}
					value={value}
				/>
				<FieldSet>
					<Legend>Search Pools</Legend>
				</FieldSet>
			</InputContainer>
		</Container>
	)
}

const Container = styled.div`
	display: inline-flex;
	position: relative;
	flex-direction: column;
	vertical-align: top;
	border: 0;
	min-width: 0;
`

const InputLabel = styled(Label)`
	position: absolute;
	top: 0;
	left: 0;
	transform: translate(25px,-12px);
	font-size: 14px;
`;

const InputContainer = styled.div`
	position: relative;
`

const SearchInput = styled(Input)`
	padding: 5px 15px;
	background-color: transparent;
	border: none;
	color: white;
	&:hover {
		background-color: transparent;
		color: white;
		border: none;
	}
	&:focus {
		background-color: transparent;
		color: white;
		border: none;
		outline: 0;
		box-shadow: unset;
	}
`

const FieldSet = styled.fieldset`
	top: -5px;
	left: 0;
	right: 0;
	bottom: 0;
	padding: 0 8px;
	overflow: hidden;
	position: absolute;
	border: 3px solid #606f85;
	border-radius: 20px;
	pointer-events: none;
`

const Legend = styled.legend`
	margin-left: 10px;
	width: auto;
	height: 11px;
	font-size: 14px;
	padding: 5px;
	visibility: hidden;
	float: unset;
`;