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
    fetch('https://gist.github.com/mich-cook/dbae71204c97019dda3d066b11114a5d')
      .then(response => response.json())
      .then(result => {
        const appointments = result.map(item => { return item; });
        this.setState({ appointments });
      });
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
