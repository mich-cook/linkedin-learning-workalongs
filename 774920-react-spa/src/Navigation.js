import React, { Component } from 'react';
import { Link } from '@reach/router';
import { FaUsers } from 'react-icons/fa';

export default class Navigation extends Component {

  render() {

    const { userName: username, logoutUser } = this.props;

    return (
      <nav>
        <p><Link to="/"><FaUsers />Meeting Log</Link></p>
        <div>
          <ul>
            { username && (
            <li><Link to="/meetings">Meetings</Link></li>)}
            { !username && (<>
            <li><Link to="/login">Log In</Link></li>
            <li><Link to="/register">Register</Link></li></>)}
            { username && (<li><Link to="/login"
              onClick={ e => logoutUser(e) }>Log Out</Link></li>)}
          </ul>
        </div>
      </nav>
    );
  }

}
