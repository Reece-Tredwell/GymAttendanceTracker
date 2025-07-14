import React, { useState } from 'react';
import './App.css';
import Day from './Day';

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

let allowedMonths = ["January", "February", "March", "April", "May", "June", "July"];


function App() {
  const [monthIndex, setMonthIndex] = useState(allowedMonths.length - 1);

  const currentMonth = allowedMonths[monthIndex];
  const MonthDays = months[currentMonth];

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


  function renderDays(numberOfDays) {
    const items = [];
    for (let i = 1; i <= numberOfDays; i++) {
      items.push(
        <Day key={i} date={`${i}`} />
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

  return (
    <>
      <header id="header">
        <h1 id="title">Gym Attendance</h1>
        <div id="monthNavigator">
          <button className="navigatorButton" onClick={decrementmonth}>
            <FaAngleLeft />
          </button>
          <h2 id="monthTitle">{currentMonth}</h2>
          <button className="navigatorButton" onClick={incrementMonth}>
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
        {renderDays(MonthDays)}
      </div>
    </>
  );
}

export default App;
