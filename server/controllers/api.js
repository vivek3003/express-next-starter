
const express = require('express');

const userController = require('./user');

const apiRouter = express.Router();

apiRouter.use('/user', userController);

module.exports = apiRouter;
