import React, { Component } from "react";
import {
    Button,
    Container
} from "react-bootstrap";
// import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { connect } from 'react-redux';
import { getRemarks, deleteRemark } from '../actions/remarkActions';
import PropTypes from 'prop-types';

import ViewRemarkModal from "./ViewRemarkModal";

class RemarksList extends Component {
    state = {
        project: this.props.project_id,
        users: this.props.users
    }

    componentDidMount() {
        this.props.getRemarks();
    };

    onDeleteClick = (id) => {
        this.props.deleteRemark(id);
    };

    render() {
        const { remarks } = this.props.remark;
        const { isAuthenticated, user } = this.props.auth;
        console.log("RemarkList, isAuthentificated ", isAuthenticated);


        return (
            <div>
                <table className="table table-hover table-responsive-lg">
                    <thead>
                        <tr className="table-light">
                            <th scope="col">Title</th>
                            <th scope="col">Severity</th>
                            <th scope="col">Deadline</th>
                            <th scope="col">Added by</th>
                            <th scope="col">Assigned to</th>
                            <th scope="col">Added by</th>
                            <th scope="col">Info</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!user ? '' :
                            remarks
                                .filter(remark => remark.project.includes(this.state.project))
                                .map(({ _id, title, severity, due_date, date, assigned_to, user_added, status, project, description, comments }) => (
                                    <tr>
                                        <th scope="row">{title}</th>
                                        <th>{severity}</th>
                                        <th>{due_date}</th>
                                        <th>{date}</th>
                                        <th>{assigned_to}</th>
                                        <th>{user_added}</th>
                                        <th><ViewRemarkModal
                                            title={title}
                                            project={project}
                                            severity={severity}
                                            description={description}
                                            user_added={user_added}
                                            due_date={due_date}
                                            status={status}
                                            assigned_to={assigned_to}
                                            comments={comments}
                                            remark_id={_id}
                                        >View</ViewRemarkModal></th>
                                        <th>{status}</th>
                                    </tr>
                                ))}
                    </tbody>
                </table>

                {/* <ListGroup>
                        {!user ? '' :
                            remarks
                                .filter(remark => {
                                    return remark.project.includes(this.state.project)
                                })
                                .map(({ _id, title, project, severity, date }) => (
                                    <CSSTransition key={_id} timeout={500} classNames="fade">
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    <Button
                                                        className="remove-btn"
                                                        color="danger"
                                                        size="sm"
                                                        onClick={this.onDeleteClick.bind(this, _id)}
                                                    >&times;</Button>
                                                </Col>
                                                <Col>{title}</Col>
                                                <Col>{project}</Col>
                                                <Col>{severity}</Col>
                                                <Col>{date}</Col>
                                                <Col><Button href="#">View</Button></Col>
                                            </Row>
                                        </ListGroup.Item>
                                    </CSSTransition>
                                ))}
                </ListGroup> */}
            </div>
        );
    };
};

RemarksList.propTypes = {
    getRemarks: PropTypes.func.isRequired,
    remark: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    remark: state.remark,
    auth: state.auth
})

export default connect(mapStateToProps, { getRemarks, deleteRemark })(RemarksList);