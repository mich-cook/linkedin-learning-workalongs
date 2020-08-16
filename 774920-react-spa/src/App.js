import React, { Component } from 'react';
import { Router } from '@reach/router';

import './App.css';

import Home from './Home.js';
import Welcome from './Welcome.js';
import Navigation from './Navigation.js';
import Login from './Login.js';
import Meetings from './Meetings.js';
import Register from './Register.js';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      "user": null
    };
  }

  render() {
    return (
      <div>
        <Navigation userName={this.state.user} />
        {this.state.user !== null && <Welcome userName={this.state.user} /> }
        <Router>
          <Login path="/login" />
          <Home path="/" userName={this.state.user} />
          <Meetings path="/meetings" />
          <Register path="/register" />
        </Router>
      </div>
    );
  }
}
