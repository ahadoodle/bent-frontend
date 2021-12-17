import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Container,
  Button,
  Modal, ModalBody, Tooltip, Row, Col,
  // Dropdown,
  // DropdownToggle,
} from "reactstrap";
import LogoIcon from "assets/images/logo-light.svg";
import MenuIcon from "assets/images/menu.svg";
import ThemeDarkIcon from "assets/images/theme-dark.png";
import ThemeLightIcon from "assets/images/theme-light.png";
import BentDetails from "assets/images/bent-details.png";
import ConnectWallet from "components/ConnectWallet";
import { useActiveWeb3React, useBentCirculatingSupply, useBentTotalStaked, useLocalStorage, useTokenPrice, useVlCvxBalance } from "hooks";
import { TOKENS } from "constant";
import styled from "styled-components";
import { formatBigNumber, formatMillionsBigNumber } from "utils";
import { BigNumber, utils } from "ethers";

interface Props {
  handleTheme: (theme) => void
}

const Header = (props: Props): React.ReactElement => {
  const [customClass, setCustomClass] = useState("removesidenavmenu");
  const closeNav = () => {
    setCustomClass("removesidenavmenu");
  };
  const openNav = () => {
    setCustomClass("sidenavmenu");
  };
  const [theme, setTheme] = useLocalStorage('theme');
  const [userBalance, setUserBalance] = useState<unknown>(0);
  const [showBentDetails, setShowBentDetails] = useState(false);
  const bentPrice = useTokenPrice(TOKENS['BENT'].ADDR);
  const cvxPrice = useTokenPrice(TOKENS['CVX'].ADDR);
  const bentCirculatingSupply = useBentCirculatingSupply();
  const bentStaked = useBentTotalStaked();
  const vlCvxBalance = useVlCvxBalance();
  const { library, account } = useActiveWeb3React();

  // Modal open state
  const [modal, setModal] = React.useState(false);

  // Toggle for Modal
  const toggle = () => setModal(!modal);

  useEffect(() => {
    if (!theme) setTheme('Light');
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
    if (account && library) {
      library.getBalance(account)
        .then(balanceResult => {
          setUserBalance(balanceResult);
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
                {/* <li>
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
                </li> */}
              </ul>
              <span className="theme-icon ml-auto" id="bent-details" onClick={() => setShowBentDetails(!showBentDetails)}>
                <img src={BentDetails} alt="" width="40" height="40" />
              </span>
              <Tooltip className="bent-details" target="bent-details" isOpen={showBentDetails}>
                <div style={{ padding: 15 }}>
                  <Row>
                    <Col md="5">BENT Price:</Col>
                    <Col md="7" className="text-right"><b>${bentPrice.toString()} (Coingecko)</b></Col>
                  </Row>
                  <Row>
                    <Col md="5">Marketcap:</Col>
                    <Col md="7" className="text-right"><b>${
                      formatMillionsBigNumber(utils.parseEther(bentPrice.toString()).mul(bentCirculatingSupply).div(BigNumber.from(10).pow(18)))
                    }</b></Col>
                  </Row>
                  <Row>
                    <Col md="5">Circulating Supply:</Col>
                    <Col md="7" className="text-right"><b>{formatBigNumber(bentCirculatingSupply, 18, 2)} BENT</b></Col>
                  </Row>
                  <Row>
                    <Col md="5">Staked BENT:</Col>
                    <Col md="7" className="text-right">
                      <b>
                        {formatBigNumber(bentStaked, 18, 2)} BENT&nbsp;
                        (${formatMillionsBigNumber(utils.parseEther(bentPrice.toString()).mul(bentStaked).div(BigNumber.from(10).pow(18)))})
                      </b>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="5">vlCVX:</Col>
                    <Col md="7" className="text-right">
                      <b>
                        {formatBigNumber(vlCvxBalance, 18, 2)}&nbsp;
                        (${formatMillionsBigNumber(utils.parseEther(cvxPrice.toString()).mul(vlCvxBalance).div(BigNumber.from(10).pow(18)))})
                      </b>
                    </Col>
                  </Row>
                </div>
                <VotingPowerContainer>
                  <Row>
                    <Col md="5"><b>Voting Power</b></Col>
                    <Col md="7" className="text-right">
                      $1 Staked BENT = ${(cvxPrice / bentPrice).toFixed(2)} vlCVX
                    </Col>
                  </Row>
                </VotingPowerContainer>
              </Tooltip>
              <span className="theme-icon" onClick={selectTheme}>
                <img src={theme === 'Dark' ? ThemeLightIcon : ThemeDarkIcon} alt="" width="40" height="40" />
              </span>
              <ConnectWallet />
              <div className="mobileHeader">
                <div id="mySidenav" className={"sidenav " + customClass}>
                  <Button className="closebtn" onClick={closeNav}>
                    &times;
                  </Button>
                  <Link to="/stake">Stake</Link>
                  <Link to="/claim">Claim</Link>
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
            <h6>MetaTask connected successfully</h6><br />
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

const VotingPowerContainer = styled.div`
  background: #C1FFD7;
  padding: 15px;
  color: black;
`;