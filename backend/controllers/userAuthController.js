const { Client } = require('pg');
const passwordHash = require('password-hash');
const fs = require('fs');
const crypto = require('crypto');
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
    try {
        const apiRes = await fetch("http://localhost:8181/auth/registerHiddenLogic", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKeys["auth"]
            },
            body: JSON.stringify({ email: req.body.email, password_hash: passwordHash.generate(req.body.password_hash) })
        });
        const data = await apiRes.text();
        res.send(data);
    } catch (error) {
        console.log(req.body.password_hash)
        console.log(`${error}}`)
        res.send("POST to DB Failed - step 1/2")
    }
};


exports.registerHiddenLogic = async (req, res) => {
    try {
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
        await client.end();
        res.send('Inserted Into DB');
    } catch (error) {
        console.log(`error: ${error}}`)
        res.send("POST to DB Failed - step 2/2")
    }
};



exports.login = async (req, res) => {
    try {
        const apiRes = await fetch("http://localhost:8181/auth/loginHiddenLogic", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKeys["auth"]
            },
            body: JSON.stringify({ email: req.body.email, password_hash: req.body.password_hash })
        });
        const data = await apiRes.text();
        res.send(data);
    } catch (error) {
        console.log(`error: ${error}}`)
        res.send("Fetch from DB Failed - step 1/2")
    }
};



exports.loginHiddenLogic = async (req, res) => {
    try {
        const submittedAPIKey = req.header("api-key")
        if (submittedAPIKey != apiKeys["auth"]) {
            res.send("Invalid API Key")
            return
        }
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
        const user = result.rows[0];

        if (passwordHash.verify(password_hash, user.password_hash)) {
            //call the CreateSessionTokenEndpoint
            //need to implement the check for a current session Token
            const response = await fetch("http://localhost:8181/auth/CreateSessionToken", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': apiKeys["auth"]
                },
                body: JSON.stringify({userID: user.id})
            })
            res.send("Login successful");
        } else {
            res.send("Invalid password");
        }
    } catch (error) {
        console.log(`error: ${error}`);
        res.send("Fetch from DB Failed - step 2/2");
    }
};



exports.CreateSessionToken = async (req, res) => {
    try {
        const apiRes = await fetch("http://localhost:8181/auth/CreateSessionTokenHiddenLogic", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKeys["auth"]
            },
            body: JSON.stringify({userid: req.body.userID})
        });
        const data = await apiRes.text();
        res.send(data);
    } catch (error) {
        console.log(`error: ${error}}`)
        res.send("Fetch from DB Failed - step 1/2")
    }
};


exports.CreateSessionTokenHiddenLogic = async (req, res) => {
    try {
        const submittedAPIKey = req.header("api-key")
        if (submittedAPIKey != apiKeys["auth"]) {
            res.send("Invalid API Key")
            return
        }

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
        const apiRes = await fetch("http://localhost:8181/auth/getSessionTokenHiddenLogic", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKeys["auth"]
            },
            body: JSON.stringify({userid: req.body.userID})
        });
        const data = await apiRes.text();
        res.send(data);
    } catch (error) {
        console.log(`error: ${error}}`)
        res.send("Fetch from DB Failed - step 1/2")
    }
};


exports.getSessionTokenHiddenLogic = async (req, res) => {
    try {
        const submittedAPIKey = req.header("api-key")
        if (submittedAPIKey != apiKeys["auth"]) {
            res.send("Invalid API Key")
            return
        }

        client = ConnectToDB(DBLoginInfo)
        const querySelect = `SELECT * FROM production.session_tokens WHERE userid = $1`;
        const result = await client.query(querySelect, [req.body.userid]);
        await client.end();
        const Token = result.rows[0];
        console.log(Token)
        res.send({ token: Token });
    } catch (error) {
        console.log(`error: ${error}}`)
    }
};