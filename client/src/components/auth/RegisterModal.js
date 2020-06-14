import React, { Component, Fragment } from "react";
import {
    Button,
    Modal,
    Form,
    Alert
} from 'react-bootstrap';
import { Link } from 'react-navi';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends Component {
    state = {
        modalShow: false,
        name: '',
        email: '',
        password: '',
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            //Check for register error
            if (error.id === 'REGISTER_FAIL') {
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

        const { name, email, password } = this.state;

        // Create user object
        const newUser = {
            name,
            email,
            password
        };

        //Attempt to register
        this.props.register(newUser);


    }

    render() {
        return (
            <Fragment>
                <Link onClick={this.toggle} href="#" className="nav-link">
                    Register
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
                            Register
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.onSubmit}>

                            {this.state.msg ?
                            (<div class="alert alert-dismissible alert-primary">
                                <strong>Oops!</strong>
                                <p>{this.state.msg}</p>
                            </div>)
                            : null}
                            <Form.Group controlId="registerName" onSubmit={this.onSubmit}>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    onChange={this.onChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="registerEmail" onSubmit={this.onSubmit}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    onChange={this.onChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="registerPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    onChange={this.onChange}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Register
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);