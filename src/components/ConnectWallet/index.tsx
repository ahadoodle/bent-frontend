import React, { useEffect, useState } from 'react';
import { formatAddress } from 'utils';
import { useEthers } from 'hooks';
import { useWallet } from 'providers';
// import { ConnectWalletModal } from 'components/Modals/ConnectWallet';
// import { AccountDetailsModal } from 'components/Modals/AccountDetails';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";

const ConnectWallet = (): React.ReactElement => {
	const { account } = useEthers();
	const [showDropdown, setShowDropdown] = useState(false);

	const {
		handleMetaMaskConnect,
		handleWalletConnect,
		// activeConnector,
		// unsupportedChain,
		handleDisconnect,
	} = useWallet()
	const [activeAccountAddress, setActiveAccountAddress] = useState<string>('');
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
					{formatAddress(activeAccountAddress) || "Connect Wallet"}
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