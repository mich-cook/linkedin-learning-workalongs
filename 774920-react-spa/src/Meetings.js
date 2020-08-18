import React, { Component } from 'react';

import MeetingList from './MeetingList.js';

export default class Meetings extends Component {

  constructor() {
    super();
    this.state = {
      "meetingName": "",
      "errorMessage": null
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
    this.props.addMeeting(this.state.meetingName);
    this.setState({ "meetingName": "" });
  }

  render() {
    return (
      <div className="">
        <h1>Meetings</h1>
        <h2>Add A Meeting</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Meeting Name:
            <input type="text" name="meetingName" placeholder="Meeting Name" value={this.state.meetingName}
              onChange={this.handleChange}
            />
          </label>
          <button>Add</button>{/* eventually, + inline with text input above */}
        </form>
        {this.props.meetings && this.props.meetings.length > 0 ? (<>
          <h2>Your Meetings</h2>
          <MeetingList userID={this.props.userID} meetings={this.props.meetings} />
        </>) : null}
      </div>
    );
  }

}
