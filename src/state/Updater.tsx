import React from 'react';
import ApplicationUpdater from './application/updater';
import PriceUpdater from './price/updater';
import ContractsUpdater from './contracts/updater';

const Updaters = (): React.ReactElement => (
  <>
    <ContractsUpdater />
    <ApplicationUpdater />
    <PriceUpdater />
  </>
);

export default Updaters;
