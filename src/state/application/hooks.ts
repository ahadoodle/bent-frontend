import { useCallback, useMemo } from 'react';
import {
  addPopup,
  PopupContent,
  removePopup,
  toggleWalletModal,
  toggleSettingsMenu,
} from './actions';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../index';
import { useActiveWeb3React } from 'hooks';
import { ChainId } from 'constant';
import { ContractsState } from 'state/contracts/reducer';
import { Theme } from './reducer';
import { BigNumber, ethers } from 'ethers';

export function useBlockNumber(): number {
  const { chainId } = useActiveWeb3React();
  return useSelector((state: AppState) => state.application.blockNumber[chainId ?? ChainId.Mainnet] || 0);
}

export function useContractState(): ContractsState {
  return useSelector((state: AppState) => state.contracts);
}

export function useWalletModalOpen(): boolean {
  return useSelector((state: AppState) => state.application.walletModalOpen);
}

export function useWalletModalToggle(): () => void {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(toggleWalletModal()), [dispatch]);
}

export function useSettingsMenuOpen(): boolean {
  return useSelector((state: AppState) => state.application.settingsMenuOpen);
}

export function useToggleSettingsMenu(): () => void {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(toggleSettingsMenu()), [dispatch]);
}

// returns a function that allows adding a popup
export function useAddPopup(): (content: PopupContent, key?: string) => void {
  const dispatch = useDispatch();

  return useCallback(
    (content: PopupContent, key?: string) => {
      dispatch(addPopup({ content, key }));
    },
    [dispatch],
  );
}

// returns a function that allows removing a popup via its key
export function useRemovePopup(): (key: string) => void {
  const dispatch = useDispatch();
  return useCallback(
    (key: string) => {
      dispatch(removePopup({ key }));
    },
    [dispatch],
  );
}

// get the list of active popups
export function useActivePopups(): AppState['application']['popupList'] {
  const list = useSelector((state: AppState) => state.application.popupList);
  return useMemo(() => list.filter((item) => item.show), [list]);
}

export function useTheme(): Theme {
  return useSelector((state: AppState) => state.application.theme);
}

export function useEnsName(): string {
  return useSelector((state: AppState) => state.application.ensName);
}

export function useGasPrice(): BigNumber {
  return useSelector((state: AppState) => state.application.gas ? BigNumber.from(state.application.gas || ethers.constants.Zero) : ethers.constants.Zero);
}