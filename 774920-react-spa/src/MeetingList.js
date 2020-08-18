import React, { Component } from 'react';
import { navigate } from '@reach/router';
import { GoTrashcan } from 'react-icons/go';
import { FaLink } from 'react-icons/fa';

import firebase from './Firebase.js';

export default class MeetingList extends Component {

  constructor() {
    super();
    this.deleteMeeting = this.deleteMeeting.bind(this);
  }

  deleteMeeting = (e, which) => {
    e.preventDefault();
    const dbRef = firebase.database().ref(`meetings/${this.props.userID}/${which}`);
    dbRef.remove();
  }

  render() {
    const { meetings } = this.props;

    const myMeetings = meetings.map(meeting => {
      return(
        <li key={meeting.meetingID}>
          <section className="btn-group" role="group" aria-label="Meeting Options">
            <button title="Delete Meeting" onClick={e => this.deleteMeeting(e, meeting.meetingID)}>
              <GoTrashcan />
            </button>
            <button title="Check In" onClick={() => navigate(`/checkin/${this.props.userID}/${meeting.meetingID}`)}>
              <FaLink />
            </button>
          </section>
          {meeting.meetingName}
        </li>
      );
    });

    return (
      <ul>{myMeetings}</ul>
    );
  }

}
