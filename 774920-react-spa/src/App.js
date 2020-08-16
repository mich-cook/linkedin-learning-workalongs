import React, { Component } from 'react';
import './App.css';
import Home from './Home.js';
import Welcome from './Welcome.js';
import Navigation from './Navigation.js';

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
        <Navigation userName={this.state.user} />
        {this.state.user !== null && <Welcome userName={this.state.user} /> }
        <Home userName={this.state.user} />
      </div>
    );
  }
}
