import React, { Component } from "react";
// import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "../components/AppNavbar";
import {
  // NavItem,
  Container,
  Col,
  Row
} from 'reactstrap';


class HomePage extends Component {
  render() {
    return (
      <div className="home-page">
        <AppNavbar />
        <div className="main-content">
          <div className="description">
            <h2>sweep your mind clean from mental clutter</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            {/* <RegisterModal /> */}
          </div>
          <div className="cards">
            <Container>
              <Row>
                <Col className="card-columns">
                </Col>
                <Col className="card-columns">
                </Col>
                <Col className="card-columns">
                </Col>
              </Row>
            </Container>

          </div>
        </div>
      </div>
    );
  }
};

export default HomePage;
