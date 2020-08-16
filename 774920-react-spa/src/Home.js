import React, { Component } from 'react';

export default class Home extends Component {

  render() {
    return (
      <div className="App">
        <h1>Meeting Log</h1>
        <ul>
          <li><a href="/register">Register</a></li>
          <li><a href="/login">Log In</a></li>
          <li><a href="/meetings">Meetings</a></li>
        </ul>
      </div>
    );
  }

}
