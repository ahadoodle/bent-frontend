import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import linkSvg from 'assets/images/linkicon.svg'
import { Icon } from 'components/Icon'
import { getEtherscanLink } from 'utils'
import { ethers } from 'ethers'

interface Props {
	address?: string | undefined | null,
	showTitle?: boolean
}

export const ViewOnExp = (props: Props): React.ReactElement => {
	const [copySuccess, setCopySuccess] = useState(false)
	const link = getEtherscanLink(props.address || ethers.constants.AddressZero);

	useEffect(() => {
		if (copySuccess) setTimeout(() => setCopySuccess(false), 2500)
	}, [copySuccess])

	function openExp() {
		window.open(link, '_blank');
	}

	return (
		<Container onClick={openExp}>
			<Icon iconSrc={linkSvg} borderColor="#CAB8FF" to={link} style={{ marginLeft: 0 }} />
			{props.showTitle && 'View on Etherscan'}
		</Container>
	)
}

const Container = styled.div`
  ${props => accountLinkStyle(props.theme)}
`
const accountLinkStyle = (props) => (`
	display: flex;
	align-items: center;
	justify-content: center;
  font-size: 14px;
  margin-right: 16px;
  color: #C1EAF8;
  text-decoration: none;
  cursor: pointer;
`)