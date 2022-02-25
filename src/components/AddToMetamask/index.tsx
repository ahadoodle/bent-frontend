import React from 'react'
import styled from 'styled-components'
import addSvg from 'assets/images/plus.svg'
import { Icon } from 'components/Icon'
import { useActiveWeb3React } from 'hooks'

interface Props {
	address: string | undefined | null,
	symbol?: string
	img?: string
	showTitle?: boolean
}

export const AddToMetamask = (props: Props): React.ReactElement => {
	const { connector } = useActiveWeb3React()

	function addToMetamask() {
		connector?.getProvider().then(provider => {
			provider.request({
				method: 'wallet_watchAsset',
				params: {
					type: 'ERC20',
					options: {
						address: props.address,
						symbol: props.symbol,
						decimals: 18,
						// image: 'https://assets.coingecko.com/coins/images/21274/small/bent-logo-200x200.png?1638861325',
						image: props.img,
					},
				},
			})
		})
	}

	return (
		<Container onClick={addToMetamask}>
			<Icon
				iconSrc={addSvg}
				borderColor="#CAB8FF"
				style={{ marginLeft: 0, margin: props.showTitle ? 10 : 0, width: 25, height: 25 }}
				highlight={true}
			/>
			{props.showTitle && 'Add to Metamask'}
		</Container>
	)
}

export const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 14px;
	color: #C1EAF8;
	text-decoration: none;
	cursor: pointer;
	margin-left: 10px;
`