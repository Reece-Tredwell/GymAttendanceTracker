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
      PasswordValue: '',
      error: '',
      loading: false
    };
  }

  navigateRegister = () => {
    this.setState({ Register: true });
  }

  handleEmailChange = (event) => {
    this.setState({ EmailValue: event.target.value, error: '' });
  };

  handlePasswordChange = (event) => {
    this.setState({ PasswordValue: event.target.value, error: '' });
  };

  validateForm = () => {
    const { EmailValue, PasswordValue } = this.state;
    
    if (!EmailValue || !PasswordValue) {
      this.setState({ error: 'All fields are required' });
      return false;
    }

    // if (!EmailValue.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    //   this.setState({ error: 'Please enter a valid email address' });
    //   return false;
    // }

    return true;
  }

  Login = async () => {
    if (!this.validateForm()) return;

    this.setState({ loading: true, error: '' });

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
      
      const data = await response.json();
      
      if ("token" in data) {
        localStorage.setItem('sessionToken', data["token"])
        this.setState({ Authentication: true });
      } else {
        this.setState({ error: 'Invalid email or password' });
      }
    } catch (error) {
      this.setState({ error: 'Login failed. Please try again.' });
    } finally {
      this.setState({ loading: false });
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
          <div className="login-container">
            <div id="loginBox">
              <h1>Welcome Back</h1>
              {this.state.error && <div className="error-message">{this.state.error}</div>}
              
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="email"
                  value={this.state.EmailValue}
                  onChange={this.handleEmailChange}
                  placeholder="Enter your email"
                  disabled={this.state.loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  value={this.state.PasswordValue}
                  onChange={this.handlePasswordChange}
                  placeholder="Enter your password"
                  disabled={this.state.loading}
                />
              </div>

              <button 
                onClick={this.Login}
                disabled={this.state.loading}
                className={this.state.loading ? 'loading' : ''}
              >
                {this.state.loading ? 'Signing in...' : 'Sign In'}
              </button>
              
              <button 
                onClick={this.navigateRegister}
                className="secondary-button"
                disabled={this.state.loading}
              >
                New user? Create account
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Login;