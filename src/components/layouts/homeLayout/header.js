import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container } from 'reactstrap';
const Header = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <React.Fragment>
            <div className="headerHome">
                <Container>
                    <Row>
                        <Navbar color="faded" light>
                            <NavbarBrand href="/" className="mr-auto">reactstrap</NavbarBrand>
                            <div className="homeMenu">
                                <ul>
                                    <li><Link to='#'>Stake</Link></li>     
                                    <li><Link to='#'>Claim</Link></li>     
                                    <li><Link to='#'>Lock CVX</Link></li>     
                                    <li><Link to='#'>More</Link></li>     
                                </ul>       
                            </div>
                            <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                            <Collapse isOpen={!collapsed} navbar>
                            <Nav navbar>
                                <NavItem>
                                <NavLink href="/components/">Components</NavLink>
                                </NavItem>
                                <NavItem>
                                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                                </NavItem>
                            </Nav>
                            </Collapse>
                        </Navbar>
                    </Row>
                </Container>
          </div>    
    </React.Fragment>
  );
};

export default Header;
