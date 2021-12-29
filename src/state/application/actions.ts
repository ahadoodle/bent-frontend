import { createAction } from '@reduxjs/toolkit';
import { Theme } from './reducer';

export type PopupContent = {
  txn?: {
    hash: string;
    success: boolean;
    loading?: boolean;
    summary?: string;
  };
  error?: {
    message: string;
    stack: string;
  };
};

export const toggleWalletModal = createAction<void>('app/toggleWalletModal');

export const toggleSettingsMenu = createAction<void>('app/toggleSettingsMenu');

export const addPopup = createAction<{
  key?: string;
  removeAfterMs?: number | null;
  content: PopupContent;
}>('app/addPopup');

export const removePopup = createAction<{ key: string }>('app/removePopup');

export const updateBlockNumber = createAction<{ chainId: number; blockNumber: number }>('app/updateBlockNumber');
export const updateTheme = createAction<Theme>('app/updateTheme');