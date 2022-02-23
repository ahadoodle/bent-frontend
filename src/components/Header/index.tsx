import React, { useState } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import {
  Navbar,
  Container,
  Button,
  // Dropdown,
  // DropdownToggle,
} from "reactstrap";
import ConnectWallet from "components/ConnectWallet";
import { useGasPrice, useIsMobile, useTheme } from "hooks";
import { useDispatch } from "react-redux";
import { updateTheme } from "state/application/actions";
import { Theme } from "state/application/reducer";
import { BentPowerToolTip } from "./bentDetails";
import { MobileSubHeader } from "./mobileSubHeader";

import LogoIcon from "assets/images/logo-light.svg";
import MenuIcon from "assets/images/menu.svg";
import ThemeDarkIcon from "assets/images/theme-dark.png";
import ThemeLightIcon from "assets/images/theme-light.png";
import BentDetails from "assets/images/bent-details.png";
import GasIcon from "assets/images/gas.svg";
import { formatBigNumber } from "utils";

const Header = (): React.ReactElement => {
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const [customClass, setCustomClass] = useState("removesidenavmenu");
  const theme = useTheme();
  const gasPrice = useGasPrice();

  const closeNav = () => {
    setCustomClass("removesidenavmenu");
  };
  const openNav = () => {
    setCustomClass("sidenavmenu");
  };
  const selectTheme = () => {
    if (theme === Theme.Light) {
      dispatch(updateTheme(Theme.Dark));
    } else {
      dispatch(updateTheme(Theme.Light));
    }
  }

  return (
    <React.Fragment>
      <div className="header">
        <Container>
          <div className="DesktopHeader">
            <Navbar light expand="md">
              <Link to="/#">
                <img src={LogoIcon} alt="" />
              </Link>
              <ul className="primaryMenu">
                <li>
                  <NavLink to="/stake" activeStyle={{ color: '#C1FFD7' }}>Stake</NavLink>
                </li>
                <li>
                  <NavLink to="/claim" activeStyle={{ color: '#C1FFD7' }}>Claim</NavLink>
                </li>
                <li>
                  <NavLink to="/lock" activeStyle={{ color: '#C1FFD7' }}>Lock</NavLink>
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
              <span className="theme-icon ml-auto" id="bent-details" >
                <img src={BentDetails} alt="" width="40" height="40" />
              </span>
              <BentPowerToolTip target="bent-details" />
              <span className="theme-icon" onClick={selectTheme}>
                <img src={theme === Theme.Dark ? ThemeLightIcon : ThemeDarkIcon} alt="" width="40" height="40" />
              </span>
              {!isMobile && <GasContainer>
                <img src={GasIcon} alt="Menu" style={{ width: 13 }} /> {formatBigNumber(gasPrice, 9, 1)}
              </GasContainer>}
              {!isMobile && <ConnectWallet />}
              <div className="mobileHeader">
                <div id="mySidenav" className={"sidenav " + customClass}>
                  <Button className="closebtn" onClick={closeNav}>
                    &times;
                  </Button>
                  <Link to="/stake">Stake</Link>
                  <Link to="/claim">Claim</Link>
                  <Link to="/lock">Lock</Link>
                  <a href="https://twitter.com/BENT_Finance" target="_blank" rel="noreferrer">Twitter</a>
                  <a href="https://t.me/BentFi" target="_blank" rel="noreferrer">Telegram Group</a>
                  <a href="https://docs.bentfinance.com/" target="_blank" rel="noreferrer">Documentation</a>
                </div>
                <span className="Menu" onClick={openNav}>
                  <img src={MenuIcon} alt="Menu" />
                </span>
              </div>
            </Navbar>
            <MobileSubHeader />
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

const GasContainer = styled.div`
  background: #242b3747;
  border: 1px solid #414C5C;
  border-radius: 13px;
  padding: 10px;
  color: #B5DEFF;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  letter-spacing: -0.24px;
  margin-right: 20px;
`;

export default Header;