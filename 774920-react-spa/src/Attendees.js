import React, { Component } from 'react';
import firebase from './Firebase.js';
import AttendeeList from './AttendeeList.js';

export default class Attendees extends Component {
  constructor() {
    super();
    this.state = {
      attendeeNames: []
    };
  }

  componentDidMount() {
    const dbRef = firebase.database().ref(`meetings/${this.props.userID}/${this.props.meetingID}/attendees`);
    dbRef.on('value', snapshot => {
      let attendees = snapshot.val();
      let attendeeList = [];
      for (let attendee in attendees) {
        attendeeList.push({
          "attendeeID": attendee,
          "attendeeName":  attendees[attendee].attendeeName,
          "attendeeEmail": attendees[attendee].attendeeEmail,
          "star": attendees[attendee].star
        });
      }

      this.setState({
        "attendeeNames": attendeeList
      });
    });
  }

  render() {
    return (<>
      <h1>Attendees</h1>
      <AttendeeList userID={this.props.userID} adminUser={this.props.adminUser} attendees={this.state.attendeeNames} meetingID={this.props.meetingID} />
    </>);
  }

}
