import React, { Component } from 'react';
import { FaTimes } from 'react-icons/fa';
import Moment from 'react-moment';

export default class ListAppointments extends Component {
  render() {
    return (
      <ul id="appointmentList">
      {this.props.appointments.map(appointment => (
        <li key={appointment.id}>
          <p>Pet: <span contentEditable suppressContentEditableWarning
            onBlur={ e => this.props.updateInfo('petName', e.target.innerText, appointment.id)}
          >{appointment.petName}</span></p>
          <p>Owner: <span contentEditable suppressContentEditableWarning
            onBlur={ e => this.props.updateInfo('ownerName', e.target.innerText, appointment.id)}
          >{appointment.ownerName}</span></p>
          <p>Date: <Moment date={appointment.aptDate} parse="YYYY-MM-DD hh:mm" format="MMM D h:mma" /></p>
          <p>Notes: <span contentEditable suppressContentEditableWarning
            onBlur={ e => this.props.updateInfo('aptNotes', e.target.innerText, appointment.id)}
          >{appointment.aptNotes}</span></p>
          <button className="btn-danger" onClick={() => this.props.deleteAppointment(appointment)}><FaTimes /></button>
        </li>
      ))}
      </ul>
    );
  }
}
