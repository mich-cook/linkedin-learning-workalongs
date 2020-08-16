import React, { Component } from 'react';
import { FaUsers } from 'react-icons/fa';

export default class Navigation extends Component {

  render() {

    const { userName: username } = this.props;

    return (
      <nav>
        <p><a href="/"><FaUsers />Meeting Log</a></p>
        <div>
          <ul>
            { username && (
            <li><a href="/meetings">Meetings</a></li>)}
            { !username && (<>
            <li><a href="/login">Log In</a></li>
            <li><a href="/register">Register</a></li></>)}
            { username && (<li><a href="/login">Log Out</a></li>)}
          </ul>
        </div>
      </nav>
    );
  }

}
