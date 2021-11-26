import React from "react";
import { Link } from "react-router-dom";
import LogoIcon from "assets/images/logo.png";
import { Container, Row, Col } from "reactstrap";

const Footer = (): React.ReactElement => {
  return (
    <React.Fragment>
      <footer>
        <Container>
          <Row>
            <Col md="3" className="d-flex flex-column">
              <div className="footer-inner-block LogoWrp">
                <div className="footerlogo">
                  <Link to="/">
                    <img src={LogoIcon} alt="" />
                  </Link>
                </div>
                <p>
                  Bent is a staking and farming platform<br />
                  to enhance your curve returns,<br />
                  by the people for teh ppl.
                </p>
              </div>
            </Col>
            <Col md="3">
              <div className="footer-inner-block">
                <h3>Resources</h3>
                <ul>
                  <li>
                    <a href="https://github.com/bent-protocol/bent-audit" target="_blank" rel="noreferrer" >Audit Reports</a>
                  </li>
                  <li>
                    <a href="https://docs.bentfinance.com/" target="_blank" rel="noreferrer" >Documentation</a>
                  </li>
                </ul>
              </div>
            </Col>
            <Col md="3">
              <div className="footer-inner-block">
                <h3>Community</h3>
                <ul>
                  <li>
                    <a href="https://twitter.com/BENT_Finance" target="_blank" rel="noreferrer">Twitter</a>
                  </li>
                  <li>
                    <a href="https://t.me/BentFi" target="_blank" rel="noreferrer">Telegram Group</a>
                  </li>
                  <li>
                    <a href="https://bentfi.medium.com/" target="_blank" rel="noreferrer">Medium</a>
                  </li>
                </ul>
              </div>
            </Col>
            <Col md="3">
              <div className="footer-inner-block phone">
                <h3>Contact</h3>
                <ul>
                  {/* <li>
                    <Link to="/">
                      <i className="fa fa-phone" aria-hidden="true"></i>&nbsp; +1 -
                      732 872 123
                    </Link>
                  </li> */}
                  <li>
                    <a href="mailto:contact@bentfinance.com">
                      <i className="fa fa-envelope" aria-hidden="true"></i>&nbsp;
                      contact@bentfinance.com
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="12 mt-auto mb-3">
              <div className="footer-inner-block">
                <a href="https://etherscan.io/token/0x01597e397605bf280674bf292623460b4204c375" target="_blank" rel="noreferrer">BENT Token Contract: 0x01597e397605bf280674bf292623460b4204c375</a>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
