import React from 'react';
import styled from 'styled-components';

interface IconProps {
	iconSrc: any,
	to?: string,
	borderType?: 'solid' | 'dashed' | 'none',
	borderColor?: string,
	padding?: number,
	style?: React.CSSProperties
}

export const Icon = (props: IconProps) => {
	return (
		<Container
			style={props.style}
			src={props.iconSrc}
			to={props.to}
			borderType={props.borderType || 'solid'}
			borderColor={props.borderColor || 'white'}
			onClick={() => {
				props.to && window.open(props.to, '_blank');
			}}
		/>
	)
}

const Container = styled.div<{ src: string, to?: string, borderType: string, borderColor: string }>`
	margin: 10px;
	width: 30px;
	height: 30px;
	border: 1px ${props => `${props.borderType} ${props.borderColor}`};
	box-sizing: border-box;
	border-radius: 77px;
	background: url(${(props) => props.src}) center, linear-gradient(102.05deg, rgba(202, 184, 255, 0.15) -0.64%, rgba(0, 0, 0, 0) 98.13%);
	background-repeat: no-repeat;
	&:hover {
		${props => props.to ? `
		cursor: pointer;
		filter: drop-shadow(0px 0px 5px #CAB8FF);
		` : ''}
	}
`;