import React, { Component, Suspense, lazy } from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';

import './App.scss'
import Navbars from "./components/Navbars/Navbars";
import SimpleSpinner from "./components/SimpleSpinner/SimpleSpinner";

const TeamPage = lazy(() => import('./pages/TeamPage/TeamPage'));
const TeamsPage = lazy(() => import('./pages/TeamsPage/TeamsPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage/ProjectsPage'));
const WelcomePage = lazy(() => import('./pages/WelcomePage/WelcomePage'));
const StandupPage = lazy(() => import('./pages/StandupPage/StandupPage'));
const AdminPage = lazy(() => import('./pages/AdminPage/AdminPage'));
const EditPage = lazy(() => import('./pages/EditPage/EditPage'));
const CreatePage = lazy(() => import('./pages/CreatePage/CreatePage'));

class App extends Component {
  render() {
    return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <Navbars>
          <Suspense fallback={<SimpleSpinner />}>
            <Switch>
              <Route path="/project/:projectName/:teamName/edit" exact component={EditPage} />
              <Route path="/project/:projectName/:teamName/admin" exact component={AdminPage} />
              <Route path="/project/:projectName/:teamName/standup" exact component={StandupPage} />
              <Route path="/project/:projectName/create" exact component={CreatePage} />
              <Route path="/project/:projectName/:teamName" exact component={TeamPage} />
              <Route path="/project/:projectName" exact component={TeamsPage} />
              <Route path="/project" exact component={ProjectsPage} />

              <Route path="/" exact component={WelcomePage} />

              {/* Fallback */}
              <Route path="/" render={() => <Redirect to="/" />} />

            </Switch>
          </Suspense>
        </Navbars>
      </Router>
    </React.Fragment>
    )
  }
}

export default App;