const express = require('express');
const app = express();
const cors = require('cors');
const port = 8181;
const gymRoutes = require('./routes/gym');
const userAuthRoutes = require('./routes/userAuth');

app.use(cors())
app.use(express.json());

app.use('/gym', gymRoutes);
app.use('/auth', userAuthRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});