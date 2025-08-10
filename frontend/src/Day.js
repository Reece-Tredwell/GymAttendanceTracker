import React, { Component } from 'react';
import './Day.css';
import WorkoutModal from './WorkoutModal';

const workoutIcons = {
  arms: '💪',
  chest: '🏋️',
  back: '🔙',
  shoulders: '🏋️‍♂️',
  legs: '🦵'
};

class Day extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workoutType: null,
      isModalOpen: false
    };
  }

  handleButtonClick = () => {
    this.setState({ isModalOpen: true });
  }

  handleModalClose = () => {
    this.setState({ isModalOpen: false });
  }

  handleWorkoutSave = (workoutType) => {
    const date = new Date();
    this.setState({ workoutType });
    
    fetch('http://localhost:8181/gym/setWorkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        workoutType 
      })
    })
      .then(res => res.text())
      .then(data => console.log(data))
      .catch(error => console.error('Error saving workout:', error));
  }

  render() {
    const { workoutType, isModalOpen } = this.state;
    
    return (
      <>
        <button id="button" onClick={this.handleButtonClick} className={workoutType ? 'has-workout' : ''}>
          <p id="dateText">{this.props.date}</p>
          {workoutType && (
            <span className="workout-icon" title={workoutType}>
              {workoutIcons[workoutType]}
            </span>
          )}
        </button>
        <WorkoutModal 
          isOpen={isModalOpen}
          onClose={this.handleModalClose}
          onSave={this.handleWorkoutSave}
        />
      </>
    );
  }
}

export default Day;