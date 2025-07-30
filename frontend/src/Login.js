import React, { Component } from 'react';
import './Login.css'
import App from './App';
import Register from './Register';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Register: false,
      Authentication: false,
      EmailValue: '',
      PasswordValue: ''
    };
  }


  navigateRegister = () => {
    this.setState({ Register: true });
  }
  handleEmailChange = (event) => {
    this.setState({ EmailValue: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ PasswordValue: event.target.value });
  };


  Login = async () => {
    try {
      const response = await fetch('http://localhost:8181/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.state.EmailValue,
          password_hash: this.state.PasswordValue
        })
      });

      const data = await response.text();
      console.log(data);
      if (data == "Login successful") {
        this.setState({ Authentication: true });
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  render() {
    if (this.state.Authentication) {
      return <App />;
    }

    return (
      <>
        {this.state.Register ? (
          <Register />
        ) : (
          <>
            <h1>Login</h1>
            <div id="loginBox">
              <label>email</label>
              <input type="email" value={this.state.EmailValue} onChange={this.handleEmailChange} />
              <label>password</label>
              <input type="string" value={this.state.PasswordValue} onChange={this.handlePasswordChange} />
              <button onClick={this.Login}>Login</button>
              <button onClick={this.navigateRegister}>Register Account</button>
            </div>
            {this.state.Authentication && <App />}
          </>
        )}
      </>
    );
  }
}

export default Login;