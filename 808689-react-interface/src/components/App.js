import React, { Component } from 'react';
import '../css/App.css';

import AddAppointments from './AddAppointments.js';
import SearchAppointments from './SearchAppointments.js';
import ListAppointments from './ListAppointments.js';

import { without } from 'lodash';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      appointments: [],
      formDisplay: false
    };
    this.addAppointment = this.addAppointment.bind(this);
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }

  toggleForm() {
    this.setState({
      formDisplay: !this.state.formDisplay
    });
  }

  addAppointment(appointment) {
    let appointments = this.state.appointments;
    appointment.aptNotes = appointment.notes;
    appointment.aptDate = appointment.date;
    appointment.id = new Date().getTime();  // to improve later
    appointments.unshift(appointment);
    this.setState({ appointments });
  }

  deleteAppointment(appointment) {
    let appointments = this.state.appointments;
    appointments = without(appointments, appointment);
    this.setState({ appointments });
  }

  componentDidMount() {
    fetch('./tmpdata-appointments.json')
      .then(response => response.json())
      .then(result => {

        const appointments = result.map((appointment, id) => {
          appointment.id = id;  // since the data doesn't have a good one
          return appointment;
        });

        this.setState({ appointments });

      });
  }

  render() {
    return (
      <div id="petratings">
        <AddAppointments formDisplay={this.state.formDisplay} toggleForm={this.toggleForm} addAppointment={this.addAppointment}/>
        <SearchAppointments />
        <ListAppointments appointments={this.state.appointments} deleteAppointment={this.deleteAppointment} />
      </div>
    );
  }
}
