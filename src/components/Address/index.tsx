import React from 'react';
import styled from 'styled-components';
import { truncateMiddle } from 'utils';

interface Props {
	showCopy?: boolean
	color?: string,
	address?: string | undefined | null,
	length?: number
}

const Address = (props: Props) => {
	return (
		<Container color={props.color || 'white'}>
			{props.address ? truncateMiddle(props.address, props.length || 15, '.....') : '0x00'}
		</Container>
	)
}

const Container = styled.div<Props>`
	color: ${({ color }) => color};
`;

export default Address;