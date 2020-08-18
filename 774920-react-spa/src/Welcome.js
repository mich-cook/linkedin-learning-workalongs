import React, { Component } from 'react';
import { Link } from '@reach/router';

export default class Welcome extends Component {

  render() {
    const { userName: username, logoutUser } = this.props;

    return (
      <div className="" style={{ "textAlign": "center", "marginTop": "14px" }}>
        Welcome {username}, 
        <Link to="/login" onClick={ e => logoutUser(e) }>Log Out</Link>
      </div>
    );
  }

}
