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
      "appointments": [],
      "formDisplay": false,
      "orderBy": "petName",
      "orderDir": "asc"
    };
    this.addAppointment = this.addAppointment.bind(this);
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
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

  changeOrder(order, dir) {
    this.setState({
      "orderBy": order,
      "orderDir": dir
    });
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

    let order;
    let filteredAppointments = this.state.appointments;
    if (this.state.orderDir === "asc") {
      order = 1;
    } else {
      order = -1;
    }

    filteredAppointments.sort((a,b) => {
      if (a[this.state.orderBy].toLowerCase() < b[this.state.orderBy].toLowerCase()) {
        return -1 * order;
      } else {
        return 1 * order;
      }
    });

    return (
      <div id="petratings">
        <AddAppointments formDisplay={this.state.formDisplay} toggleForm={this.toggleForm} addAppointment={this.addAppointment}/>
        <SearchAppointments orderBy={this.state.orderBy} orderDir={this.state.orderDir} changeOrder={this.changeOrder}/>
        <ListAppointments appointments={filteredAppointments} deleteAppointment={this.deleteAppointment} />
      </div>
    );
  }
}
