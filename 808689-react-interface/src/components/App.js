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

  render() {
    return (
      <div id="petratings">
        <AddAppointments />
        <SearchAppointments />
        <ListAppointments />
      </div>
    );
  }
}
