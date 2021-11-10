import { DEFAULT_CHAIN, NETWORK_CONNECTIONS } from 'constant';
import { ethers } from 'ethers'

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(NETWORK_CONNECTIONS[DEFAULT_CHAIN])