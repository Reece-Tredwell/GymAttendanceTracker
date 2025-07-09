import './App.css';
import Day from './Day';

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

let allowedMonths = ["January", "February", "March", "April", "May", "June"]
let monthIndex = allowedMonths.length
let currentMonth = monthsArray[monthIndex]
let MonthDays = months[currentMonth]
let firstDayOfYear = "Wed"
let firstDayOfYearIndex = daysOfWeek.indexOf(firstDayOfYear)
let nunmberOfDaysInpreviousMonths = 0



for (let key in months) {
  if (allowedMonths.includes(key)) {
    nunmberOfDaysInpreviousMonths = nunmberOfDaysInpreviousMonths + months[key]
  }
}

let newDayIndex = (firstDayOfYearIndex + nunmberOfDaysInpreviousMonths) % 7;
console.log(newDayIndex)

let firstDayOfMonth = daysOfWeek[newDayIndex]
let firstDayIndex = daysOfWeek.indexOf(firstDayOfMonth);


const placeholders = [];
for (let i = 0; i < firstDayIndex; i++) {
  placeholders.push(<div key={"empty-" + i} className="empty-day"></div>);
}

function renderDays(numberOfDays) {
  const items = [];
  for (let i = 1; i <= numberOfDays; i++) {
    items.push(<Day key={i} date={`${i}`} />);
  }
  return items;
}


function App() {
  return (
    <>
      <header id="header">
        <h1 id="title">Gym Attendance</h1>
        <h2 id="monthTitle">{currentMonth}</h2>
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
