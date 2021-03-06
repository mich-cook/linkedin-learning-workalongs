import React, { Component } from 'react';

import firebase from './Firebase.js';

import FormError from './FormError.js';


export default class Register extends Component {

  constructor() {
    super();
    this.state = {
      "username": "",
      "email": "",
      "password": "",
      "verifyPass": "",

      "errorMessage": null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;

    this.setState({ [key]: value }, () => {
      if (this.state.password !== this.state.verifyPass) {
        this.setState({ "errorMessage": `Passwords do not match.` });
      } else {
        this.setState({ "errorMessage": null });
      }
    });
  }

  handleSubmit(e) {
    let regInfo = {
      "username": this.state.username,
      "email": this.state.email,
      "password": this.state.password
    };

    e.preventDefault();

    firebase.auth().createUserWithEmailAndPassword(
      regInfo.email,
      regInfo.password
    ).then(() => {
      this.props.registerUser(regInfo.username);
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
      <form onSubmit={this.handleSubmit}>
        <p>Register</p>
        { this.state.errorMessage !== null ? (
          <FormError message={this.state.errorMessage} />
        ):null}
        <input type="text" placeholder="Display Name" required name="username" value={this.state.username} onChange={this.handleChange} />
        <input type="email" placeholder="Email Address" required name="email" value={this.state.email} onChange={this.handleChange} />
        <input type="password" placeholder="Password" required name="password" value={this.state.password} onChange={this.handleChange} />
        <input type="password" placeholder="Repeat Password" required name="verifyPass" value={this.state.verifyPass} onChange={this.handleChange} />
        <button type="submit">Register</button>
      </form>
    );
  }

}
