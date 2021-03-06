const express = require('express');
const _ = require('lodash');
const User = require('../models/user');
const { isAuthenticated, logUserIn } = require('../utils/auth');
const logger = require('../utils/logger');


const userController = express.Router();

userController.get('/me', isAuthenticated, async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    res.send({
      ok: true,
      data: user.getPublicProfile(),
    });
  } catch (e) {
    res.status(500).send({
      ok: false,
      code: 'internal_server_error',
    });
  }
});

userController.post('/login', logUserIn);

userController.post('/register', async (req, res) => {
  try {
    const email = _.get(req, 'body.email');
    const userWithEmail = await User.findOne({ where: { email } });

    if (!_.isEmpty(userWithEmail)) {
      return res.status(400).send({
        ok: false,
        code: 'email_already_exists',
        data: { userWithEmail, email },
      });
    }

    const user = await User.create({
      name: _.get(req, 'body.name'),
      email,
      password: User.generatePassword(_.get(req, 'body.password')),
    });

    return res.send({
      ok: true,
      data: user.getPublicProfile(),
    });
  } catch (e) {
    logger.error(e);

    return res.status(500).send({
      ok: false,
      code: 'internal_server_error',
    });
  }
});

module.exports = userController;
