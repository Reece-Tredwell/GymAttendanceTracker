import React, { Component } from 'react';
import App from './App';
import Login from './Login';


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Login: false,
      Authentication: false,
      EmailValue: '',
      PasswordValue: ''
    };
  }

  navigateLogin = () => {
    this.setState({ Login: true });
  }

  handleEmailChange = (event) => {
    this.setState({ EmailValue: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ PasswordValue: event.target.value });
  };

  Register = () => {
    fetch('http://localhost:8181/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: this.state.EmailValue, password_hash: this.state.PasswordValue})
    })
      .then(res => res.text())
      .then(data => console.log(data));
  }

  render() {
    return (
      <>
        {this.state.Login ? (
          <Login />
        ) : (
          <>
            <h1>Register</h1>
            <div id="RegisterBox">
              <label>email</label>
              <input type="email" value={this.state.EmailValue} onChange={this.handleEmailChange} />
              <label>password</label>
              <input type="string" value={this.state.PasswordValue} onChange={this.handlePasswordChange} />
              <button onClick={this.Register}>Register</button>
              <button onClick={this.navigateLogin}>Login To Account</button>
            </div>
            {this.state.Authentication && <App />}
          </>
        )}
      </>
    );
  }
}

export default Register;