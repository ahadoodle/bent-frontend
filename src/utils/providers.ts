import { ChainId, DEFAULT_CHAIN, NETWORK_CONNECTIONS, RPC_NODE_KEY } from 'constant';
import { ethers } from 'ethers'
import { Provider } from 'ethers-multicall';

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(NETWORK_CONNECTIONS[DEFAULT_CHAIN])

const provider = new ethers.providers.AlchemyProvider('mainnet', RPC_NODE_KEY);
export const MulticallProvider = new Provider(provider, ChainId.Mainnet);