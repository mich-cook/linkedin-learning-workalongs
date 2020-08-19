import React, { Component } from 'react';
import { FaUndo, FaRandom } from 'react-icons/fa';
import firebase from './Firebase.js';
import AttendeeList from './AttendeeList.js';

export default class Attendees extends Component {
  constructor() {
    super();
    this.state = {
      "allAttendees": [],
      "attendeeNames": [],
      "keywords": ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.resetQuery = this.resetQuery.bind(this);
    this.chooseRandom = this.chooseRandom.bind(this);
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
        "allAttendees": attendeeList,
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

  resetQuery() {
    this.setState({
      "keywords": "",
      "attendeeNames": this.state.allAttendees
    });
  }

  chooseRandom() {
    const randomAttendee = Math.floor(Math.random() * this.state.allAttendees.length);
    this.resetQuery();
    this.setState({ "attendeeNames": [this.state.allAttendees[randomAttendee]] });
  }

  render() {

    const filter = item => item.attendeeName.toLowerCase().match(this.state.keywords.toLowerCase()) && true;
    const filteredAttendees = this.state.attendeeNames.filter(filter);

    return (<>
      <h1>Attendees</h1>
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="keywords" value={this.state.keywords} placeholder="Search Attendees" className="" onChange={this.handleChange}/>
        <button className="input-group-append" title="Reset Search" onClick={this.resetQuery}><FaUndo /></button>
        <button title="Random Attendee" onClick={this.chooseRandom}><FaRandom /></button>
      </form>
      <AttendeeList userID={this.props.userID} adminUser={this.props.adminUser} attendees={filteredAttendees} meetingID={this.props.meetingID} />
    </>);
  }

}
