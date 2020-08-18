import React, { Component } from 'react';
import { GoTrashcan } from 'react-icons/go';

import firebase from './Firebase.js';

export default class AttendeeList extends Component {

  constructor() {
    super();
    this.deleteAttendee = this.deleteAttendee.bind(this);
  }

  deleteAttendee(e, meeting, attendee) {
    e.preventDefault();
    const adminUser = this.props.adminUser;

    const dbRef = firebase.database().ref(`meetings/${adminUser}/${meeting}/attendees/${attendee}`);
    dbRef.remove();
  }

  render() {

    const admin = (this.props.adminUser === this.props.userID) ? true:false;

    const attendees = this.props.attendees;
    const attendeeListMarkup = attendees.map(attendee => (
      <li key={attendee.attendeeID}>
        {admin && (
        <span className="btn-group">
          <button title="Delete Attendee" onClick={ e => this.deleteAttendee(e, this.props.meetingID, attendee.attendeeID)}><GoTrashcan /></button>
        </span>
        )}
        {attendee.attendeeName}
      </li>
    ));

    return (
      <ul>
        {attendeeListMarkup}
      </ul>
    );
  }

}
