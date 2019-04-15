import React, { Component } from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';

import './App.scss'
import StandupPage from './pages/StandupPage/StandupPage';
import AdminPage from './pages/AdminPage/AdminPage';
import HomePage from './pages/HomePage/HomePage';
import Navbars from "./components/Navbars/Navbars";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import EditPage from "./pages/EditPage/EditPage";
import CreatePage from "./pages/CreatePage/CreatePage";

class App extends Component {
  render() {
    return (
    <React.Fragment>
      <CssBaseline />
        <Router>
          <Navbars>
            <Switch>
              <Route path="/admin/:name/edit" exact component={EditPage} />
              <Route path="/admin/:name/start" exact component={AdminPage} />
              <Route path="/admin/create" exact component={CreatePage} />
              <Route path="/admin/:name/" exact render={routeProps => <HomePage {...routeProps} pageName={"adminPanel"} />} />
              <Route path="/standups/:name" exact component={StandupPage} />
              <Route path="/standups/" exact render={routeProps => <HomePage {...routeProps} pageName={"client"} />} />
              <Route path="/admin/" exact render={routeProps => <HomePage {...routeProps} pageName={"admin"} />} />
              <Route path="/" exact component={WelcomePage} />

              {/* Fallback */}
              <Route path="/" render={() => <Redirect to="/" />} />

            </Switch>
          </Navbars>
        </Router>
    </React.Fragment>
    )
  }
}

export default App;