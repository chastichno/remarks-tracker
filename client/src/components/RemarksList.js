import React, { Component } from "react";
import {
    ListGroup,
    Button,
    Container,
    Row,
    Col
} from "react-bootstrap";
import { CSSTransition, TransitionGroup } from 'react-transition-group';


import { connect } from 'react-redux';
import { getRemarks, deleteRemark } from '../actions/remarkActions';
import PropTypes from 'prop-types';


class RemarksList extends Component {
    state = {
        project: this.props.project_id
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
            <Container>
                <table className="table table-hover table-responsive-md">
                    <thead>
                        <tr className="table-light">
                            <th scope="col">Title</th>
                            <th scope="col">Project</th>
                            <th scope="col">Severity</th>
                            <th scope="col">Date</th>
                            <th scope="col">Info</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!user ? '' :
                            remarks
                                .filter(remark => remark.project.includes(this.state.project))
                                .map(({ _id, title, project, severity, date }) => (
                                    <tr>
                                        <th scope="row">{title}</th>
                                                <td>{project}</td>
                                                <td>{severity}</td>
                                                <td>{date}</td>
                                                <td><Button href="#">View</Button></td>
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
            </Container>
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