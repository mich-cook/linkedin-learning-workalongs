import React, { Component } from 'react';
import './App.css';
import Home from './Home.js';

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
        <Home userName={this.state.user} />
      </div>
    );
  }
}
