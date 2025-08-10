import React, { Component } from 'react';
import App from './App';
import Login from './Login';
import './Register.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Login: false,
      Authentication: false,
      EmailValue: '',
      PasswordValue: '',
      ConfirmPassword: '',
      error: '',
      loading: false
    };
  }

  navigateLogin = () => {
    this.setState({ Login: true });
  }

  handleEmailChange = (event) => {
    this.setState({ EmailValue: event.target.value, error: '' });
  };

  handlePasswordChange = (event) => {
    this.setState({ PasswordValue: event.target.value, error: '' });
  };

  handleConfirmPasswordChange = (event) => {
    this.setState({ ConfirmPassword: event.target.value, error: '' });
  };

  validateForm = () => {
    const { EmailValue, PasswordValue, ConfirmPassword } = this.state;
    
    if (!EmailValue || !PasswordValue || !ConfirmPassword) {
      this.setState({ error: 'All fields are required' });
      return false;
    }

    if (!EmailValue.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      this.setState({ error: 'Please enter a valid email address' });
      return false;
    }

    if (PasswordValue.length < 8) {
      this.setState({ error: 'Password must be at least 8 characters long' });
      return false;
    }

    if (PasswordValue !== ConfirmPassword) {
      this.setState({ error: 'Passwords do not match' });
      return false;
    }

    return true;
  }

  Register = async () => {
    if (!this.validateForm()) return;

    this.setState({ loading: true, error: '' });

    try {
      const response = await fetch('http://localhost:8181/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.state.EmailValue, 
          password_hash: this.state.PasswordValue
        })
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      this.setState({ Authentication: true });
    } catch (error) {
      this.setState({ error: 'Registration failed. Please try again.' });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <>
        {this.state.Login ? (
          <Login />
        ) : (
          <div className="register-container">
            <div id="RegisterBox">
              <h1>Create Account</h1>
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

              <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  id="confirm-password"
                  type="password"
                  value={this.state.ConfirmPassword}
                  onChange={this.handleConfirmPasswordChange}
                  placeholder="Confirm your password"
                  disabled={this.state.loading}
                />
              </div>

              <button 
                onClick={this.Register}
                disabled={this.state.loading}
                className={this.state.loading ? 'loading' : ''}
              >
                {this.state.loading ? 'Creating account...' : 'Create Account'}
              </button>
              
              <button 
                onClick={this.navigateLogin}
                className="secondary-button"
                disabled={this.state.loading}
              >
                Already have an account? Sign in
              </button>
            </div>
            {this.state.Authentication && <App />}
          </div>
        )}
      </>
    );
  }
}

export default Register;