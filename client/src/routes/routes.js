import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import HomePage from "../pages/HomePage";
import ProjectsPage from "../pages/ProjectsPage";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";


class Routes extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <PublicRoute exact path="/">
                        <HomePage />
                    </PublicRoute>
                    <Route path="/projects/:id">
                        <Dashboard />
                    </Route>
                    <PrivateRoute path="/projects">
                        <ProjectsPage />
                    </PrivateRoute>

                </Switch>
            </Router>
        );
    }
}

export default Routes;