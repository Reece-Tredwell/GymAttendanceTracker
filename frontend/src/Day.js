import React, { Component } from 'react';
import './Day.css';


class Day extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSticker: false
    };
  }

  handleButtonClick = () => {
    const date = new Date();
    this.setState({ showSticker: true });
    fetch('http://localhost:8181/setDateAttended', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Year: date.getFullYear, Month: date.getMonth, Day:date.getDate })
    })
      .then(res => res.text())
      .then(data => console.log(data));
  }


  render() {
    return (
      <button id="button" onClick={this.handleButtonClick}>
        <p id="dateText">{this.props.date}</p>
        {this.state.showSticker && (
          <img src="https://em-content.zobj.net/source/skype/289/thumbs-up_1f44d.png" alt="" />
        )}
      </button>
    );
  }
}

export default Day;