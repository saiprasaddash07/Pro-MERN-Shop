import React from 'react';
import { Row, Col, Nav} from 'react-bootstrap';
import LogoSvg from "../Logo/shopping-cart.svg";
import {LinkContainer} from "react-router-bootstrap";
import GitHub from '../Logo/github-sign.svg';
import Instagram from '../Logo/instagram.svg';
import Twitter from '../Logo/twitter.svg';
import LinkedIn from '../Logo/linkedin.svg';

const Footer = () => {
    return (
        <footer>

            <div className="bg-dark footerdiv">
                <Row>
                    <Col>
                        <img src={LogoSvg} alt="Logo" style={{"height":"40px","padding-bottom":"5px"}} />
                        <span style={{"font-size": "22px","color":"white"}}>Pro-MERN-Shop</span>
                    </Col>
                    <Col>
                        <h4>
                            <span style={{"font-size": "18px","color":"white"}}>Quick Links</span>
                        </h4>
                        <Row>
                            <LinkContainer exact to="/cart">
                                <Nav.Link>
                                    <span style={{"font-size": "18px","color":"white"}}><i className="fas fa-shopping-cart"></i>
                                        <span className="hovered"> Cart</span>
                                    </span>
                                </Nav.Link>
                            </LinkContainer>
                        </Row>
                        <Row>
                            <LinkContainer exact to="/register">
                                <Nav.Link>
                                    <span style={{"font-size": "18px","color":"white"}}><i className="fas fa-user"></i>
                                        <span className="hovered"> Sign Up</span>
                                    </span>
                                </Nav.Link>
                            </LinkContainer>
                        </Row>
                        <Row>
                            <LinkContainer exact to="/login">
                                <Nav.Link>
                                    <span style={{"font-size": "18px","color":"white"}}><i className="fas fa-sign-in-alt"></i>
                                        <span className="hovered"> Log In</span>
                                    </span>
                                </Nav.Link>
                            </LinkContainer>
                        </Row>
                    </Col>
                    <Col>
                        <h4>
                            <span style={{"font-size": "18px","color":"white"}}>Social Links</span>
                        </h4>

                        <a href="https://www.instagram.com/sai__prasad__07/" target="_blank">
                            <img
                                src={Instagram}
                                alt="Logo"
                                style={{"height":"40px","padding-bottom":"5px","padding-right":"10px"}}
                            />
                        </a>
                        <a href="https://github.com/saiprasaddash07" target="_blank">
                            <img
                                src={GitHub}
                                alt="Logo"
                                style={{"height":"40px","padding-bottom":"5px","padding-right":"10px"}}
                            />
                        </a>
                        <a href="https://twitter.com/DashSaiprasad" target="_blank">
                            <img
                                src={Twitter}
                                alt="Logo"
                                style={{"height":"40px","padding-bottom":"5px","padding-right":"10px"}}
                            />
                        </a>
                        <a href="https://www.linkedin.com/in/sai-prasad-dash-b6b3231a0/" target="_blank">
                            <img
                                src={LinkedIn}
                                alt="Logo"
                                style={{"height":"40px","padding-bottom":"5px","padding-right":"10px"}}
                            />
                        </a>
                    </Col>
                </Row>
            </div>
        </footer>
    );
}

export default Footer;