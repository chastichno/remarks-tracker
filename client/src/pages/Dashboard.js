import React, { Component, Fragment } from "react";
import { getSpecificProject } from '../actions/projectActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppNavbar from "../components/AppNavbar";
import RemarkModal from "../components/RemarkModal";
import {
    withRouter,
    Redirect
} from "react-router-dom";
import RemarksList from "../components/RemarksList";
import { Container } from "react-bootstrap";


class Dashboard extends Component {

    componentDidMount() {
        this.props.getSpecificProject(this.props.match.params.id);
    };

    render() {
        const { projects } = this.props.project;
        const { isAuthenticated, user } = this.props.auth;

        const listOfUsers = projects.users;
        console.log("Dashboard ", user, listOfUsers);

        const authContent = (
            <Fragment>
                <Container>
                    <h2 className="projects__title">{projects.title}</h2>
                    <div className="projects__add"><RemarkModal project_id={this.props.match.params.id} /></div>
                </Container>
                <div><RemarksList project_id={this.props.match.params.id} users={listOfUsers} /></div>


            </Fragment>
        )
        return (
            <div className="dashboard">
                <AppNavbar />
                <div>
                    {
                        this.props.auth.token
                            ? (authContent) :
                            (<Redirect
                                to={{
                                    pathname: "/",
                                }}
                            />)}
                </div>
            </div>
        )
    }
};

Dashboard.propTypes = {
    getSpecificProject: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    project: state.project,
    auth: state.auth
})

export default withRouter(connect(mapStateToProps, { getSpecificProject }, null, { pure: false })(Dashboard));

// this.props.project.projects.users.includes(this.props.auth.user)