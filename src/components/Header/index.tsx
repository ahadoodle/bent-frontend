import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Container,
  Button,
  // Dropdown,
  // DropdownToggle,
} from "reactstrap";
import LogoIcon from "assets/images/logo-light.svg";
import MenuIcon from "assets/images/menu.svg";
import ThemeDarkIcon from "assets/images/theme-dark.png";
import ThemeLightIcon from "assets/images/theme-light.png";
import BentDetails from "assets/images/bent-details.png";
import ConnectWallet from "components/ConnectWallet";
import { useTheme } from "hooks";
import { useDispatch } from "react-redux";
import { updateTheme } from "state/application/actions";
import { Theme } from "state/application/reducer";
import { BentPowerToolTip } from "./bentDetails";
import { NavLink } from 'react-router-dom';

const Header = (): React.ReactElement => {
  const dispatch = useDispatch();
  const [customClass, setCustomClass] = useState("removesidenavmenu");
  const closeNav = () => {
    setCustomClass("removesidenavmenu");
  };
  const openNav = () => {
    setCustomClass("sidenavmenu");
  };
  const theme = useTheme();

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
              <ConnectWallet />
              <div className="mobileHeader">
                <div id="mySidenav" className={"sidenav " + customClass}>
                  <Button className="closebtn" onClick={closeNav}>
                    &times;
                  </Button>
                  <Link to="/stake">Stake</Link>
                  <Link to="/claim">Claim</Link>
                  <Link to="/lock">Lock</Link>
                </div>
                <span className="Menu" onClick={openNav}>
                  <img src={MenuIcon} alt="Menu" />
                </span>
              </div>
            </Navbar>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Header;