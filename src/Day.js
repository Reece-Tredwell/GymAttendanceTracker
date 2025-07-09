import React, { Component } from 'react';
import './Day.css';

class Day extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <main>
        <p id="dateText">{this.props.date}</p>
      </main>
    );
  }
}

export default Day;