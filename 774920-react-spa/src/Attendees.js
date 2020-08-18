import React, { Component } from 'react';
import firebase from './Firebase.js';
import AttendeeList from './AttendeeList.js';

export default class Attendees extends Component {
  constructor() {
    super();
    this.state = {
      "attendeeNames": [],
      "keywords": ""
    };

    this.handleChange = this.handleChange.bind(this);
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

  handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {

    const filter = item => item.attendeeName.toLowerCase().match(this.state.keywords.toLowerCase()) && true;
    const filteredAttendees = this.state.attendeeNames.filter(filter);

    return (<>
      <h1>Attendees</h1>
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="keywords" value={this.state.keywords} placeholder="Search Attendees" className="" onChange={this.handleChange}/>
      </form>
      <AttendeeList userID={this.props.userID} adminUser={this.props.adminUser} attendees={filteredAttendees} meetingID={this.props.meetingID} />
    </>);
  }

}
