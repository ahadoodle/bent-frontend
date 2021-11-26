import { ChainId } from 'constant';
import { Provider } from 'ethers-multicall';
import { useActiveWeb3React } from 'hooks';
import { useEffect, useState } from 'react';
import { MulticallProvider } from 'utils';

export const useMulticallProvider = (): Provider => {
	const { library } = useActiveWeb3React();
	const [provider, setProvider] = useState<Provider>(MulticallProvider);
	useEffect(() => {
		if (library) {
			setProvider(new Provider(library, ChainId.Mainnet))
		}
	}, [library])
	return provider;
}