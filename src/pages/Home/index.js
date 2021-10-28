import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import {
  Row,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";
import classnames from "classnames";
import CrvIcon from "../../assets/images/crvIcon.png";
import BitCoin from "../../assets/images/bitCoin.png";
import UsdIcon from "../../assets/images/usdIcon.png";
import EthereumIcon from "../../assets/images/EthereumIcon.png";
import CvxIcon from "../../assets/images/cvxIcon.png";
import BitcoinCombo from "../../assets/images/bitCoinCombo.png";
import SolIcon from "../../assets/images/SolIcon.png";
import BitcoinTwice from "../../assets/images/bitCoinTwice.png";
import BannerBlocks from "../../components/BannerBlocks";
import chainIcon from "../../assets/images/chainLink.png";
import busdIcon from "../../assets/images/busdIcon.png";
import sushiIcon from "../../assets/images/sushiIcon.png";

import "./home.css";
import "font-awesome/css/font-awesome.min.css";

const Home = () => {
  return (
    <React.Fragment>
      <div className="homeBanner"></div>
    </React.Fragment>
  );
};

export default withRouter(Home);
