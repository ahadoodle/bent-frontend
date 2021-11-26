import { ChainId } from 'constant';
import { Provider } from 'ethers-multicall';
import { useActiveWeb3React } from 'hooks';
import { useEffect, useState } from 'react';
import { MulticallProvider } from 'utils';

export const useMulticallProvider = (): Provider => {
	const { library } = useActiveWeb3React();
	const [provider, setProvider] = useState<Provider>(MulticallProvider);
	if (!library) {
		setProvider(MulticallProvider);
	}
	useEffect(() => {
		if (!library) {
			setProvider(MulticallProvider);
		} else {
			setProvider(new Provider(library, ChainId.Mainnet))
		}
	}, [library])
	return provider;
}