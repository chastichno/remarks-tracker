import React, { Component } from "react";
import {
    Modal,
    Button,
    Form
} from "react-bootstrap";
import { connect } from 'react-redux';
import { addRemark } from '../actions/remarkActions';


class RemarkModal extends Component {
    state = {
        modalShow: false,
        title: '',
        project: this.props.project_id,
        severity: 'Minor',
        description: '',
        user_added: 'temporary',
        due_date: '',
        status: 'Active',
        assigned_to: '',
        comments: ''
    }

    toggle = () => {
        this.setState({
            modalShow: !this.state.modalShow
        });
    };

    onChange = (e) => {
        console.log(e.target.name, ": ", e.target.value);
        this.setState({ [e.target.name]: e.target.value })
    };

    onSubmit = (e) => {
        e.preventDefault();

        const newRemark = {
            title: this.state.title,
            project: this.state.project,
            severity: this.state.severity,
            description: this.state.description,
            user_added: this.state.user_added,
            due_date: this.state.due_date,
            status: this.state.status,
            assigned_to: this.state.assigned_to,
            comments: this.state.comments
        }

        console.log("RemarkModal = ", newRemark);
        //Add item via AddRemark action
        this.props.addRemark(newRemark);

        //Close modal
        this.toggle();
    }

    render() {
        return (
            <>
                <Button variant="primary" onClick={this.toggle}>
                    Create new Remark
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
                            Create new Remark
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* <h4>Create new Remark</h4> */}

                        <Form onSubmit={this.onSubmit}>
                            <Form.Group controlId="formNewRemark" onSubmit={this.onSubmit}>
                                <Form.Label>Remark Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    placeholder="My Remark"
                                    onChange={this.onChange}
                                />

                                <Form.Label>Remark Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="description"
                                    placeholder="Describe received remark"
                                    onChange={this.onChange}
                                />

                                <Form.Label>Severity</Form.Label>
                                <Form.Control as="select" name="severity" onChange={this.onChange} custom>
                                    <option>Minor</option>
                                    <option>Moderate</option>
                                    <option>Major</option>
                                    <option>Critical</option>
                                </Form.Control>

                                <Form.Label>Deadline</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="due_date"
                                    onChange={this.onChange}
                                />

                                <Form.Label>Assign to:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="assigned_to"
                                    placeholder="Type email"
                                    onChange={this.onChange}
                                />

                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Add remark
                        </Button>
                        </Form>
                    </Modal.Body>
                    {/* <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={this.toggle}>Add Remark</Button>
                </Modal.Footer> */}
                </Modal>
            </>
        )
    }
};

const mapStateToProps = state => ({
    remark: state.remark
});

export default connect(mapStateToProps, { addRemark })(RemarkModal);