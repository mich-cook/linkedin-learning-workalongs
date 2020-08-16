import React, { Component } from 'react';
import { Link } from '@reach/router';

export default class Home extends Component {

  render() {
    const uselessStyle = { "precomputedStyle": true }
    const { userName } = this.props;

    return (
      <div className="App" style={uselessStyle}>
        <h1 style={{ "fontSize": 3 + "rem", "inlineStyle": true }}>Meeting Log</h1>
        <ul>
          {userName === null && (<>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Log In</Link></li>
          </>)}
          {userName !== null && (<>
          <li><Link to="/meetings">Meetings</Link></li>
          </>)}
        </ul>
      </div>
    );
  }

}
