import React from 'react';
import styled from 'styled-components';
import { truncateMiddle } from 'utils';

interface Props {
	showCopy?: boolean
	color?: string,
	address?: string | undefined | null,
	length?: number
}

const Address = (props: Props): React.ReactElement => {
	return (
		<Container color={props.color || '#703FFF'}>
			{props.address ? truncateMiddle(props.address, props.length || 20, '.....') : '0x00'}
		</Container>
	)
}

const Container = styled.div<Props>`
	width: fit-content;
	color: ${({ color }) => color};
	&:hover {
		color: ${({ color }) => color === 'white' ? color : '#0d6efd'};
	}
`;

export default Address;