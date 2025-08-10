import React, { useState } from 'react';
import './App.css';
import Day from './Day';
import Login from './Login';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const monthsArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

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
  const [monthIndex, setMonthIndex] = useState(allowedMonths.length - 1);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

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
        <Day key={`${month}-${i}`} date={`${i}`} />
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
    <>
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

      <div id="calenderBackground">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="headerCell">
            {day}
          </div>
        ))}
        {placeholders}
        {renderDays(MonthDays, currentMonth)}
      </div>
    </>
  );
}

export default App;
