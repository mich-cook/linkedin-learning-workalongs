import React, { Component } from 'react';
import '../css/App.css';

import AddAppointments from './AddAppointments.js';
import SearchAppointments from './SearchAppointments.js';
import ListAppointments from './ListAppointments.js';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      appointments: []
    };
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
        <AddAppointments />
        <SearchAppointments />
        <ListAppointments appointments={this.state.appointments} />
      </div>
    );
  }
}
