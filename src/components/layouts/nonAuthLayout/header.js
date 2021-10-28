import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Navbar, Container, NavbarBrand, Button, Collapse, NavItem, Nav, NavLink, NavbarToggler } from "reactstrap";
import LogoIcon from "../../../assets/images/logo.png";
import MenuIcon from "../../../assets/images/menu.svg";
import MoonIcon from "../../../assets/images/moonIcon.svg";



const Header = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);
  const [customClass, setCustomClass] = useState('removesidenavmenu');
  const closeNav = () => {
    setCustomClass('removesidenavmenu');
  }
  const openNav = () => {
    setCustomClass('sidenavmenu');
  }
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
                <Link to="/">More</Link>
              </li>
            </ul>
            <span class="ImgIcon"><img src={MoonIcon} alt="" /></span>
            <Button className="wallet">Connect Wallet</Button>
            <div className="mobileHeader">  
          <div id="mySidenav" className={'sidenav' + " " +customClass} >
            <Button className="closebtn" onClick={closeNav}>&times;</Button>
            <Link >Stake</Link>
            <Link >Claim</Link>
            <Link >Lock CVX</Link>
            <Link >More</Link>
          </div>
          <span className="Menu" onClick={openNav}><img src={MenuIcon} alt="Menu" /></span>
          </div>
          </Navbar>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Header;
