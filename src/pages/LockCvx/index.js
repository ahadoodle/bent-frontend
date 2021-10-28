import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Container,
Label, Input } from 'reactstrap';
import classnames from 'classnames';
import CrvIcon from "../../assets/images/crvIcon.png";
import BitCoin from "../../assets/images/bitCoin.png";
import UsdIcon from "../../assets/images/usdIcon.png";
import EthereumIcon from "../../assets/images/EthereumIcon.png";
import BusdIcon from "../../assets/images/busdIcon.png";
import BitcoinCombo from "../../assets/images/bitCoinCombo.png";
import SolIcon from "../../assets/images/SolIcon.png";
import LockIcon from "../../assets/images/purpleLock.png";
import BannerBlocks from "../../components/BannerBlocks";
import 'font-awesome/css/font-awesome.min.css';

const LockCvx = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [activeSubTab, setActiveSubTab] = useState('3');
  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }
  const subToggle = tab => {
    if(activeTab !== tab) setActiveSubTab(tab);
  }
  
  return (
      <React.Fragment>
         <div className="banner">
         <div className="bannerboxes">
          <BannerBlocks />
          </div> 
        </div>
        {/* Lock content start */}
        <div className="lockContent contentSection">
          <Container>
            <div className="lockInner">

          <Row>
          <Col sm="12">
            <div className="InnerLock">
            <Row>
            <Col lg="8">

            <Nav tabs>
              <div className="tabInner">
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '1' })}
                  onClick={() => { toggle('1'); }}
                >
                  Lock CVX
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '2' })}
                  onClick={() => { toggle('2'); }}
                >
                  View pool info
                </NavLink>
              </NavItem>
              </div>
            </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
              <div className="convert-table">
                        <div className="convert-tableTitle">
                          <Row className="align-items-center">
                              <Col>
                                <div className="tableTitle">
                                  <img src={CrvIcon} alt="Icon" /> <b> CRV </b>
                                </div>  
                              </Col>
                              <Col>
                                <div className="tableTitle">
                                  <p>Earned (USD)</p>
                                  <div className="boldText"><b><span>$</span>0</b></div>
                                </div>
                              </Col>
                              <Col>
                                <div className="tableTitle">
                                  <p>APR</p>
                                  <div className="boldText"><b>8.13<span>%</span></b></div>
                                </div>
                              </Col>
                              <Col>
                                <div className="tableTitle">
                                  <p>My CVX Locked</p>
                                  <div className="boldText"><b>8.13<span>%</span></b></div>
                                 </div>
                              </Col>
                              <Col>
                                <div className="tableTitle">
                                  <p>Total Locked</p>
                                  <div className="boldText"><b><span>$</span>198.2m</b></div>
                                </div>
                              </Col>
                        </Row>
                      </div>
                     
                      <div className="converttabs">
                        <Nav tabs>
                          <NavItem>
                            <NavLink
                              className={classnames({ active: activeSubTab === '3' })}
                              onClick={() => { subToggle('3'); }}
                            >
                              Lock
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={classnames({ active: activeSubTab === '4' })}
                              onClick={() => { subToggle('4'); }}
                            >
                              Info
                            </NavLink>
                          </NavItem>
                        </Nav>
                        <TabContent activeTab={activeSubTab}>
                          <TabPane tabId="3">
                          <Row>
                              <Col sm="6" className="inverse">
                                <Card body>
                                  <CardText>Lock CVX for 16 weeks + 7 days. Locked CVX will earn platform fees
                                     as well as give voting weight for proposal and gauge weight voting.</CardText>
                                </Card>
                              </Col>
                              <Col sm="6" className="divider-left">
                                <Card body>
                                   <CardText>
                                    <div className="amount-crv">
                                        <p className="labeltext"><Label>Amount of CRV to convert and stake</Label>
                                            <Label>Available:-</Label>
                                        </p>
                                        <div className="amutinput">
                                             <Input type="text" placeholder="0" />   
                                            <Button className="maxbtn">Max</Button>    
                                        </div>
                                        <div className="btnouter">
                                            <p className="lineup"></p>
                                        <div className="btnwrapper">
                                            <Button className="approvebtn">Approve</Button>
                                            <Button className="approvebtn">Convert Stake</Button>
                                        </div>
                                      </div>
                                    </div>
                                  </CardText>
                                </Card>
                              </Col>
                            </Row>
                          </TabPane>
                          <TabPane tabId="4">
                            <Row>
                              <Col sm="6">
                                <Card body>
                                  
                                  <CardText></CardText>
                                  <Button>Go somewhere</Button>
                                </Card>
                              </Col>
                              <Col sm="6">
                                <Card body>
                                  <CardTitle>Special Title Treatment</CardTitle>
                                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                  <Button>Go somewhere</Button>
                                </Card>
                              </Col>
                            </Row>
                          </TabPane>
  
                        </TabContent>
                      </div>
                    </div>
           
        
         
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
                <div className="convert-table">
                        <div className="convert-tableTitle">
                          <Row className="align-items-center">
                              <Col>
                                <div className="tableTitle">
                                   <b> Pool Name </b>
                                </div>  
                              </Col>
                              <Col>
                                <div className="tableTitle">
                                  <b>TVL</b>
                                </div>
                              </Col>
                              <Col>
                                <div className="tableTitle">
                                  <p>Current Bent</p>
                                  <div className="boldText"> <b>Allocation</b></div>
                                </div>
                              </Col>
                              <Col>
                                <div className="tableTitle">
                                  <p>Boosted share of</p>
                                  <div className="boldText"><b>Bent pool</b></div>
                                 </div>
                              </Col>
                           </Row>
                      </div>
                     
                      <div className="converttabs">
                        <TabContent activeTab={activeSubTab}>
                          <TabPane tabId="3">
                          <Row className="align-items-center">
                              <Col>
                                <div className="tableText">
                                   <h4><img src={BitCoin} alt="" />  Bitcoin </h4>
                                </div>  
                              </Col>
                              <Col>
                                <div className="tableText">
                                    <b><span>$</span>1.7m</b>
                                </div>
                              </Col>
                              <Col>
                                <div className="tableText">
                                    <b>0<span>%</span></b>
                                </div>
                              </Col>
                              <Col>
                                <div className="tableText">
                                    <div className="processWrap">
                                      <span>100%</span>
                                    </div>  
                                 </div>
                              </Col>
                           </Row>
                           <Row className="align-items-center">
                              <Col>
                                <div className="tableText">
                                   <h4><img src={BusdIcon} alt="" />  BUSD </h4>
                                </div>  
                              </Col>
                              <Col>
                                <div className="tableText">
                                    <b><span>$</span>12.2m</b>
                                </div>
                              </Col>
                              <Col>
                                <div className="tableText">
                                    <b>1.5<span>%</span></b>
                                </div>
                              </Col>
                              <Col>
                                <div className="tableText">
                                    <div className="processWrap">
                                      <span className="eightySeven">87%</span>
                                    </div>  
                                 </div>
                              </Col>
                           </Row>
                           <Row className="align-items-center">
                              <Col>
                                <div className="tableText">
                                   <h4><img src={EthereumIcon} alt="" />  Ethereum </h4>
                                </div>  
                              </Col>
                              <Col>
                                <div className="tableText">
                                    <b><span>$</span>1.7m</b>
                                </div>
                              </Col>
                              <Col>
                                <div className="tableText">
                                    <b>0<span>%</span></b>
                                </div>
                              </Col>
                              <Col>
                                <div className="tableText">
                                    <div className="processWrap">
                                      <span className="nintynine">99%</span>
                                    </div>  
                                 </div>
                              </Col>
                           </Row>
                           <Row className="align-items-center">
                              <Col>
                                <div className="tableText">
                                   <h4><img src={UsdIcon} alt="" />  Tether </h4>
                                </div>  
                              </Col>
                              <Col>
                                <div className="tableText">
                                    <b><span>$</span>1.7m</b>
                                </div>
                              </Col>
                              <Col>
                                <div className="tableText">
                                    <b>0<span>%</span></b>
                                </div>
                              </Col>
                              <Col>
                                <div className="tableText">
                                    <div className="processWrap">
                                      <span className="nintynine">99%</span>
                                    </div>  
                                 </div>
                              </Col>
                           </Row>                                                                                 
                          </TabPane>
                          <TabPane tabId="4">
                            <Row>
                              <Col sm="6">
                                <Card body>
                                  
                                  <CardText></CardText>
                                  <Button>Go somewhere</Button>
                                </Card>
                              </Col>
                              <Col sm="6">
                                <Card body>
                                  <CardTitle>Special Title Treatment</CardTitle>
                                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                  <Button>Go somewhere</Button>
                                </Card>
                              </Col>
                            </Row>
                          </TabPane>
  
                        </TabContent>
                      </div>
                    </div>      
            </Col>
          </Row>
        </TabPane>
      </TabContent>
      </Col>
      <Col lg="4">
              <div className="votePage">
                  <Button>
                  <i class="fa fa-thumbs-up" aria-hidden="true"></i>&nbsp; Go to vote page
                  </Button>
                  <p>Current vote weight: 0</p>
              </div>
              <div className="currentLock">
                  <div className="currentImage">
                      <img src={LockIcon} alt="" />
                    </div>
                    <div className="currentText">
                        <h3>Current CVX Locks</h3>
                        <p>You have no CVX locks. Lock CVX on this page to get started.</p>
                    </div>  
              </div>
              <div className="delegateBox">
                  <div class="convert-table">
                      <div class="convert-tableTitle">
                          <div class="align-items-center row">
                            <div class="col">
                                <div class="tableTitle"><b> Delegate vote weight &nbsp; <i class="fa fa-info-circle" aria-hidden="true"></i> </b></div>
                            </div>
                          </div>
                      </div>
                      <div class="converttabs">
                          <ul>
                            <li className="addreesAdd">Specific address &nbsp;  <i class="fa fa-info-circle" aria-hidden="true"></i></li>
                            <li className="bentTeam">Bent team &nbsp;  <i class="fa fa-info-circle" aria-hidden="true"></i></li>
                          </ul>
                            <Label>Delegate address</Label>
                            <div className="delegateWrap">
                              <Input type="text" />
                              <Button type="submit">Delegate</Button>    
                           </div>
                      </div>
                  </div>
              </div>  
        </Col> 
        </Row>
        </div>  
        </Col>  
    </Row>
   </div>
  </Container>
</div>       
            {/* Lock content start */} 
       </React.Fragment>
    );
  
}

export default withRouter(LockCvx);
