import React, { Component } from 'react';
import { FaTimes } from 'react-icons/fa';
import Moment from 'react-moment';

export default class ListAppointments extends Component {
  render() {
    return (
      <ul id="appointmentList">
      {this.props.appointments.map(appointment => (
        <li key={appointment.id}>
          <p>Pet: {appointment.petName}</p>
          <p>Owner: {appointment.ownerName}</p>
          <p>Date: <Moment date={appointment.aptDate} parse="YYYY-MM-DD hh:mm" format="MMM D h:mma" /></p>
          <p>Notes: {appointment.aptNotes}</p>
          <FaTimes />
        </li>
      ))};
      </ul>
    );
  }
}
