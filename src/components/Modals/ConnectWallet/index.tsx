import React, { useState, useEffect } from 'react'

import { Modal } from 'components/Modal'
import { useLocalStorage } from 'hooks'

import arrowSvg from 'assets/images/arrowright.svg'
import metamaskSvg from 'assets/images/metamask.svg'
// import truefiSvg from 'assets/img/Blue_icon_hi_res.svg'
import walletconnectSvg from 'assets/images/walletconnect.svg'

import {
  ConnectContainer,
  LogoContainer,
  WalletMenu,
  ErrorMsg,
  DisconnectButton,
  LogoGroup
} from './styles';
import { Button } from 'reactstrap'

interface ConnectWalletModalProps {
  isShown: boolean
  onRequestClose: () => void
  activeConnector?: string
  handleMetaMaskConnect: (web3Wallet: string) => void
  handleWalletConnect: () => void
  handleDisconnect: () => void,
  handleChangeConnector: (willChange: boolean) => void,
  unsupportedChainError: boolean
}

export const ConnectWalletModal = (props: ConnectWalletModalProps) => {
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
  const [storage, setStorage] = useLocalStorage('acceptedTerms')
  const [acceptedTerms, setAcceptedTerms] = useState(storage)

  useEffect(() => {
    setStorage(acceptedTerms)
  }, [acceptedTerms, setStorage])

  const handleConnectWeb3 = (web3Wallet: string) => {
    if (!acceptedTerms) return;
    if (activeConnector === web3Wallet.toUpperCase()) {
      return handleChangeConnector(false)
    }
    handleMetaMaskConnect(web3Wallet)
  }

  const disconnectButton = (
    <DisconnectButton
      onClick={(e: any) => {
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
          {/* <img src={truefiSvg} alt="truefi" /> */}
        </LogoContainer>
        {/* <Checkbox label={
          <p style={{ marginTop: 20, marginBottom: 0 }}>
            By connecting my wallet, I accept<br /> the &nbsp;
            <a href="/terms-of-use" target="_blank">Terms of Use</a>
          </p>
        } onChange={setAcceptedTerms} defaultValue={acceptedTerms} /> */}
        {
          unsupportedChainError &&
          <ErrorMsg>Unsupported Chain</ErrorMsg>
        }
        <WalletMenu>
          <Button
            // isConnected={activeConnector === 'METAMASK'}
            disabled={!acceptedTerms}
            variant="outline"
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
            disabled={!acceptedTerms}
            variant="outline"
            onClick={() => {
              if (!acceptedTerms) return;
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