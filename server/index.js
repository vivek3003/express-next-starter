const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('./utils/logger');

require('dotenv').config({ path: path.resolve(__dirname, `../env/${process.env.ENV_FILE}`) });
const next = require('next');

const isDevelopmentMode = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev: isDevelopmentMode });
const nextHandle = nextApp.getRequestHandler();
// ENV

// DB
const connection = require('./utils/database');

// APP
function createServer() {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(morgan('combined', { stream: logger.stream }));

  const apiRouter = require('./routes/index');
  const uiRouter = require('./ui/index');

  app.use('/api/', apiRouter);

  app.use('/', uiRouter(nextApp, nextHandle));

  return app;
}



async function startDevServer() {
  try {
    nextApp.prepare().then(() => {
      const app = createServer();
      app.listen(process.env.PORT, () => logger.info(`App has started on port: ${process.env.PORT}`));
    });
  } catch (e) {
    logger.error(e.message);
  }
}

if (process.env.NODE_ENV === 'development') {
  startDevServer();
}
