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
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }

  toggleForm() {
    this.setState({
      formDisplay: !this.state.formDisplay
    });
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
        <AddAppointments formDisplay={this.state.formDisplay} toggleForm={this.toggleForm} />
        <SearchAppointments />
        <ListAppointments appointments={this.state.appointments} deleteAppointment={this.deleteAppointment} />
      </div>
    );
  }
}
