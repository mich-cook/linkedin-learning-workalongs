import React, { Component } from 'react';

export default class ListAppointments extends Component {
  render() {
    return (
      <ul id="appointmentList">
      {this.props.appointments.map(appointment => (
        <li key={appointment.id}>
          <p>Pet: {appointment.petName}</p>
          <p>Owner: {appointment.ownerName}</p>
          <p>Date: {appointment.aptDate}</p>
          <p>Notes: {appointment.aptNotes}</p>
        </li>
      ))};
      </ul>
    );
  }
}
