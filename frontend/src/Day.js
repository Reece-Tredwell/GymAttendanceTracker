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
    console.log("AddingSticker");
    this.setState({ showSticker: true });
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