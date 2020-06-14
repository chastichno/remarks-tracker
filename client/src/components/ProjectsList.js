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
                {/* <TransitionGroup className=" projects-list"> */}
                <div className="row justify-content-center">
                    {!user ? '' :
                        projects
                            .filter(project => {
                                return project.users.includes(user._id)
                            })
                            .map(({ _id, title, users, date }) => (
                                <div className="col-12 col-md-6 col-lg-4" key={_id}>
                                    <CSSTransition timeout={500} classNames="fade">
                                        <div className="card border-primary mb-3" style={{ height: 15 + 'rem' }}>
                                            {/* style={{ maxWidth: 20 + 'rem' }}> */}
                                            <div className="card-header">{title}</div>
                                            <div className="card-body">
                                                <h4 className="card-title">{date}</h4>
                                                <p className="card-text">{users}</p>
                                                <div className="row justify-content-around">
                                                    <div className="col-4"><Button href={"/projects/" + _id} type="button" className="btn btn-primary ">View</Button>
                                                    </div>
                                                    <div className="col-4">
                                                        <Button
                                                            className="btn btn-warning"
                                                            onClick={this.onDeleteClick.bind(this, _id)}
                                                        >&times;</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CSSTransition>
                                </div>
                            ))}
                </div>
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