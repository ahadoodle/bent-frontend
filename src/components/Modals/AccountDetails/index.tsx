import React from 'react';
import styled from 'styled-components'
import { Modal } from 'components/Modal'
import { useEthers } from 'hooks'
import connectSvg from 'assets/images/connect.svg'
import { Button } from 'components/Button';
import Address from 'components/Address';
import { ViewOnExp } from 'components/ViewOnExp';
import { CopyAddress } from 'components/CopyAddress';
import { AccountIcon } from 'components/Avatar';

interface Props {
	isShown: boolean
	activeConnector?: string
	onRequestClose: () => void
	handleChangeConnector: (willChange: boolean) => void
}

export const AccountDetailsModal = (props: Props): React.ReactElement => {
	const {
		isShown,
		onRequestClose,
		handleChangeConnector
	} = props

	const { account } = useEthers()

	return (
		<Modal
			isShown={isShown}
			title="Your Account"
			onRequestClose={onRequestClose}
			onModalClose={() => {
				//
			}}
		>
			<ConnectContainer>
				<FlexRow style={{ justifyContent: 'flex-start' }}>
					<img src={connectSvg} style={{ margin: 0 }} alt="" />
					&nbsp;Connected
					<Button
						style={{ padding: '5px 15px', fontSize: 14, marginLeft: 'auto' }}
						onClick={() => handleChangeConnector(true)}
					>Logout</Button>
				</FlexRow>
				<Splitter />
				<FlexRow>
					<AccountAddress>
						<div style={{ marginRight: 20 }}>
							<AccountIcon size={50} />
						</div>
						<Address address={account} length={20}></Address>
					</AccountAddress>
				</FlexRow>
				<FlexRow style={{ justifyContent: 'flex-start' }}>
					<ViewOnExp address={account} showTitle={true} />
					{
						account &&
						<CopyAddress address={account} showTitle={true} />
					}
				</FlexRow>
			</ConnectContainer>
		</Modal>
	)
}

const ConnectContainer = styled.div`
  text-align: center;

  h3 {
    font-weight: 500;
    font-size: 22px;
    line-height: 32px;
    margin: 8px auto;
  }

  p {
    font-weight: 300;
    font-size: 14px;
    line-height: 24px;
  }

  a {
    display: block;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`

const Splitter = styled.div`
  opacity: 0.5;
  border: 1px solid #414C5C;
`

const FlexRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`

const AccountAddress = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
  font-size: 18px;
  margin-top: 16px;
	color: white;
`