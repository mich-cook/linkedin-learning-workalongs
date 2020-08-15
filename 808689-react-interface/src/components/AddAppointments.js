import React, { Component } from 'react';
import { FaPlus } from 'react-icons/fa';

export default class AddAppointments extends Component {

  constructor() {

    super();

    this.state = {
      "pet": "",
      "owner": "",
      "date": "",
      "time": "",
      "notes": ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);

  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleAdd(e) {
    e.preventDefault();
    let appointment = {
      "petName": this.state.pet,
      "ownerName": this.state.owner,
      "date": this.state.date + ' ' + this.state.time,
      "notes": this.state.notes
    };

    this.props.addAppointment(appointment);

    this.setState({
      "pet": "",
      "owner": "",
      "date": "",
      "time": "",
      "notes": ""
    });

    this.props.toggleForm();

  }

  render() {
    return (
      <div id="newAppointment" className={'' + (this.props.formDisplay ? '': 'add-appointment')}>
        <h2 onClick={this.props.toggleForm}><FaPlus />Add Appointment</h2>
        <form onSubmit={this.handleAdd} className="appointment-form">
          <label>Pet: <input type="text" name="pet" value={this.state.pet} onChange={this.handleChange} /></label>
          <label>Owner: <input type="text" name="owner" value={this.state.owner} onChange={this.handleChange} /></label>
          <label>Date: <input type="date" name="date" value={this.state.date} onChange={this.handleChange} /></label>
          <label>Time: <input type="time" name="time" value={this.state.time} onChange={this.handleChange} /></label>
          <label>Notes <input type="text" name="notes" value={this.state.notes} onChange={this.handleChange} /></label>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
