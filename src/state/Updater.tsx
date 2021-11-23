import React from 'react';
import ApplicationUpdater from './application/updater';
import PriceUpdater from './price/updater';

const Updaters = (): React.ReactElement => (
  <>
    <ApplicationUpdater />
    <PriceUpdater />
    {/* <ContractsUpdater /> */}
  </>
);

export default Updaters;
