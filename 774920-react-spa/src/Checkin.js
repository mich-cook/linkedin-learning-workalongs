import React, { Component } from 'react';
import { navigate } from '@reach/router';

import firebase from './Firebase.js';

export default class Checkin extends Component {

  constructor() {
    super();
    this.state = {
      "email": "",
      "displayName": ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;

    this.setState({ [key]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const dbRef = firebase.database().ref(`meetings/${this.props.userID}/${this.props.meetingID}/attendees`);
    dbRef.push({
      "attendeeName": this.state.displayName,
      "attendeeEmail": this.state.email
    });

    navigate(`/attendees/${this.props.userID}/${this.props.meetingID}`);

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Name:
          <input required type="text" name="displayName" placeholder="Name" value={this.state.displayName} onChange={this.handleChange} />
        </label>
        <label>Email:
          <input required type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
        </label>
        <button>Check In</button>
      </form>
    );
  }

}
