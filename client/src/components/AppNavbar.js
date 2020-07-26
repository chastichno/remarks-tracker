import React, { Component, Fragment } from 'react';
import {
    Navbar,
    Nav,
    Container
} from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RegisterModal from "./auth/RegisterModal.js";
import LoginModal from "./auth/LoginModal.js";
import Logout from "./auth/Logout.js";
import logo from '../assets/logo.svg';


class AppNavBar extends Component {

    state = {
        isOpen: false
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Fragment>
                <Nav.Item className="nav-item active">
                    <a className="nav-link" href='/projects' style={{position:"relative", top: 4+"px"}} >
                        {/* {user ?
                            user.name : ''} */}
                            Projects
                    </a>
                </Nav.Item>
                <Nav.Item className="nav-item active">
                    <Logout />
                </Nav.Item>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <Nav.Item className="nav-item active">
                    <RegisterModal />
                </Nav.Item>
                <Nav.Item className="nav-item active">
                    <LoginModal />
                </Nav.Item>
            </Fragment>
        );

        return (
                <Navbar expand="lg" className="navbar navbar-expand-md navbar-light bg-light">
                    <Container>
                        <Navbar.Brand className="logo" href="/"><img src={logo} width="35px" alt="logo" />  Re:Mark</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="navbar-nav ml-auto" navbar>
                                {isAuthenticated ? authLinks : guestLinks}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavBar);