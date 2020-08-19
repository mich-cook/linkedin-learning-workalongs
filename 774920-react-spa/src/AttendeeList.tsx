import React from 'react';
import { GoTrashcan, GoMail, GoStar } from 'react-icons/go';

import firebase from './Firebase.js';

export default (props:any) => {

  function toggleStar(e:any, star:any, meeting:string, attendee:string) {
    e.preventDefault();
    const adminUser = props.adminUser;
    const dbRef = firebase.database().ref(`meetings/${adminUser}/${meeting}/attendees/${attendee}/star`);
    if (star === undefined) {
      dbRef.set(true);
    } else {
      dbRef.set(!star);
    }
  }

  function deleteAttendee(e:any, meeting:string, attendee:string) {
    e.preventDefault();
    const adminUser = props.adminUser;

    const dbRef = firebase.database().ref(`meetings/${adminUser}/${meeting}/attendees/${attendee}`);
    dbRef.remove();
  }

  const admin = (props.adminUser === props.userID) ? true:false;
  const attendees = props.attendees;
  const attendeeListMarkup = attendees.map((attendee:any) => (
    <li key={attendee.attendeeID}>
      {admin && (
      <span className="btn-group">
        <button className={'btn ' + (attendee.star?'btn-info':'btn-outline-secondary')} title="Star User" onClick={ e => toggleStar(e, attendee.star, props.meetingID, attendee.attendeeID)}><GoStar /></button>
        <a href={`mailto:${attendee.attendeeEmail}`} className="btn"><GoMail /></a>
        <button title="Delete Attendee" onClick={ e => deleteAttendee(e, props.meetingID, attendee.attendeeID)}><GoTrashcan /></button>
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
