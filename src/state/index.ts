import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { save, load } from 'redux-localstorage-simple';
// import { createLogger } from 'redux-logger'

import contracts from './contracts/reducer';
import application from './application/reducer';

const PERSISTED_KEYS: string[] = ['application', 'contracts'];

const store = configureStore({
  reducer: {
    application,
    contracts,
  },
  middleware: [
    ...getDefaultMiddleware({ serializableCheck: false, thunk: false }),
    save({ states: PERSISTED_KEYS }),
    // createLogger()
  ],
  preloadedState: load({ states: PERSISTED_KEYS }),
});

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
