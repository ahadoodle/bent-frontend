import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Container,
  Button,
  Modal, ModalBody,
  Dropdown,
  DropdownToggle,
} from "reactstrap";
import LogoIcon from "assets/images/logo.png";
import MenuIcon from "assets/images/menu.svg";
import ThemeDarkIcon from "assets/images/theme-dark.png";
import ThemeLightIcon from "assets/images/theme-light.png";
import { ethers } from 'ethers'
import ConnectWallet from "components/ConnectWallet";
import { useActiveWeb3React, useLocalStorage } from "hooks";

interface Props {
	handleTheme: (theme) => void
}

const Header = (props: Props) => {
  const [customClass, setCustomClass] = useState("removesidenavmenu");
  const closeNav = () => {
    setCustomClass("removesidenavmenu");
  };
  const openNav = () => {
    setCustomClass("sidenavmenu");
  };
	const [theme, setTheme] = useLocalStorage('theme');
  // const [errorMessage, setErrorMessage] = useState(null);
	const [userBalance, setUserBalance] = useState<any>(null);
  const [dropdownOpen,setDropdownOpen] = useState(false);
  const { library, account } = useActiveWeb3React();

  // Modal open state
  const [modal, setModal] = React.useState(false);
  
  // Toggle for Modal
  const toggle = () => setModal(!modal);

  const toggleDropDown = () => { setDropdownOpen(!dropdownOpen)}
  const onMouseEnter = () => { setDropdownOpen(true) }
  const onMouseLeave = () => {setDropdownOpen(false) }
	useEffect(() => {
		if(!theme) setTheme('Dark');
	}, [theme, setTheme]);

  const selectTheme = () => {
    if (theme === "Light") {
			setTheme('Dark');
			props.handleTheme('Dark');
    } else {
      setTheme('Light');
			props.handleTheme('Light');
    }
  }

  useEffect(() => {
    if(account && library) {
      library.getBalance(account)
      .then(balanceResult => {
        setUserBalance(ethers.utils.formatEther(balanceResult));
      })
    }
  }, [library, account]);
  return (
    <React.Fragment>
      <div className="header">
        <Container>
          <div className="DesktopHeader" id="mySidenav">
            <Navbar light expand="md">
              <Link to="/">
                <img src={LogoIcon} alt="" />
              </Link>
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
                </Dropdown>
                </li>
              </ul>
              <span className="theme-icon" onClick={selectTheme}>
                <img src={theme === 'Dark' ? ThemeLightIcon : ThemeDarkIcon} alt="" width="40" height="40" />
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
        {/* {errorMessage != null ? (<h6>Error: {errorMessage} </h6>) : */}
        (<>
        <h6>MetaTask connected successfully</h6><br/>
        <div className='accountDisplay'>
          <h6>Address: {account}</h6>
        </div>
        <div className='balanceDisplay' >
          <h6>Balance: {userBalance}</h6>
        </div>
        </>)
        {/* } */}
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default Header;
