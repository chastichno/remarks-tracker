import React, { Component } from "react";
import {
    Button,
    Container
} from "react-bootstrap";
import { CSSTransition } from 'react-transition-group';


import { connect } from 'react-redux';
import { getProjects, deleteProject } from '../../actions/projectActions';
import PropTypes from 'prop-types';

import searchLogo from "../../assets/search.png";
import sortLogo from "../../assets/sort.png";

import UsersList from "./UsersList";

class ProjectsList extends Component {
    state = {
        projectSort: "default",
        search: ""
    }
    componentDidMount() {
        this.props.getProjects();
    };

    onDeleteClick = (id) => {
        this.props.deleteProject(id);
    };
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        console.log(e.target.name)
    };

    render() {
        const { projects } = this.props.project;
        const { isAuthenticated, user } = this.props.auth;
        console.log("ProjectList, isAuthentificated ", isAuthenticated);

        return (
            <div className="projectsList">
                <Container>
                    <div className="row projects__list__filtering">
                        <div className="col-12 col-sm-6 search">
                            <label><img src={searchLogo} style={{ width: 15 + "px" }}></img></label>
                            <input id="search" name="search" onChange={this.onChange} placeholder="Search..." />
                        </div>
                        <div className="col-12 col-sm-6 sort">
                            <label><img src={sortLogo} style={{ width: 15 + "px" }}></img></label>
                            <select name="projectsSort" id="projectsSort" onChange={this.onChange}>
                                <option value="dateDesc">Date: new to old</option>
                                <option value="dateAsc">Date: old to new</option>
                                <option value="nameAsc">Project Name</option>
                            </select>
                        </div>
                    </div>
                </Container>
                <Container>
                    {/* <TransitionGroup className=" projects-list"> */}
                    <div className="row justify-content-center">
                        {!user ? '' :
                            projects
                                .filter(project => {
                                    console.log(this.state.projectsSort);
                                    return project.users.includes(user.email)
                                })
                                .sort((a, b) => {
                                    switch (document.getElementById("projectsSort").value) {
                                        case "dateDesc":
                                            return a.date > b.date ? -1 : 1;
                                        case "nameAsc":
                                            return a.title.localeCompare(b.title);
                                        default:
                                            return a.date > b.date ? 1 : -1;
                                    }
                                })

                                .filter(project => {
                                    const regex = new RegExp(document.getElementById("search").value, 'gi');
                                    return project.title.match(regex)
                                })

                                .map(({ _id, title, users, date }) => (

                                    <div className="col-12 col-md-6 col-lg-4" key={_id}>
                                        <CSSTransition timeout={500} classNames="fade">
                                            <div className="card text-white bg-primary mb-3" style={{ height: 10 + 'rem' }}>
                                                <div className="card-body">
                                                    <h5><a className="text-white" href={"/projects/" + _id}>{title}</a></h5>
                                                    <UsersList users={users} />
                                                    <a
                                                        className="delete-project"
                                                        onClick={this.onDeleteClick.bind(this, _id)}
                                                    >&times;</a>
                                                </div>
                                            </div>
                                        </CSSTransition>
                                    </div>
                                ))
                        }
                    </div>
                </Container>
            </div>
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


