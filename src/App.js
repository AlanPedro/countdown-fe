import React, { Component } from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';

import './App.scss'
import StandupPage from './pages/StandupPage/StandupPage';
import AdminPage from './pages/AdminPage/AdminPage';
import HomePage from './pages/HomePage/HomePage';
import Navbars from "./components/Navbars/Navbars";
import WelcomePage from "./pages/WelcomePage/WelcomePage";

class App extends Component {
  render() {
    return (
    <React.Fragment>
      <CssBaseline />
        <Router>
          <Navbars>
            <Switch>
              <Route path="/admin/:name" exact component={AdminPage} />
              <Route path="/standups/:name" exact component={StandupPage} />
              <Route path="/admin" exact component={HomePage} />
              <Route path="/standups" exact component={HomePage} />
              <Route path="/" exact component={WelcomePage} />

              {/* Fallback*/}
              <Route path="/" render={() => <Redirect to="/" />} />

            </Switch>
          </Navbars>
        </Router>
    </React.Fragment>
    )
  }
}

export default App;