import React, { Component } from "react";
import {
    Modal,
    Button,
    Form
} from "react-bootstrap";
import { connect } from 'react-redux';
import { addRemark } from '../actions/remarkActions';


class ViewRemarkModal extends Component {
    state = {
        modalShow: false,
        title: this.props.title,
        project: this.props.project,
        severity: this.props.severity,
        description: this.props.description,
        user_added: this.props.user_added,
        due_date: this.props.due_date,
        status: this.props.status,
        assigned_to: this.props.assigned_to,
        comments: this.props.comments,
        remark_id: this.props.remark_id
    }

    toggle = () => {
        this.setState({
            modalShow: !this.state.modalShow
        });
    };

    render() {
        return (
            <>
                <Button variant="primary" onClick={this.toggle}>
                    View
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
                            {this.state.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div>
                                        <h5>Description</h5>
                                        <p>{this.state.description}</p>
                                    </div>
                                    <div>
                                        <h5>Comments</h5>
                                        {this.state.comments}
                                    </div>
                                </div>
                                <div className="col">
                                    <div><b>Severity: </b>{this.state.severity}</div>
                                    <div><b>User added: </b>{this.state.user_added}</div>
                                    <div><b>Deadline: </b>{this.state.due_date}</div>
                                    <div><b>Assigned to: </b>{this.state.assigned_to}</div>
                                    <div><b>{this.state.status}</b></div>
                                </div>
                            </div>
                        </div>

                    </Modal.Body>
                </Modal>
            </>
        )
    }
};

const mapStateToProps = state => ({
    remark: state.remark
});

export default connect(mapStateToProps, { addRemark })(ViewRemarkModal);