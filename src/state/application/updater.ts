import { useDebounce, useActiveWeb3React } from 'hooks';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { simpleRpcProvider } from 'utils';
import { updateBlockNumber } from './actions';

export default function Updater(): null {
  const { chainId } = useActiveWeb3React();
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

  return null;
}
