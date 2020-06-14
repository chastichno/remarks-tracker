import React, { Component } from "react";
import {
    Modal,
    Button,
    Form
} from "react-bootstrap";
import { connect } from 'react-redux';
import { addProject } from '../actions/projectActions';


class ProjectModal extends Component {
    state = {
        modalShow: false,
        title: '',
        users: [],

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

        const newProject = {
            title: this.state.title,
            users: [this.state.users]
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
            <Button variant="primary" onClick={this.toggle}>
                Create new Project
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
                    Create new Project
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
                                placeholder="Enter project name"
                                onChange={this.onChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicUsers">
                            <Form.Label>Users</Form.Label>
                            <Form.Control
                                type="text"
                                name="users"
                                placeholder="Choose users"
                                onChange={this.onChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
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
    project: state.project
});

export default connect(mapStateToProps, { addProject })(ProjectModal);