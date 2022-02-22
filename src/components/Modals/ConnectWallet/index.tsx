import React from 'react'

import { Modal } from 'components/Modal'

import arrowSvg from 'assets/images/arrowright.svg'
import metamaskSvg from 'assets/images/metamask.svg'
import bentSvg from 'assets/images/token/BENT.svg'
import walletconnectSvg from 'assets/images/walletconnect.svg'

import {
  ConnectContainer,
  LogoContainer,
  WalletMenu,
  ErrorMsg,
  DisconnectButton,
  LogoGroup
} from './styles';
import { Button } from 'components/Button'

interface Props {
  isShown: boolean
  onRequestClose: () => void
  activeConnector?: string
  handleMetaMaskConnect: (web3Wallet: string) => void
  handleWalletConnect: () => void
  handleDisconnect: () => void,
  handleChangeConnector: (willChange: boolean) => void,
  unsupportedChainError: boolean
}

export const ConnectWalletModal = (props: Props): React.ReactElement => {
  const {
    isShown,
    onRequestClose,
    activeConnector,
    handleWalletConnect,
    handleMetaMaskConnect,
    handleDisconnect,
    handleChangeConnector,
    unsupportedChainError
  } = props

  const handleConnectWeb3 = (web3Wallet: string) => {
    if (activeConnector === web3Wallet.toUpperCase()) {
      return handleChangeConnector(false)
    }
    handleMetaMaskConnect(web3Wallet)
  }

  const disconnectButton = (
    <DisconnectButton
      onClick={e => {
        e.stopPropagation()
        handleDisconnect()
      }}
    >
      Disconnect
    </DisconnectButton>
  )

  return (
    <Modal
      isShown={isShown}
      title="CONNECT WALLET"
      onRequestClose={onRequestClose}
      onModalClose={() => { //
      }}
    >
      <ConnectContainer>
        <LogoContainer>
          <img src={bentSvg} alt="truefi" />
        </LogoContainer>
        {
          unsupportedChainError &&
          <ErrorMsg>Unsupported Chain</ErrorMsg>
        }
        <WalletMenu>
          <Button
            // isConnected={activeConnector === 'METAMASK'}
            onClick={() => handleConnectWeb3('metamask')}
            style={{ height: 60, justifyContent: 'space-between', display: 'flex' }}
          >
            <LogoGroup>
              <img src={metamaskSvg} alt="metamask-logo" />
              MetaMask
            </LogoGroup>
            {
              activeConnector === 'METAMASK' ?
                disconnectButton :
                <img src={arrowSvg} alt="arrow" style={{ height: 40, width: 20 }} />
            }
          </Button>
          <Button
            // isConnected={activeConnector === 'METAMASK'}
            onClick={() => {
              if (activeConnector === 'WALLETCONNECT') {
                return handleChangeConnector(false)
              }
              handleWalletConnect()
            }}
            style={{ height: 60, justifyContent: 'space-between', display: 'flex', marginTop: 15 }}
          >
            <LogoGroup>
              <img src={walletconnectSvg} alt="walletconnect-logo" width={40} />
              WalletConnect
            </LogoGroup>
            {
              activeConnector === 'WALLETCONNECT' ?
                disconnectButton :
                <img src={arrowSvg} alt="arrow" style={{ height: 40, width: 20 }} />
            }
          </Button>
        </WalletMenu>
      </ConnectContainer>
    </Modal>
  )
}