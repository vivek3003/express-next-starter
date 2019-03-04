
const express = require('express');

const userController = require('./user/controller');

const apiRouter = express.Router();

apiRouter.use('/user', userController);


module.exports = apiRouter;
