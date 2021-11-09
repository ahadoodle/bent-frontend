import { DEFAULT_CHAIN, NETWORK_CONNECTIONS } from 'constant';
import Web3 from 'web3';
import { HttpProviderOptions } from 'web3-core-helpers'

const RPC_URL = NETWORK_CONNECTIONS[DEFAULT_CHAIN];
const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 } as HttpProviderOptions);
const web3NoAccount = new Web3(httpProvider);

export default web3NoAccount;