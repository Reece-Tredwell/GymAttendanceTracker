const { Client } = require('pg');
const passwordHash = require('password-hash');
const fs = require('fs');
const crypto = require('crypto');
const { response } = require('express');
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



exports.register = async (req, res) => {
    try {
        client = ConnectToDB(DBLoginInfo)
        const email = req.body.email
        const password_hash = req.body.password_hash
        const queryInsert = `INSERT INTO production.users (email, password_hash) VALUES ($1, $2)`;
        await client.query(queryInsert, [email, password_hash]);
        await client.end();
        res.send('Inserted Into DB');
    } catch (error) {
        console.log(`error: ${error}}`)
        res.send("POST to DB Failed - step 2/2")
    }
};



exports.login = async (req, res) => {
    try {
        client = ConnectToDB(DBLoginInfo)
        const email = req.body.email
        const password_hash = req.body.password_hash
        // Fetch user by email
        const querySelect = `SELECT * FROM production.users WHERE email = $1`;
        const result = await client.query(querySelect, [email]);
        await client.end();

        if (result.rows.length === 0) {
            res.send("User not found");
            return;
        }
        const user = result.rows[0]

        if (passwordHash.verify(password_hash, user.password_hash)) {
            //need to implement the check for a current session Token/
            //get userID from the Username and password
            const getResponse = await fetch("http://localhost:8181/auth/getSessionToken", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userid: user.id })
            })
            const getData = await getResponse.json();
            console.log(getData)
            if (Object.keys(getData).length === 0) { //call the CreateSessionTokenEndpoint
                const createResponse = await fetch("http://localhost:8181/auth/createSessionToken", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userid: user.id })
                })
                const createData = await createResponse.json();
                res.send(createData);
            } else {
                res.send(getData["token"])
            }
        } else {
            res.send("Invalid password");
        }
    } catch (error) {
        console.log(`${error}`);
        res.send("Login Failed");
    }
};

exports.createSessionToken = async (req, res) => {
    try {
        const Token = crypto.randomBytes(32).toString("hex");
        client = ConnectToDB(DBLoginInfo)
        const queryInsert = `INSERT INTO production.session_tokens (Token, userid) VALUES ($1, $2)`;
        await client.query(queryInsert, [Token, req.body.userid]);
        await client.end();
        res.send({ token: Token });
    } catch (error) {
        console.log(`error: ${error}}`)
    }
};


exports.getSessionToken = async (req, res) => {
    try {
        client = ConnectToDB(DBLoginInfo)
        const querySelect = `SELECT * FROM production.session_tokens WHERE userid = $1`;
        const result = await client.query(querySelect, [req.body.userid]);
        await client.end();
        const Token = result.rows[0];
        res.send({ token: Token });
    } catch (error) {
        console.log(`error: ${error}}`)
    }
};