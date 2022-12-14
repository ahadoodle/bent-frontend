import React from 'react';
import styled from "styled-components";

interface ButtonProps {
	children?: React.ReactNode;
	disabled?: boolean;
	href?: string;
	onClick?: () => void;
	text?: string;
	to?: string;
	loading?: boolean;
	style?: React.CSSProperties
	variant?: 'default' | 'green'
}

export const Button = (props: ButtonProps): React.ReactElement => {
	return (
		<Container
			disabled={props.disabled}
			onClick={props.onClick}
			style={props.style}
			variant={props.variant}
		>
			{props.children}
		</Container>
	)
}

const Container = styled.button<{ variant?: 'default' | 'green' }>`
	font-style: normal;
	font-weight: 500;
	font-size: 16px;
	line-height: 19px;
	letter-spacing: -0.24px;
  text-align: center;
	background: transparent;
	border-radius: 20px;
	padding: 8px 15px;
	${props => props.variant === 'green' ?
		`
	border: 2px solid #C1FFD7;
	color: #C1FFD7;
	`: `
	border: 2px solid #414c5c;
	color: white;
	`}
	&:hover {
		box-shadow: ${props => (props.disabled ? 'none' : `0px 0px 20px ${props.variant === 'green' ? 'rgba(193, 255, 215, 0.4)' : 'rgba(64, 76, 92, 0.4)'}`)};
	}
	transition: box-shadow .2s;
`;