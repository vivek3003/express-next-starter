const express = require('express');
const User = require('./model');

const userController = express.Router();

userController.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  res.send({
    ok: true,
    d: users,
  });
});

module.exports = userController;
