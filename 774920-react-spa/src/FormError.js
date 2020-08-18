import React, { Component } from 'react';

export default class FormError extends Component {

  render() {
    const { message } = this.props;

    return (
      <div className="alert alert-danger">
        <p>{message}</p>
      </div>
    );
  }

}
