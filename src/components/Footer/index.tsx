import React from "react";
import { Link } from "react-router-dom";
import LogoIcon from "assets/images/logo.png";
import { Container, Row, Col } from "reactstrap";
const Footer = () => {
  return (
    <React.Fragment>
      <footer>
        <Container>
          <Row>
            <Col md="3">
              <div className="footer-inner-block LogoWrp">
                <div className="footerlogo">
                  <Link to="/">
                    <img src={LogoIcon} alt="" />
                  </Link>
                </div>
                <p>
                  Bent is an crypto investing platform with features such as
                  staking pooling and farming to grow your money effortlessley
                </p>
              </div>
            </Col>
            <Col md="3">
              <div className="footer-inner-block">
                <h3>Resources</h3>
                <ul>
                  <li>
                    <Link to="/">Documentation</Link>
                  </li>
                  <li>
                    <Link to="/">Blog</Link>
                  </li>
                  <li>
                    <Link to="/">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/">Terms & Conditions</Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col md="3">
              <div className="footer-inner-block">
                <h3>Community</h3>
                <ul>
                  <li>
                    <Link to="/">Twitter</Link>
                  </li>
                  <li>
                    <Link to="/">Discord</Link>
                  </li>
                  <li>
                    <Link to="/">Telegram announcements</Link>
                  </li>
                  <li>
                    <Link to="/">Telegram Chat</Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col md="3">
              <div className="footer-inner-block phone">
                <h3>Contact</h3>
                <ul>
                  <li>
                    <Link to="/">
                      <i className="fa fa-phone" aria-hidden="true"></i>&nbsp; +1 -
                      732 872 123
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <i className="fa fa-envelope" aria-hidden="true"></i>&nbsp;
                      contact@bent.markets
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col sm="12">
              <p className="copyright">Copyright © Bent Finance 2021</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
