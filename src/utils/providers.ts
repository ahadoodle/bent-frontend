import { ChainId, DEFAULT_CHAIN, INFURA_KEY, NETWORK_CONNECTIONS } from 'constant';
import { ethers } from 'ethers'
import { Provider } from 'ethers-multicall';

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(NETWORK_CONNECTIONS[DEFAULT_CHAIN])

const provider = new ethers.providers.InfuraProvider('mainnet', INFURA_KEY);
export const MulticallProvider = new Provider(provider, ChainId.Mainnet);