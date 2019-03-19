import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.scss'
import StandupPage from './pages/StandupPage/StandupPage';
import AdminPage from './pages/AdminPage/AdminPage';
import HomePage from './pages/HomePage/HomePage';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/standups/:name/admin" component={AdminPage} />
          <Route path="/standups/:name" component={StandupPage} />
          <Route path="/" exact component={HomePage} />
        </Switch>
      </Router>
    )
  }
}
// TODO: Add svg circle timer
// const PosedSvg = posed.svg({})

export default App;