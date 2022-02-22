import React, { useEffect, useRef } from 'react'
import Jazzicon from '@metamask/jazzicon'
import styled from 'styled-components'
import { useActiveWeb3React } from 'hooks'

interface Props {
	size?: number,
	address?: string
}

const AccountIcon = (props: Props): React.ReactElement => {
	const size = props.size || 20
	const addressOverride = props.address

	const { account } = useActiveWeb3React()
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const accountIconRef = useRef<any>(null)

	useEffect(() => {
		const address = addressOverride || account
		if (address && accountIconRef.current) {
			accountIconRef.current.innerHTML = ''
			accountIconRef.current.appendChild(Jazzicon(size, parseInt(address.slice(2, 10), 16)))
		}
	}, [account, accountIconRef, addressOverride, size])

	return (
		<Container>
			<AccountIconContainer ref={accountIconRef} size={size} />
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	align-items: center;
  justify-content: center;
  height: 60px;
  width: 60px;
  overflow: hidden;
  margin: 23px 0px;
  border-radius: 50%;
	border: 3px solid #414C5C;
`

const AccountIconContainer = styled.div<{ size: number }>`
  height: ${({ size }) => `${size}px`};
  width: ${({ size }) => `${size}px`};
	border-radius: 50%;
`

export { AccountIcon }
