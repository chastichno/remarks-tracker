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


class Dashboard extends Component {

    componentDidMount() {
        this.props.getSpecificProject(this.props.match.params.id);
    };

    render() {
        const { projects } = this.props.project;
        console.log("Dashboard ", this.props.match.params.id);

        const authContent = (
            <Fragment>
                <div className="text-center container">
                    <h2>{projects.title}</h2>
                    {/* <div>{projects.date}</div>
                <div>TEST</div>
                <div>{projects._id}</div>
                <div>{projects.users}</div>
                <div>{this.props.match.params.id}</div> */}
                    <RemarkModal project_id={this.props.match.params.id} />
                </div>
                <RemarksList project_id={this.props.match.params.id} />

            </Fragment>
        )
        return (
            <>
                <AppNavbar />
                <div>
                    {this.props.auth.token ? (authContent) :
                        (<Redirect
                            to={{
                                pathname: "/",
                            }}
                        />)}
                </div>
            </>
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

export default withRouter(connect(mapStateToProps, { getSpecificProject })(Dashboard));