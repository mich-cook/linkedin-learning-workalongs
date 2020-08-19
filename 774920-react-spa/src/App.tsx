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
import Checkin from './Checkin.js';
import Attendees from './Attendees.js';

type State = Readonly<{
  "user": any,   // eventually, we need a better definiton for User. null|{} fails below.
  "username": null|string,
  "userID": null|string,
  "meetings": Array<{}>,
  "meetingCount": number
}>;

export default class App extends Component<any, State> {

  readonly state: State = {
    "user": null,
    "username": null,
    "userID": null,
    "meetings": [],
    "meetingCount": 0
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {

        this.setState({
          "user": firebaseUser,
          "username": firebaseUser.displayName,
          "userID": firebaseUser.uid
        });

        const meetingsRef = firebase.database().ref(`meetings/${firebaseUser.uid}`);

        meetingsRef.on('value', snapshot => {
          let meetings = snapshot.val();
          let meetingsList = [];

          for (let meeting in meetings) {
            meetingsList.push({
              meetingID: meeting,
              meetingName: meetings[meeting].meetingName
            });
          }

          this.setState({ "meetings": meetingsList, "meetingCount": meetingsList.length });

        });

      } else {
        this.setState({
          "user": null,
          "username": null,
          "userID": null
        });
      }
    });
  }

  registerUser = (username:string) => {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
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
      }
    });
  }

  logoutUser = () => {
    this.setState({
      "user": null,
      "username": null,
      "userID": null
    });

    firebase.auth().signOut().then(() => {
      navigate('/login');
    });

  }

  addMeeting = (meetingName:string) => {
    const dbRef = firebase.database().ref(`meetings/${this.state.user.uid}`);
    dbRef.push({ "meetingName": meetingName });
  }

  render() {
    return (
      <div>
        <Navigation userName={this.state.user} logoutUser={this.logoutUser} />
        {this.state.user !== null && <Welcome userName={this.state.username} logoutUser={this.logoutUser} /> }
        <Router>
          <Login path="/login" />
          <Home path="/" userName={this.state.username} />
          <Meetings path="/meetings" meetings={this.state.meetings} userID={this.state.userID} addMeeting={this.addMeeting} />
          <Attendees path="/attendees/:userID/:meetingID" adminUser={this.state.userID} />
          <Register path="/register" />{/* registerUser={this.registerUser}/> */}
          <Checkin path="/checkin/:userID/:meetingID" />
        </Router>
      </div>
    );
  }
}
