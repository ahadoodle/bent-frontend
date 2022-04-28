import React, { useState } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import {
  Navbar,
  Container,
  Button,
} from "reactstrap";
import ConnectWallet from "components/ConnectWallet";
import { useGasPrice, useIsMobile, useModal, useTotalTvl } from "hooks";
import { MobileSubHeader } from "./mobileSubHeader";
import { MarketModal } from "components/Modals/Market";
import { AnimNumber } from "components/AnimNumber";
import { SOCIAL } from "constant";
import { formatMillionsBigNumber } from "utils";

import LogoIcon from "assets/images/logo-light.svg";
import MenuIcon from "assets/images/menu.svg";
import BentDetails from "assets/images/bent-details.png";
import GasIcon from "assets/images/gas.svg";
import { MaintainHeader } from "./maintainHeader";
import { SplitterH } from "components/Splitter";

const Header = (): React.ReactElement => {
  const isMobile = useIsMobile();
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

  return (
    <React.Fragment>
      <div className="header">
        <Container>
          <Navbar light expand="md">
            <Link to="/#">
              <img src={LogoIcon} alt="" />
            </Link>
            <ul className="primaryMenu">
              <li>
                <NavLink to="/pools" activeStyle={{ color: '#C1FFD7' }}>Pools</NavLink>
              </li>
              <li>
                <NavLink to="/lock" activeStyle={{ color: '#C1FFD7' }}>Lock BENT</NavLink>
              </li>
              {/* <li>
                <NavLink to="/dao" activeStyle={{ color: '#C1FFD7' }}>DAO</NavLink>
              </li> */}
            </ul>
            <div className="ml-auto text-white" style={{ marginRight: 20 }}>
              TVL ${formatMillionsBigNumber(tvl, 18, 2)}
            </div>
            <span className="theme-icon" onClick={toggle} >
              <img src={BentDetails} alt="" width="40" height="40" />
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
                <Link to="/pools" onClick={closeNav}>Pools</Link>
                <Link to="/lock" onClick={closeNav}>Lock BENT</Link>
                {/* <Link to="/dao" onClick={closeNav}>DAO</Link> */}
                <SplitterH />
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
        </Container>
      </div>
      <MaintainHeader />
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