import React, { useEffect, useState } from 'react';
import { formatAddress } from 'utils';
import { useActiveWeb3React, useModal } from 'hooks';
import { useWallet } from 'providers';
import styled from "styled-components";
// import { AccountDetailsModal } from 'components/Modals/AccountDetails';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { ConnectWalletModal } from 'components/Modals/ConnectWallet';
import ENS, { getEnsAddress } from '@ensdomains/ensjs'

const ConnectWallet = (): React.ReactElement => {
	const { account, library } = useActiveWeb3React();
	const { isShown, toggle } = useModal();
	const [showDropdown, setShowDropdown] = useState(false);

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

	const onClick = () => {
		setShowDropdown(!showDropdown)
	}

	return (
		// <div className='d-flex justify-content-center'>
		// 	<Dropdown toggle={onClick} className='wallet-connect'>
		// 		<DropdownToggle caret className='wallet'>
		// 			{formatAddress(activeAccountAddress) || "Connect Wallet"}
		// 		</DropdownToggle>
		// 		<DropdownMenu container="body" className={showDropdown ? 'show' : ''}>
		// 			<DropdownItem onClick={() => { handleMetaMaskConnect('METAMASK') }} className={`wallet btn btn-secondary ${activeAccountAddress === '' ? '' : 'd-none'}`}>
		// 				Metamask
		// 			</DropdownItem>
		// 			<DropdownItem onClick={() => { handleWalletConnect() }} className={`wallet btn btn-secondary ${activeAccountAddress === '' ? '' : 'd-none'}`}>
		// 				WalletConnect
		// 			</DropdownItem>
		// 			<DropdownItem onClick={() => { handleDisconnect() }} className={`wallet btn btn-secondary ${activeAccountAddress === '' ? 'd-none' : ''}`}>
		// 				Disconnect
		// 			</DropdownItem>
		// 		</DropdownMenu>
		// 	</Dropdown>
		// 	{/* {
		// 		(account && !willChangeConnector) ? 
		// 		<AccountDetailsModal
		//       isShown={isShown}
		//       onRequestClose={toggle}
		//       activeConnector={activeConnector}
		//       handleChangeConnector={handleChangeConnector}
		//     />
		// 		:
		// 		<ConnectWalletModal
		// 			isShown={isShown}
		// 			onRequestClose={toggle}
		// 			activeConnector={activeConnector}
		// 			handleWalletConnect={handleWalletConnect}
		// 			handleMetaMaskConnect={handleMetaMaskConnect}
		// 			handleDisconnect={handleDisconnect}
		// 			handleChangeConnector={handleChangeConnector}
		// 			unsupportedChainError={unsupportedChain}
		// 		/>
		// 	} */}
		// </div>
		<div>
			<ConnectButton onClick={toggle}>
				{activeAccountAddress ? (!ensName ? formatAddress(activeAccountAddress) : ensName) : "Connect Wallet"}
			</ConnectButton>
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
		</div>
	);
}

const ConnectButton = styled.button`
	border: 2px solid #C1FFD7;
	color: #C1FFD7;
	font-style: normal;
	font-weight: 500;
	font-size: 16px;
	line-height: 19px;
	letter-spacing: -0.24px;
	background: transparent;
	border-radius: 20px;
  padding: 8px 15px;
	&:hover {
    box-shadow: ${(props): string => (props.disabled ? 'none' : "0px 0px 20px rgba(193, 255, 215, 0.4)")};
  }
`;

export default ConnectWallet;