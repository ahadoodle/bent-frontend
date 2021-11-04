import { ethers } from 'ethers'

const RPC_URL = 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL)