import { createReducer, nanoid } from '@reduxjs/toolkit';
import { BigNumber, ethers } from 'ethers';
import {
  addPopup,
  PopupContent,
  removePopup,
  toggleWalletModal,
  toggleSettingsMenu,
  updateBlockNumber,
  updateTheme,
  updateEnsName,
  updateGas,
} from './actions';

type PopupList = Array<{
  key: string;
  show: boolean;
  content: PopupContent;
  removeAfterMs: number | null;
}>;

export enum Theme {
  'Dark',
  'Light',
}

export interface ApplicationState {
  blockNumber: { [chainId: number]: number };
  popupList: PopupList;
  walletModalOpen: boolean;
  settingsMenuOpen: boolean;

  theme: Theme;
  ensName: string;
  gas: BigNumber;
}

const initialState: ApplicationState = {
  blockNumber: {},
  popupList: [],
  walletModalOpen: false,
  settingsMenuOpen: false,

  theme: Theme.Dark,
  ensName: '',
  gas: ethers.constants.Zero,
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(toggleWalletModal, (state) => {
      state.walletModalOpen = !state.walletModalOpen;
    })
    .addCase(toggleSettingsMenu, (state) => {
      state.settingsMenuOpen = !state.settingsMenuOpen;
    })
    .addCase(addPopup, (state, { payload: { content, key, removeAfterMs = 15000 } }) => {
      state.popupList = (key
        ? state.popupList.filter((popup) => popup.key !== key)
        : state.popupList
      ).concat([
        {
          key: key || nanoid(),
          show: true,
          content,
          removeAfterMs,
        },
      ]);
    })
    .addCase(removePopup, (state, { payload: { key } }) => {
      state.popupList.forEach((p) => {
        if (p.key === key) {
          p.show = false;
        }
      });
    })
    .addCase(updateBlockNumber, (state, action) => {
      const { chainId, blockNumber } = action.payload;
      if (typeof state.blockNumber[chainId] !== 'number') {
        state.blockNumber[chainId] = blockNumber;
      } else {
        state.blockNumber[chainId] = Math.max(blockNumber, state.blockNumber[chainId]);
      }
    })
    .addCase(updateTheme, (state, action) => {
      state.theme = action.payload;
    })
    .addCase(updateEnsName, (state, action) => {
      state.ensName = action.payload;
    })
    .addCase(updateGas, (state, action) => {
      state.gas = action.payload;
    })
);
