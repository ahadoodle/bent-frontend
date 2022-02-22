import React, { useEffect, useState } from 'react';
import { formatAddress } from 'utils';
import { useActiveWeb3React, useModal } from 'hooks';
import ENS, { getEnsAddress } from '@ensdomains/ensjs'
import { useWallet } from 'providers';
import { AccountDetailsModal } from 'components/Modals/AccountDetails';
import { ConnectWalletModal } from 'components/Modals/ConnectWallet';
import { Button } from 'components/Button';

const ConnectWallet = (): React.ReactElement => {
	const { account, library } = useActiveWeb3React();
	const { isShown, toggle } = useModal();

	useEffect(() => {
		if (!library || !account) return;
		const ens = new ENS({ provider: library, ensAddress: getEnsAddress('1') })
		ens.getName(account).then(name => {
			console.log('ENS Name:', name.name)
			setEnsName(name.name);
		})
	}, [account, library])

	const {
		handleMetaMaskConnect,
		handleWalletConnect,
		activeConnector,
		unsupportedChain,
		handleDisconnect,
	} = useWallet()
	const [activeAccountAddress, setActiveAccountAddress] = useState<string>('');
	const [ensName, setEnsName] = useState<string>('');
	const [willChangeConnector, setWillChangeConnector] = useState(false)

	useEffect(() => {
		if (account || !isShown) setWillChangeConnector(false)
	}, [account, isShown])

	function handleChangeConnector(willChange: boolean) {
		handleDisconnect();
		setWillChangeConnector(willChange)
	}

	useEffect(() => {
		setActiveAccountAddress(account || '');
	}, [account])

	return (
		<div>
			<Button onClick={toggle}>
				{activeAccountAddress ? (!ensName ? formatAddress(activeAccountAddress) : ensName) : "Connect Wallet"}
			</Button>
			{
				(account && !willChangeConnector) ?
					<AccountDetailsModal
						isShown={isShown}
						onRequestClose={toggle}
						activeConnector={activeConnector}
						handleChangeConnector={handleChangeConnector}
					/>
					:
					<ConnectWalletModal
						isShown={isShown}
						onRequestClose={toggle}
						activeConnector={activeConnector}
						handleWalletConnect={handleWalletConnect}
						handleMetaMaskConnect={handleMetaMaskConnect}
						handleDisconnect={handleDisconnect}
						handleChangeConnector={handleChangeConnector}
						unsupportedChainError={unsupportedChain}
					/>}
		</div>
	);
}

export default ConnectWallet;