import React, { Component } from 'react';
import { Router } from "@reach/router"

import './App.scss'
import StandupPage from './pages/StandupPage/StandupPage';
import AdminPage from './pages/AdminPage/AdminPage';

class App extends Component {
  render() {
    return (
      <Router>
        <AdminPage path="standups/:name/admin" />
        <StandupPage path="standups/:name" />
      </Router>
    )
  }
}
// TODO: Add svg circle timer
// const PosedSvg = posed.svg({})

export default App;