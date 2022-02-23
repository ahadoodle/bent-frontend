import React, { useEffect, useState } from 'react';
import { formatAddress } from 'utils';
import { useActiveWeb3React, useEnsName, useModal } from 'hooks';
import { useWallet } from 'providers';
import { AccountDetailsModal } from 'components/Modals/AccountDetails';
import { ConnectWalletModal } from 'components/Modals/ConnectWallet';
import { Button } from 'components/Button';

const ConnectWallet = (): React.ReactElement => {
	const { account } = useActiveWeb3React();
	const { isShown, toggle } = useModal();
	const ensName = useEnsName();
	const [activeAccountAddress, setActiveAccountAddress] = useState<string>('');
	const [willChangeConnector, setWillChangeConnector] = useState(false)
	const {
		handleMetaMaskConnect,
		handleWalletConnect,
		activeConnector,
		unsupportedChain,
		handleDisconnect,
	} = useWallet()

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
			<Button onClick={toggle} variant="green">
				{activeAccountAddress ? (!ensName ? formatAddress(activeAccountAddress) : `${ensName}`) : "Connect Wallet"}
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