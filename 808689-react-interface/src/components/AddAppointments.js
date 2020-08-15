import React, { Component } from 'react';
import { FaPlus } from 'react-icons/fa';

export default class AddAppointments extends Component {
  render() {
    return (
      <div id="newAppointment" className={'' + (this.props.formDisplay ? '': 'add-appointment')}>
        <h2 onClick={this.props.toggleForm}><FaPlus />Add Appointment</h2>
        <form className="appointment-form">
          <label>Pet: <input type="text" name="pet" /></label>
          <label>Owner: <input type="text" name="owner" /></label>
          <label>Date: <input type="date" name="date" /></label>
          <label>Time: <input type="time" name="time" /></label>
          <label>Notes <input type="text" name="notes" /></label>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
