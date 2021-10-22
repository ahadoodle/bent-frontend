import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, NavbarBrand, Button } from "reactstrap";
import LogoIcon from "../../../assets/images/logo.png";

const Header = () => {
  return (
    <React.Fragment>
      <div className="header">
        <Container>
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
            <Button className="wallet">Connect Wallet</Button>
          </Navbar>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Header;
