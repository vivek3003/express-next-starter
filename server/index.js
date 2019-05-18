const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('./utils/logger');

// ENV
require('dotenv').config({ path: path.resolve(__dirname, `../env/${process.env.ENV_FILE}`) });

// DB
const connection = require('./utils/database');

// APP
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined', { stream: logger.stream }));

const apiRouter = require('./routes/index');

app.use('/api/', apiRouter);

app.get('/', (req, res) => res.send({
  ok: true,
  m: 'Hello World!',
}));


async function startDevServer() {
  try {
    await connection.authenticate();
    app.listen(process.env.PORT, () => logger.info(`App has started on port: ${process.env.PORT}`));
  } catch (e) {
    logger.error('Could not connect to MySQL', e);
  }
}

if (process.env.NODE_ENV === 'development') {
  startDevServer();
}
