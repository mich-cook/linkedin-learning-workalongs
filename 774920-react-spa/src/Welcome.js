import React, { Component } from 'react';

export default class Welcome extends Component {

  render() {
    const { userName: username } = this.props;

    return (
      <div className="" style={{ "textAlign": "center", "marginTop": "14px" }}>
        Welcome {username}, 
        <a href="">Log Out</a>
      </div>
    );
  }

}
