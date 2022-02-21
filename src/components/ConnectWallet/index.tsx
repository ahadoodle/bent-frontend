import React, { useEffect, useState } from 'react';
import { formatAddress } from 'utils';
import { useActiveWeb3React } from 'hooks';
import { useWallet } from 'providers';
// import { ConnectWalletModal } from 'components/Modals/ConnectWallet';
// import { AccountDetailsModal } from 'components/Modals/AccountDetails';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import ENS, { getEnsAddress } from '@ensdomains/ensjs'

const ConnectWallet = (): React.ReactElement => {
	const { account, library } = useActiveWeb3React();
	const [showDropdown, setShowDropdown] = useState(false);

	useEffect(() => {
		if (!library) return;
		const ens = new ENS({ provider: library, ensAddress: getEnsAddress('1') })
		ens.getName('0x09c6872649ce4f96d869e50a269e342333ae073a').then(name => {
			console.log('ENS Name:', name.name)
			setEnsName(name.name);
		})
	}, [account, library])

	const {
		handleMetaMaskConnect,
		handleWalletConnect,
		// activeConnector,
		// unsupportedChain,
		handleDisconnect,
	} = useWallet()
	const [activeAccountAddress, setActiveAccountAddress] = useState<string>('');
	const [ensName, setEnsName] = useState<string>('');
	// const [willChangeConnector, setWillChangeConnector] = useState(false)

	// useEffect(() => {
	//   if (account || !isShown) setWillChangeConnector(false)
	// }, [account, isShown])

	// function handleChangeConnector(willChange: boolean) {
	// 	handleDisconnect();
	//   setWillChangeConnector(willChange)
	// }

	useEffect(() => {
		setActiveAccountAddress(account || '');
	}, [account])

	return (
		<div className='d-flex justify-content-center'>
			<Dropdown toggle={() => { setShowDropdown(!showDropdown) }} className='wallet-connect'>
				<DropdownToggle caret className='wallet'>
					{activeAccountAddress ? (ensName === '' ? formatAddress(activeAccountAddress) : ensName) : "Connect Wallet"}
				</DropdownToggle>
				<DropdownMenu container="body" className={showDropdown ? 'show' : ''}>
					<DropdownItem onClick={() => { handleMetaMaskConnect('METAMASK') }} className={`wallet btn btn-secondary ${activeAccountAddress === '' ? '' : 'd-none'}`}>
						Metamask
					</DropdownItem>
					<DropdownItem onClick={() => { handleWalletConnect() }} className={`wallet btn btn-secondary ${activeAccountAddress === '' ? '' : 'd-none'}`}>
						WalletConnect
					</DropdownItem>
					<DropdownItem onClick={() => { handleDisconnect() }} className={`wallet btn btn-secondary ${activeAccountAddress === '' ? 'd-none' : ''}`}>
						Disconnect
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
			{/* {
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
				/>
			} */}
		</div>
	);
}

export default ConnectWallet;