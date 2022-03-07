import { useDebounce, useActiveWeb3React } from 'hooks';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ENS, { getEnsAddress } from '@ensdomains/ensjs'
import { simpleRpcProvider } from 'utils';
import { updateBlockNumber, updateEnsName } from './actions';

export default function Updater(): null {
  const { chainId, account, library } = useActiveWeb3React();
  const dispatch = useDispatch();

  const [state, setState] = useState<{
    chainId: number | undefined;
    blockNumber: number | null;
  }>({
    chainId,
    blockNumber: null,
  });

  const blockNumberCallback = useCallback((blockNumber: number) => {
    // Update blocknumber
    setState((state) => {
      if (chainId === state.chainId) {
        if (typeof state.blockNumber !== 'number') return { chainId, blockNumber };
        return { chainId, blockNumber: Math.max(blockNumber, state.blockNumber) };
      }
      return state;
    });
  }, [chainId, setState]);

  // attach/detach listeners
  useEffect(() => {
    if (!chainId) return undefined;
    setState({ chainId, blockNumber: null });

    simpleRpcProvider
      .getBlockNumber()
      .then(blockNumberCallback)
      .catch((error) =>
        console.error(`Failed to get block number for chainId: ${chainId}`, error),
      );

    simpleRpcProvider.on('block', blockNumberCallback)
    return () => {
      simpleRpcProvider.removeListener('block', blockNumberCallback);
    }
  }, [dispatch, chainId, blockNumberCallback]);

  const debouncedState = useDebounce(state, 100);

  useEffect(() => {
    if (debouncedState.chainId && debouncedState.blockNumber) {
      dispatch(
        updateBlockNumber({
          chainId: debouncedState.chainId,
          blockNumber: debouncedState.blockNumber,
        }),
      );
    }
  }, [dispatch, debouncedState.blockNumber, debouncedState.chainId]);

  useEffect(() => {
    dispatch(updateEnsName(''));
    if (account && library) {
      const ens = new ENS({ provider: library, ensAddress: getEnsAddress('1') })
      ens.getName(account).then(name => {
        console.log('ENS Name:', name.name)
        dispatch(updateEnsName(name.name));
      })
    }
  }, [dispatch, account, library]);

  return null;
}
