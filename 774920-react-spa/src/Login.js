import React, { Component } from 'react';
import { navigate } from '@reach/router';

import firebase from './Firebase.js';
import FormError from './FormError.js';

export default class Login extends Component {

  constructor() {
    super();
    this.state = {
      "email": "",
      "password": "",

      "errorMessage": null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;

    this.setState({ [key]: value });
  }

  handleSubmit(e) {
    let regInfo = {
      "email": this.state.email,
      "password": this.state.password
    };

    e.preventDefault();

    firebase.auth().signInWithEmailAndPassword(
      regInfo.email,
      regInfo.password
    ).then(() => {
      navigate('/meetings');
    })
    .catch(error => {
      if (error.message !== null) {
        this.setState({ "errorMessage": error.message });
      } else {
        this.setState({ "errorMessage": null });
      }
    })
  }

  render() {
    return (
      <div className="">
        <h1>Log In</h1>
        { this.state.errorMessage !== null ? (
          <FormError message={this.state.errorMessage} />
        ):null}
        <form onSubmit={this.handleSubmit}>
          <label className="form-control-label sr-only">Email:
            <input type="email" required name="email" placeholder="Email Address" value={this.state.email} onChange={this.handleChange} />
          </label>
          <label className="form-control-label sr-only">Password:
            <input type="password" required name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
          </label>
          <button>Log In</button>
        </form>
      </div>
    );
  }

}
