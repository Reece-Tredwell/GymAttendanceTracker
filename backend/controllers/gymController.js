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

exports.addDate = async(req, res) => {
  client = ConnectToDB(DBLoginInfo)
  const sessionToken = req.body.sessionToken
  const queryInsert = `SELECT * FROM production.session_tokens WHERE "token" = $1`;
  const data = await client.query(queryInsert, [sessionToken]);
  console.log(data.rows[0]["userid"])
};

exports.removeDate = (req, res) => {
  const id = req.params.id;
  res.send(`Date with id ${id} removed`);
};

exports.getDates = (req, res) => {
  res.send('Returning attendance dates');
};