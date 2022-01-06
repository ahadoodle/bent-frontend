/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
import { Web3Provider } from '@ethersproject/providers'
import { ChainId } from 'constant'
import { simpleRpcProvider } from 'utils/providers'
import { ethers } from 'ethers'

export type Web3Ethers = ReturnType<typeof useWeb3React> & { library?: Web3Provider; chainId?: ChainId }

export const useEthers = (): Web3Ethers => useWeb3React<Web3Provider>()

export const useActiveWeb3React = (): Web3ReactContextInterface<Web3Provider> => {
  const { library, chainId, ...web3React } = useWeb3React()
  const initProvider = () => {
    if (library === undefined) {
      return simpleRpcProvider;
    } else if (chainId === ChainId.Mainnet) {
      return new ethers.providers.Web3Provider(library) || simpleRpcProvider;
    } else {
      return simpleRpcProvider;
    }
  }
  const [provider, setProvider] = useState<any>(initProvider());

  useEffect(() => {
    if (library === undefined) {
      setProvider(simpleRpcProvider);
    } else if (chainId === ChainId.Mainnet) {
      setProvider(new ethers.providers.Web3Provider(library) || simpleRpcProvider);
    } else {
      setProvider(simpleRpcProvider);
    }
  }, [library, chainId])

  return { library: provider, chainId: chainId ?? ChainId.Mainnet, ...web3React }
}