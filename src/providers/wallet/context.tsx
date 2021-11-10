import { createContext, useContext } from 'react'

export const WalletContext = createContext<{
  networkName: string
  activeConnector: any
  unsupportedChain: boolean
  handleMetaMaskConnect: (web3Wallet: string) => void
  handleWalletConnect: () => void
  handleDisconnect: () => void
}>({
  networkName: '',
  activeConnector: null,
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

export function useWallet() {
  return useContext(WalletContext)
}
