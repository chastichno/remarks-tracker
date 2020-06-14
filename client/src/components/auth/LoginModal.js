import React, { Component, Fragment } from "react";
import {
    Modal,
    Button,
    Form
} from "react-bootstrap";
import { Link } from 'react-navi';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';


class LoginModal extends Component {
    state = {
        modalShow: false,
        email: '',
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            //Check for register error
            if (error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }

        //If uathenticated, close modal
        if (this.state.modalShow) {
            if (isAuthenticated) {
                this.toggle();
            }
        }
    };

    toggle = () => {
        this.props.clearErrors();
        this.setState({
            modalShow: !this.state.modalShow
        });
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    };

    onSubmit = (e) => {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        //Attempt to Login
        this.props.login(user)
        // window.location.href = "/projects";

    }

    render() {
        return (
            <Fragment>
                <Link href="#" onClick={this.toggle} className="nav-link">
                    Login
                </Link>

                <Modal
                    show={this.state.modalShow}
                    onHide={this.toggle}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Login
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group controlId="formNewEmail" onSubmit={this.onSubmit}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    onChange={this.onChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                    onChange={this.onChange}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Login
                        </Button>
                        </Form>
                    </Modal.Body>

                </Modal>
            </Fragment>
        )
    }
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);