import { createAction } from '@reduxjs/toolkit';
import { ContractsState } from './reducer';

export const updateContractInfo = createAction<ContractsState>('contract/updateContractInfo');