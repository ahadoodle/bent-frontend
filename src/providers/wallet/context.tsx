import { createContext, useContext } from 'react'

interface Props {
  networkName: string
  activeConnector: string
  unsupportedChain: boolean
  handleMetaMaskConnect: (web3Wallet: string) => void
  handleWalletConnect: () => void
  handleDisconnect: () => void
}

export const WalletContext = createContext<Props>({
  networkName: '',
  activeConnector: '',
  unsupportedChain: false,
  handleMetaMaskConnect: () => {
    // do nothing
  },
  handleWalletConnect: () => {
    // do nothing
  },
  handleDisconnect: () => {
    // do nothing
  }
})

export function useWallet(): Props {
  return useContext(WalletContext)
}
