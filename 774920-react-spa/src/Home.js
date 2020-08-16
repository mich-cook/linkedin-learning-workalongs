import React, { Component } from 'react';

export default class Home extends Component {

  render() {
    const uselessStyle = { "precomputedStyle": true }
    const { userName } = this.props;

    return (
      <div className="App" style={uselessStyle}>
        <h1 style={{ "fontSize": 3 + "rem", "inlineStyle": true }}>Meeting Log</h1>
        <ul>
          {userName === null && (<>
          <li><a href="/register">Register</a></li>
          <li><a href="/login">Log In</a></li>
          </>)}
          {userName !== null && (<>
          <li><a href="/meetings">Meetings</a></li>
          </>)}
        </ul>
      </div>
    );
  }

}
