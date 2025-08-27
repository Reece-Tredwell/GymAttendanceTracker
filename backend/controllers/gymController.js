const { Client } = require('pg');
const fs = require('fs');
const rawdata = fs.readFileSync('./config.json', 'utf8');
const jsonData = JSON.parse(rawdata);
const DBLoginInfo = jsonData["DBLogin"]

function ConnectToDB(DBLoginInfo) {
    const client = new Client({
        user: DBLoginInfo["username"],
        host: DBLoginInfo["host"],
        database: DBLoginInfo["DBName"],
        password: DBLoginInfo["password"],
        port: DBLoginInfo["port"],
    });
    client.connect()


    return client
}

exports.setWorkout = async(req, res) => {
  client = ConnectToDB(DBLoginInfo)
  const sessionToken = req.body.sessionToken
  const year = req.body.year
  var month = req.body.month.toLowerCase()
  const day = req.body.day
  const months = {
    "january": 1,
    "february": 2,
    "march": 3,
    "april": 4,
    "may": 5,
    "june": 6,
    "july": 7,
    "august": 8,
    "september": 9,
    "october": 10,
    "november": 11,
    "december": 12
  };
  var month = months[month]
  const type = req.body.workoutType
  const queryInsert = `SELECT * FROM production.session_tokens WHERE "token" = $1`;
  const data = await client.query(queryInsert, [sessionToken]);
  const userid = data.rows[0]["userid"]


  const date = `${year}/${month}/${day}`
  console.log(date)
  const datesInsert = `INSERT INTO production.workouts (user_id, workout_date, workout_type) VALUES ($1, $2, $3)`;
  const dateDataInsert = await client.query(datesInsert, [userid, date, type]);
  res.send('Returning attendance dates');

};



exports.removeDate = (req, res) => {
  const id = req.params.id;
  res.send(`Date with id ${id} removed`);
};



exports.getDates = async(req, res) => {

  client = ConnectToDB(DBLoginInfo)
  const sessionToken = req.body.sessionToken

  const tokenQuerySelect = `SELECT * FROM production.session_tokens WHERE "token" = $1`;
  const tokenData = await client.query(tokenQuerySelect, [sessionToken]);
  const userid = tokenData.rows[0]["userid"]
  console.log(userid)
   
  const datesQuerySelect = `SELECT * FROM production.workouts WHERE "user_id" = $1`;
  const dateData = await client.query(datesQuerySelect, [userid]);
  console.log(dateData.rows)
  res.send(dateData.rows);
};