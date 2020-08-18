import React, { Component } from 'react';
import { GoTrashcan, GoMail, GoStar } from 'react-icons/go';

import firebase from './Firebase.js';

export default class AttendeeList extends Component {

  constructor() {
    super();
    this.deleteAttendee = this.deleteAttendee.bind(this);
  }

  toggleStar(e, star, meeting, attendee) {
    e.preventDefault();
    const adminUser = this.props.adminUser;
    const dbRef = firebase.database().ref(`meetings/${adminUser}/${meeting}/attendees/${attendee}/star`);
    if (star === undefined) {
      dbRef.set(true);
    } else {
      dbRef.set(!star);
    }
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
          <button className={'btn ' + (attendee.star?'btn-info':'btn-outline-secondary')} title="Star User" onClick={ e => this.toggleStar(e, attendee.star, this.props.meetingID, attendee.attendeeID)}><GoStar /></button>
          <a href={`mailto:${attendee.attendeeEmail}`} className="btn"><GoMail /></a>
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
