const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// ENV
require('dotenv').config({ path: path.resolve(__dirname, `../env/${process.env.ENV_FILE}`) });

// DB
const connection = require('./utils/database');

// AUTH
const passport = require('./utils/auth');

// APP
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const apiRouter = require('./routes/index');

app.use('/api/', apiRouter);

app.get('/', (req, res) => res.send({
  ok: true,
  m: 'Hello World!',
}));

if (process.env.NODE_ENV === 'development') {
  async function startDevServer() {
    try {
      await connection.authenticate();
      app.listen(process.env.PORT, () => console.log('Example app listening!'));
    } catch (e) {
      console.error('Could not connect');
    }
  }

  startDevServer();
}
