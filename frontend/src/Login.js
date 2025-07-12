import React, { Component } from 'react';
import './Login.css'
import App from './App';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Authentication: false
    };
  }

  render() {
    return (
      <>
      <h1>Login</h1>
        <div id="loginBox">
          <label>email</label>
          <input></input>
          <label>password</label>
          <input></input>
        </div>
        {this.state.Authentication && (
          <App />
        )}
      </>
    );
  }
}

export default Login;