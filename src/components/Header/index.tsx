import React, { useState } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import {
  Navbar,
  Container,
  Button,
} from "reactstrap";
import ConnectWallet from "components/ConnectWallet";
import { useGasPrice, useIsMobile, useModal, useTheme, useTotalTvl } from "hooks";
import { useDispatch } from "react-redux";
import { updateTheme } from "state/application/actions";
import { Theme } from "state/application/reducer";
import { MobileSubHeader } from "./mobileSubHeader";
import { MarketModal } from "components/Modals/Market";
import { AnimNumber } from "components/AnimNumber";
import { SOCIAL } from "constant";
import { formatMillionsBigNumber } from "utils";

import LogoIcon from "assets/images/logo-light.svg";
import MenuIcon from "assets/images/menu.svg";
import ThemeDarkIcon from "assets/images/theme-dark.png";
import ThemeLightIcon from "assets/images/theme-light.png";
import BentDetails from "assets/images/bent-details.png";
import GasIcon from "assets/images/gas.svg";

const Header = (): React.ReactElement => {
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const theme = useTheme();
  const gasPrice = useGasPrice();
  const tvl = useTotalTvl();
  const { isShown, toggle } = useModal();
  const [customClass, setCustomClass] = useState("removesidenavmenu");

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
              <div className="ml-auto text-muted" style={{ marginRight: 20 }}>
                TVL ${formatMillionsBigNumber(tvl, 18, 2)}
              </div>
              <span className="theme-icon" onClick={toggle} >
                <img src={BentDetails} alt="" width="40" height="40" />
              </span>
              <span className="theme-icon" onClick={selectTheme}>
                <img src={theme === Theme.Dark ? ThemeLightIcon : ThemeDarkIcon} alt="" width="40" height="40" />
              </span>
              {!isMobile && <GasContainer>
                <img src={GasIcon} alt="Menu" style={{ width: 13 }} />&nbsp;
                <AnimNumber value={gasPrice} precision={9} decimals={1} />
              </GasContainer>}
              {!isMobile && <ConnectWallet />}
              <div className="mobileHeader">
                <div id="mySidenav" className={"sidenav " + customClass}>
                  <Button className="closebtn" onClick={closeNav}>
                    &times;
                  </Button>
                  <Link to="/stake" onClick={closeNav}>Stake</Link>
                  <Link to="/claim" onClick={closeNav}>Claim</Link>
                  <Link to="/lock" onClick={closeNav}>Lock</Link>
                  <a href={SOCIAL.TWITTER} target="_blank" rel="noreferrer">Twitter</a>
                  <a href={SOCIAL.DISCORD} target="_blank" rel="noreferrer">Discord</a>
                  <a href={SOCIAL.TELEGRAM} target="_blank" rel="noreferrer">Telegram Group</a>
                  <a href={SOCIAL.DOC} target="_blank" rel="noreferrer">Documentation</a>
                </div>
                <span className="Menu" onClick={openNav}>
                  <img src={MenuIcon} alt="Menu" />
                </span>
              </div>
              <MarketModal
                isShown={isShown}
                onRequestClose={toggle}
              />
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