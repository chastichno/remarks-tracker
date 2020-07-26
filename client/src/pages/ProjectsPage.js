import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "../components/AppNavbar";
import ProjectsList from "../components/projects/ProjectsList";
import {Container} from "reactstrap";
import ProjectModal from "../components/projects/ProjectModal";

class ProjectsPage extends Component {

  render() {
    return (
      <div>
        <AppNavbar />
        <Container>
          <h1 className="projects__title">Projects Dashboard</h1>
          <div className="projects__add"><ProjectModal /></div>
          <div className="projects__list"><ProjectsList /></div>
        </Container>
      </div>
    );
  }
};

export default ProjectsPage;
