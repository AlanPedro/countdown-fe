import React, { Component, Suspense, lazy } from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';

import './App.scss'
import Navbars from "./components/Navbars/Navbars";
import SimpleSpinner from "./components/SimpleSpinner/SimpleSpinner";
import { PageNames } from './pages/HomePage/HomePage';

const WelcomePage = lazy(() => import('./pages/WelcomePage/WelcomePage'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
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
              <Route path="/admin/:name/edit" exact component={EditPage} />
              <Route path="/admin/:name/start" exact component={AdminPage} />
              <Route path="/admin/create" exact component={CreatePage} />
              <Route path="/admin/:name" exact render={routeProps => <HomePage {...routeProps} pageName={PageNames.ADMIN_PANEL} />} />
              <Route path="/standups/:name" exact component={StandupPage} />
              <Route path="/standups/" exact render={routeProps => <HomePage {...routeProps} pageName={PageNames.CLIENT} />} />
              <Route path="/admin/" exact render={routeProps => <HomePage {...routeProps} pageName={PageNames.ADMIN} />} />
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