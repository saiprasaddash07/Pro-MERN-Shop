import React, {Component} from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {Nav, Navbar, Container, NavDropdown} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from '../actions/userActions';

class Header extends Component {

    render() {

        const logoutHandler = () => {
            this.props.onLogOutHandler();
            window.location.reload(false);
        }

        return (
            <header>
                <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                    <Container>
                        <LinkContainer to="/">
                            <Navbar.Brand>Pro-MERN-Shop</Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                <LinkContainer exact to="/cart">
                                    <Nav.Link>
                                        <i className="fas fa-shopping-cart"></i>
                                        Cart
                                    </Nav.Link>
                                </LinkContainer>

                                {this.props.user.userInfo
                                    ?   <NavDropdown
                                            title={this.props.user.userInfo.name}
                                            id="username">
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item>
                                                Profile
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>
                                            Log Out
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    : (<LinkContainer to="/login">
                                        <Nav.Link>
                                            <i className="fas fa-user"></i>
                                            Sign In
                                        </Nav.Link>
                                    </LinkContainer>)
                                }

                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user : state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogOutHandler : () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);
