import React, { Component } from 'react';
import { Router } from '@reach/router';
import firebase from './Firebase.js';

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

  componentDidMount() {
    const ref = firebase.database().ref('user');

    // when we see a new value
    ref.on('value', snapshot => {
      let FirebaseUser = snapshot.val();
      this.setState({ "user": FirebaseUser });
    });
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
