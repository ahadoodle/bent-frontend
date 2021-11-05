import React, { useEffect } from 'react';
import { formatAddress } from 'utils';
import { useEthers } from 'hooks';
import { useWallet } from 'providers';
// import { ConnectWalletModal } from 'components/Modals/ConnectWallet';
// import { AccountDetailsModal } from 'components/Modals/AccountDetails';
import { Button } from "reactstrap";

const ConnectWallet = () => {
	const { account } = useEthers();
	// const { isShown, toggle } = useModal();
	const { 
		handleMetaMaskConnect,
		// handleWalletConnect,
		// activeConnector,
		// unsupportedChain,
		// handleDisconnect,
	} = useWallet()
	const [ activeAccountAddress, setActiveAccountAddress ] = React.useState<any>('');
	// const [willChangeConnector, setWillChangeConnector] = useState(false)

	// useEffect(() => {
  //   if (account || !isShown) setWillChangeConnector(false)
  // }, [account, isShown])

  // function handleChangeConnector(willChange: boolean) {
	// 	handleDisconnect();
  //   setWillChangeConnector(willChange)
  // }
  
	useEffect(() => {
		setActiveAccountAddress(account);
	}, [account])
  
	return (
		<>
			<Button className="wallet" onClick={() => handleMetaMaskConnect('METAMASK')}
			>{ formatAddress(activeAccountAddress) || "Connect Wallet" }</Button>
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
		</>
	);
}

export default ConnectWallet;