const express = require('express');

module.exports = (nextApp, nextHandle) => {
  const uiRouter = express.Router();

  uiRouter.get('/', (req, res) => (
    nextApp.render(req, res, '/', req.query)
  ));

  uiRouter.get('*', (req, res) => (
    nextHandle(req, res)
  ));

  return uiRouter;
};
