import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
// import { Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-navi';


class Logout extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired
    }

    render() {
        return (
            <Fragment>
                <Link onClick={this.props.logout} href="#" className="nav-link">
                    Logout
                </Link>
            </Fragment>
        )
    }
}
export default connect(null, { logout })(Logout)