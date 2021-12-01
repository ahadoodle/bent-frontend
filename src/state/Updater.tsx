import React from 'react';
import ApplicationUpdater from './application/updater';
import ContractsUpdater from './contracts/updater';

const Updaters = (): React.ReactElement => (
  <>
    <ContractsUpdater />
    <ApplicationUpdater />
  </>
);

export default Updaters;
