import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "../components/AppNavbar";
import ProjectsList from "../components/ProjectsList";
import {Container} from "reactstrap";
import ProjectModal from "../components/ProjectModal";

class ProjectsPage extends Component {

  render() {
    return (
      <div>
        <AppNavbar />
        <Container>

          <h1>Projects Dashboard</h1>

          {/* <Button variant="secondary" size="lg" href="/newproject" onClick={this.onClick}>
            Start your session
              </Button> */}
          <ProjectModal />
          <ProjectsList />

        </Container>
      </div>
    );
  }
};

export default ProjectsPage;
