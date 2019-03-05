const express = require('express');
const User = require('./model');
const { isAuthenticated, logUserIn }  = require('../../utils/auth');

const userController = express.Router();

userController.get('/me', isAuthenticated, async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    res.send({
      ok: true,
      d: user.getPublicProfile(),
    });
  } catch(e) {
    res.status(500).send({
      ok: false,
      m: e.message || 'Internal Server Error',
    });
  }
});

userController.post('/login', logUserIn);

module.exports = userController;
