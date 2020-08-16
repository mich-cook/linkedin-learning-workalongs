import React, { Component } from 'react';
import './App.css';
import Home from './Home.js';
import Welcome from './Welcome.js';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      "user": null
    };
  }

  render() {
    return (
      <div>
        {this.state.user !== null && <Welcome userName={this.state.user} /> }
        <Home userName={this.state.user} />
      </div>
    );
  }
}
