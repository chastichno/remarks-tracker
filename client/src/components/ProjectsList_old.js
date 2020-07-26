import React, { Component } from "react";
import {
    Button,
    Container
} from "react-bootstrap";
import { CSSTransition } from 'react-transition-group';


import { connect } from 'react-redux';
import { getProjects, deleteProject } from '../actions/projectActions';
import PropTypes from 'prop-types';


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

            <Container>
                <label>Sort by </label>

                <select name="projectsSort" id="projectsSort" onChange={this.onChange}>
                    <option value="dateAsc">Date: ascending order</option>
                    <option value="dateDesc">Date: descending order</option>
                    <option value="nameAsc">Project Name</option>
                    <option value="modified">Date modified</option>
                    <option style={{backgroundColor:"red"}}></option>
                </select>

                <label>Search project</label>
                <input id="search" name="search" onChange={this.onChange} />
                {/* <TransitionGroup className=" projects-list"> */}
                <div className="row justify-content-center">
                    {!user ? '' :
                        projects
                            .filter(project => {
                                console.log(this.state.projectsSort);
                                return project.users.includes(user._id)
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

                            .map(({_id, title, users, date}) => (
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
                            ))

                    }
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


