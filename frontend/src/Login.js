import React, { Component } from 'react';
import './Login.css'
import App from './App';
import Register from './Register';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Register: false,
      Authentication: false
    };
  }


navigateRegister = () => {
  this.setState({ Register: true });
}


  render() {
    return (
      <>
        {this.state.Register ? (
          <Register />
        ) : (
          <>
            <h1>Login</h1>
            <div id="loginBox">
              <label>email</label>
              <input />
              <label>password</label>
              <input />
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