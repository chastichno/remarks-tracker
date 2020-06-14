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
import { getProjects, deleteProject } from '../actions/projectActions';
import PropTypes from 'prop-types';


class ProjectsList extends Component {

    componentDidMount() {
        this.props.getProjects();
    };

    onDeleteClick = (id) => {
        this.props.deleteProject(id);
    };

    render() {
        const { projects } = this.props.project;
        const { isAuthenticated, user } = this.props.auth;
        console.log("ProjectList, isAuthentificated ", isAuthenticated);

        return (
            <Container>
                <p>The list of projects</p>
                <ListGroup>
                    <TransitionGroup className="projects-list">
                        {!user ? '' :
                            projects
                                .filter(project => {
                                    return project.users.includes(user._id)
                                })
                                .map(({ _id, title, users, date }) => (
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
                                                <Col>{users}</Col>
                                                <Col>{date}</Col>
                                                <Col><Button href={"/projects/"+_id}>View</Button></Col>
                                            </Row>
                                        </ListGroup.Item>
                                    </CSSTransition>
                                ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    };
};

ProjectsList.propTypes = {
    getProjects: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    project: state.project,
    auth: state.auth
})

export default connect(mapStateToProps, { getProjects, deleteProject })(ProjectsList);