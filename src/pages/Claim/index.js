import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Container,
  Button,
  Row,
  Col,
  TabContent, TabPane, Nav, NavItem, NavLink, Card,  CardTitle, CardText, Table, Input, Label
} from 'reactstrap';
import classnames from 'classnames';
import CrvIcon from "../../assets/images/crvIcon.png";
import BitCoin from "../../assets/images/bitCoin.png";
import UsdIcon from "../../assets/images/usdIcon.png";
import EthereumIcon from "../../assets/images/EthereumIcon.png";
import CvxIcon from "../../assets/images/cvxIcon.png";
import BitcoinCombo from "../../assets/images/bitCoinCombo.png";
import SolIcon from "../../assets/images/SolIcon.png";
import BitcoinTwice from "../../assets/images/bitCoinTwice.png";
import BannerBlocks from "../../components/BannerBlocks";
import 'font-awesome/css/font-awesome.min.css';

const Claim = () => {
  const [activeTab, setActiveTab] = useState('1');
  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }
  return (
      <React.Fragment>
         <div className="banner">
         <BannerBlocks />
          
        </div>
         Welcome to claim
       </React.Fragment>
    );
  
}

export default withRouter(Claim);
