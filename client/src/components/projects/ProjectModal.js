import React, { Component } from "react";
import {
    Modal,
    Button,
    Form
} from "react-bootstrap";
import { connect } from 'react-redux';
import { addProject } from '../../actions/projectActions';
import PropTypes from 'prop-types';


class ProjectModal extends Component {
    state = {
        modalShow: false,
        title: '',
        users: []
    }
    static propTypes = {
        auth: PropTypes.object.isRequired
    }
    toggle = () => {
        this.setState({
            modalShow: !this.state.modalShow
        });
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    };

    onSubmit = (e) => {
        e.preventDefault();
        const { isAuthenticated, user } = this.props.auth;
        console.log("USERs = ", this.state.users);
        const newProject = {
            title: this.state.title,
            users: this.state.users.length === 0 ? [user.email] : [user.email].concat(this.state.users.split(RegExp(",*\\s")))
        }
        console.log("ProjectModal = ", newProject);
        //Add item via AddProject action
        this.props.addProject(newProject);

        //Close modal
        this.toggle();
    }

    render() {

        return (
            <>
                <Button className="modal__button" onClick={this.toggle}>
                    Add Project
                </Button>

                <Modal
                    show={this.state.modalShow}
                    onHide={this.toggle}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Create New Project
                    </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {/* <h4>Create new Project</h4> */}
                        <p>
                            Here you can create new project and choose teammates
                    </p>
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group controlId="formNewProject" onSubmit={this.onSubmit}>
                                <Form.Label>Project Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    placeholder="My new project"
                                    onChange={this.onChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicUsers">
                                <Form.Label>Add teammates' emails divided by commas</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="users"
                                    placeholder="jenny@gmail.com, hello@summer.co.nz"
                                    onChange={this.onChange}
                                />
                            </Form.Group>
                            <Button className="modal__button" type="submit">
                                Add Project
                        </Button>
                        </Form>
                    </Modal.Body>
                    {/* <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={this.toggle}>Add Project</Button>
                </Modal.Footer> */}
                </Modal>
            </>
        )
    }
};

const mapStateToProps = state => ({
    project: state.project,
    auth: state.auth
});

export default connect(mapStateToProps, { addProject })(ProjectModal);