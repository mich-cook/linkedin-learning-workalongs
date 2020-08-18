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
    const ref = firebase.database().ref('user');

    // when we see a new value
    ref.on('value', snapshot => {
      let FirebaseUser = snapshot.val();
      this.setState({ "user": FirebaseUser });
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

  render() {
    return (
      <div>
        <Navigation userName={this.state.user} />
        {this.state.user !== null && <Welcome userName={this.state.username} /> }
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
