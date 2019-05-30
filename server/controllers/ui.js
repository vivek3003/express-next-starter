/* eslint-disable consistent-return */
const express = require('express');
const _ = require('lodash');
const { setAuthenticationState, isAuthenticatedForPage } = require('../utils/auth');


module.exports = (nextApp, nextHandle) => {
  const uiRouter = express.Router();

  uiRouter.get('/', setAuthenticationState, (req, res) => nextApp.render(req, res, '/', req.query));
  uiRouter.get('/settings', isAuthenticatedForPage, (req, res) => nextApp.render(req, res, '/settings', req.query));

  uiRouter.get('/login', setAuthenticationState, (req, res) => {
    if (!_.isEmpty(req.user)) {
      res.redirect('/');

      return;
    }

    return nextApp.render(req, res, '/login', req.query);
  });

  uiRouter.get('*', (req, res) => (
    nextHandle(req, res)
  ));

  return uiRouter;
};
