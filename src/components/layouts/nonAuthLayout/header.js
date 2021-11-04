import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Container,
  NavbarBrand,
  Button,
  Modal, ModalBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import LogoIcon from "../../../assets/images/logo.png";
import MenuIcon from "../../../assets/images/menu.svg";
import MoonIcon from "../../../assets/images/moonIcon.svg";
import {ethers} from 'ethers'
import ConnectWallet from "components/ConnectWallet";

const Header = (props) => {
  const {handleTheme} = props;
  const [customClass, setCustomClass] = useState("removesidenavmenu");
  const closeNav = () => {
    setCustomClass("removesidenavmenu");
  };
  const openNav = () => {
    setCustomClass("sidenavmenu");
  };
  const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
  const [defaultTheme, setDefaultTheme] = useState('Dark');
	const [userBalance, setUserBalance] = useState(null);
  const [dropdownOpen,setDropdownOpen] = useState(false);
	const [provider, setProvider] = useState(null);

  // Modal open state
  const [modal, setModal] = React.useState(false);
  
  // Toggle for Modal
  const toggle = () => setModal(!modal);

	const connectWalletHandler = () => {
    console.log('yes cominh');
		if (window.ethereum && defaultAccount == null) {
			// set ethers provider
			setProvider(new ethers.providers.Web3Provider(window.ethereum));
      // connect to metamask
			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
        console.log('result[0]',result[0]);
				setDefaultAccount(result[0]);
        setModal(true);
			})
			.catch(error => {
				setErrorMessage(error.message);
        setModal(true);
			});
    } else if (!window.ethereum){
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
      setModal(true);
		}
	}

  const toggleDropDown = () => { setDropdownOpen(!dropdownOpen)}
  const onMouseEnter = () => { setDropdownOpen(true) }
  const onMouseLeave = () => {setDropdownOpen(false) }
  const selectTheme = (e) => {
    console.log('testing,,,,,,,,');
    if (e.target.value === "Light") {
      setDefaultTheme('Dark');
      handleTheme('Light');
    } else {
      setDefaultTheme('Light');
      handleTheme('Dark');
    }
  }

  useEffect(() => {
    if(defaultAccount){
      provider.getBalance(defaultAccount)
      .then(balanceResult => {
        setUserBalance(ethers.utils.formatEther(balanceResult));
      })
    };
  }, [defaultAccount, provider]);
  return (
    <React.Fragment>
      <div className="header">
        <Container>
          <div className="DesktopHeader" id="mySidenav">
            <Navbar light expand="md">
              <NavbarBrand>
                <Link to="/">
                  <img src={LogoIcon} alt="" />
                </Link>
              </NavbarBrand>
              <ul className="primaryMenu">
                <li>
                  <Link to="/stake">Stake</Link>
                </li>
                <li>
                  <Link to="/claim">Claim</Link>
                </li>
                <li>
                  <Link to="/lock-cvx">Lock CVX</Link>
                </li>
                <li>
                <Dropdown
                  className=""
                  onMouseOver={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                  isOpen={dropdownOpen}
                  toggle={toggleDropDown}
                >
                  <DropdownToggle caret>More</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={(e) => selectTheme(e)} value={defaultTheme}>{defaultTheme} Theme</DropdownItem>
                  </DropdownMenu>
                
                  
                </Dropdown>
                </li>
              </ul>
              <span class="ImgIcon">
                <img src={MoonIcon} alt="" />
              </span>
              <ConnectWallet />
              <div className="mobileHeader">
                <div id="mySidenav" className={"sidenav " + customClass}>
                  <Button className="closebtn" onClick={closeNav}>
                    &times;
                  </Button>
                  <Link  to="/stake">Stake</Link>
                  <Link to="/claim">Claim</Link>
                  <Link to="/lock-cvx">Lock CVX</Link>
                  <Link to="/stake">More</Link>
                  
                  {/*<Dropdown
                  className=""
                  onMouseOver={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                  isOpen={dropdownOpen}
                  toggle={toggleDropDown}
                >
                  <DropdownToggle caret>More</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={(e) => selectTheme(e)} value={defaultTheme}>{defaultTheme} Theme</DropdownItem>
                  </DropdownMenu>
                  </Dropdown>*/}
                </div>
                <span className="Menu" onClick={openNav}>
                  <img src={MenuIcon} alt="Menu" />
                </span>
              </div>
            </Navbar>
          </div>
        </Container>
      </div>
  <Modal isOpen={modal}
        toggle={toggle}
        modalTransition={{ timeout: 2000 }} className="custom-modal-style">
          
        <ModalBody>
        {errorMessage != null ? (<h6>Error: {errorMessage} </h6>) :
        (<>
        <h6>MetaTask connected successfully</h6><br/>
        <div className='accountDisplay'>
          <h6>Address: {defaultAccount}</h6>
        </div>
        <div className='balanceDisplay' >
          <h6>Balance: {userBalance}</h6>
        </div>
        </>)
        }
        
        </ModalBody>
    </Modal>
    </React.Fragment>
  );
};

export default Header;
