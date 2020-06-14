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
        severity: ''
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

        const newRemark = {
            title: this.state.title,
            project: this.state.project,
            severity: this.state.severity
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
                    <p>
                        Here you can create new remark and choose teammates
                    </p>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group controlId="formNewRemark" onSubmit={this.onSubmit}>
                            <Form.Label>Remark Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                placeholder="Enter remark title"
                                onChange={this.onChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicSeverity">
                            <Form.Label>Severity</Form.Label>
                            <Form.Control
                                type="text"
                                name="severity"
                                placeholder="Severity type"
                                onChange={this.onChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
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