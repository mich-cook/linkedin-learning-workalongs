import React, { Component } from 'react';
import { Router, navigate } from '@reach/router';
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
      "user": null,
      "username": null,
      "userID": null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        this.setState({
          "user": firebaseUser,
          "username": firebaseUser.displayName,
          "userID": firebaseUser.uid
        });
      }
    });
  }

  registerUser = username => {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      firebaseUser.updateProfile({
        "displayName": username
      }).then(() => {
        this.setState({
          "user": firebaseUser,
          "username": firebaseUser.displayName,
          "userID": firebaseUser.uid
        })
      });
      navigate('/meetings');  // reach: goto /meetings
    });
  }

  logoutUser = e => {
    e.preventDefault();
    this.setState({
      "user": null,
      "username": null,
      "userID": null
    });

    firebase.auth().signOut().then(() => {
      navigate('/login');
    })
  }

  render() {
    return (
      <div>
        <Navigation userName={this.state.user} logoutUser={this.logoutUser} />
        {this.state.user !== null && <Welcome userName={this.state.username} logoutUser={this.logoutUser} /> }
        <Router>
          <Login path="/login" />
          <Home path="/" userName={this.state.username} />
          <Meetings path="/meetings" />
          <Register path="/register" registerUser={this.registerUser}/>
        </Router>
      </div>
    );
  }
}
