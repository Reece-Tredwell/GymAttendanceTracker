const { Client } = require('pg');
const passwordHash = require('password-hash');
const fs = require('fs');
const rawdata = fs.readFileSync('./config.json', 'utf8');
const jsonData = JSON.parse(rawdata);
const DBLoginInfo = jsonData["DBLogin"]
const apiKeys = jsonData["api-keys"]

function ConnectToDB(DBLoginInfo) {
    const client = new Client({
        user: DBLoginInfo["username"],
        host: DBLoginInfo["host"],
        database: DBLoginInfo["DBName"],
        password: DBLoginInfo["password"],
        port: DBLoginInfo["port"],
    });


    client.connect()
        .then(() => console.log('Connected to PostgreSQL'))
        .catch(err => console.error('Connection error', err));

    return client
}


exports.register = async (req, res) => {
    const submittedAPIKey = req.header("api-key")
    if (submittedAPIKey != apiKeys["auth"]) {
        res.send("Invalid API Key")
        return
    }    
    client = ConnectToDB(DBLoginInfo)
    const email = req.body.email
    const password_hash = req.body.password_hash
    const queryInsert = `INSERT INTO production.users (email, password_hash) VALUES ($1, $2)`;
    await client.query(queryInsert, [email, password_hash]);
    res.send('Connected To DB');
};

exports.login = (req, res) => {
    res.send('logging ');

};