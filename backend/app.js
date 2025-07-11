const express = require('express');
const app = express();
const cors = require('cors');
const port = 8181;


app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/about', (req, res) => {
  res.send('This is the About page');
});


app.post('/setDateAttended', (req, res) => {
  const name = req.body
  console.log(name)
  res.send('This API endpoint will create a record in a database to track dates attended at the gym.');
});

app.get('/getDates', (req, res) => {
  res.send('This API endpoint will return all of the past saved dates');
});


// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});