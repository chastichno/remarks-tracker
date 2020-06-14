import React, { Component } from "react";
import {
    Route,
    Redirect
} from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class PublicRoute extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    }
    render() {
        const { token } = this.props.auth;
        return (
            <Route
                render={() =>
                    !token ? (this.props.children)
                        : (
                            <Redirect
                                to={{
                                    pathname: "/projects",
                                }}
                            />
                        )
                }
            />
        );
    }
}


const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(PublicRoute);