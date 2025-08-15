import React, { useState } from 'react';
import './App.css';
import Day from './Day';
import Login from './Login';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const months = {
  January: 31,
  February: 28,
  March: 31,
  April: 30,
  May: 31,
  June: 30,
  July: 31,
  August: 31,
  September: 30,
  October: 31,
  November: 30,
  December: 31
};

let allowedMonths = ["January", "February", "March", "April", "May", "June", "July", "August"];


function App() {
  const [workoutCounts, setWorkoutCounts] = useState({
    arms: 0,
    chest: 0,
    back: 0,
    shoulders: 0,
    legs: 0
  });
  
  const [monthIndex, setMonthIndex] = useState(allowedMonths.length - 1);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const updateWorkoutCount = (workoutType, isIncrement = true) => {
    setWorkoutCounts((previousCounts) => {
      const currentCount = previousCounts[workoutType];
      const changeAmount = isIncrement ? 1 : -1;
      const newCount = Math.max(0, currentCount + changeAmount);
      
      return {
        ...previousCounts,
        [workoutType]: newCount
      };
    });
  };

  const currentMonth = allowedMonths[monthIndex];
  const MonthDays = months[currentMonth];

  const handleLogout = () => {
    localStorage.removeItem('sessionToken');
    setRedirectToLogin(true);
  };

  // Calculate first day index for the current month
  let nunmberOfDaysInpreviousMonths = 0;
  for (let i = 0; i < monthIndex; i++) {
    nunmberOfDaysInpreviousMonths += months[allowedMonths[i]];
  }
  let firstDayOfYear = "Wed";
  let firstDayOfYearIndex = daysOfWeek.indexOf(firstDayOfYear);
  let newDayIndex = (firstDayOfYearIndex + nunmberOfDaysInpreviousMonths) % 7;
  let firstDayOfMonth = daysOfWeek[newDayIndex];
  let firstDayIndex = daysOfWeek.indexOf(firstDayOfMonth);

  const placeholders = [];
  for (let i = 0; i < firstDayIndex; i++) {
    placeholders.push(<div key={"empty-" + i} className="empty-day"></div>);
  }


  function renderDays(numberOfDays, month) {
    const items = [];
    for (let i = 1; i <= numberOfDays; i++) {
      items.push(
        <Day 
          key={`${month}-${i}`} 
          date={`${i}`}
          onWorkoutUpdate={updateWorkoutCount}
        />
      );
    }
    return items;
  }

  function incrementMonth() {
    if (monthIndex < allowedMonths.length - 1) {
      setMonthIndex(monthIndex + 1);
    }
  }

  function decrementmonth() {
    if (monthIndex > 0) {
      setMonthIndex(monthIndex - 1);
    }
  }

  if (redirectToLogin) {
    return <Login />;
  }

  return (
    <div className="app-container">
      <header id="header">
        <div className="header-content">
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
          <h1 id="title">Gym Attendance</h1>
        </div>
        <div id="monthNavigator">
          <button 
            className="navigatorButton" 
            onClick={decrementmonth}
            disabled={monthIndex === 0}
          >
            <FaAngleLeft />
          </button>
          <h2 id="monthTitle">{currentMonth}</h2>
          <button 
            className="navigatorButton" 
            onClick={incrementMonth}
            disabled={monthIndex === allowedMonths.length - 1}
          >
            <FaAngleRight />
          </button>
        </div>
      </header>

      <div className="main-content">
        <aside className="sidebar">
          <div className="stats-section">
            <h3>Workout Stats</h3>
            <div className="stat-item">
              <span className="stat-label">This Month</span>
              <span className="stat-value">
                {Object.values(workoutCounts).reduce((a, b) => a + b, 0)} workouts
              </span>
            </div>
            <div className="stat-breakdown">
              <div className="workout-stat">
                <span className="workout-icon">💪</span>
                <span>Arms: {workoutCounts.arms}</span>
              </div>
              <div className="workout-stat">
                <span className="workout-icon">🏋️</span>
                <span>Chest: {workoutCounts.chest}</span>
              </div>
              <div className="workout-stat">
                <span className="workout-icon">🔙</span>
                <span>Back: {workoutCounts.back}</span>
              </div>
              <div className="workout-stat">
                <span className="workout-icon">🏋️‍♂️</span>
                <span>Shoulders: {workoutCounts.shoulders}</span>
              </div>
              <div className="workout-stat">
                <span className="workout-icon">🦵</span>
                <span>Legs: {workoutCounts.legs}</span>
              </div>
            </div>
          </div>
        </aside>

        <main className="calendar-container">
          <div id="calenderBackground">
            {daysOfWeek.map((day, index) => (
              <div key={index} className="headerCell">
                {day}
              </div>
            ))}
            {placeholders}
            {renderDays(MonthDays, currentMonth)}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
