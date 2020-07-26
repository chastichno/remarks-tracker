import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-navi';


class Logout extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired
    }

    render() {
        return (
            <Fragment>
                <a onClick={this.props.logout} href="#" className="btn btn-primary navbar-btn">
                    Logout
                </a>
            </Fragment>
        )
    }
}
export default connect(null, { logout })(Logout)