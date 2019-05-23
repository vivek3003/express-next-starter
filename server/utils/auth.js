/* eslint-disable consistent-return */
const passport = require('passport');
const _ = require('lodash');
const BearerStrategy = require('passport-http-bearer').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const jwt = require('jsonwebtoken');
const User = require('../routes/user/model');

// strategy for API Client
passport.use(new BearerStrategy({ passReqToCallback: true }, async (req, token, cb) => {
  if (token === process.env.BEARER_TOKEN) {
    const userId = req.get('X-User-ID');

    if (!userId) return cb(new Error('X-User-ID not Found'));

    try {
      const user = await User.findByPk(userId);

      if (!user) return cb(null, false, 'User not found');

      return cb(null, {
        isClient: true,
        ...(user.getPublicProfile()),
      });
    } catch (e) {
      return cb(new Error(e));
    }
  }

  return cb(new Error('Bearer Token Missing'));
}));

// Strategy for login
passport.use(new JwtStrategy({
  jwtFromRequest: req => (req.get('X-Token') || req.cookies.token),
  secretOrKey: process.env.JWT_SECRET,
  jsonWebTokenOptions: { maxAge: '7d' },
}, async (jwtPayload, done) => {
  try {
    const user = await User.findByPk(jwtPayload.id);

    if (!user) return done(null, false, { message: 'User not found' });

    return done(null, user.getPublicProfile());
  } catch (e) {
    return done(new Error(e));
  }
}));

// Log Users In with email password
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) return done(null, false, { message: 'User not found' });

    const doPasswordsMatch = user.verifyPassword(password);

    if (!doPasswordsMatch) return done(null, false, { message: 'Password is incorrect' });

    return done(null, user.getPublicProfile());
  } catch (e) {
    return done(new Error(e));
  }
}));

exports.setAuthenticationState = function setAuthenticationState(req, res, next) {
  passport.authenticate(['bearer', 'jwt'], { session: false }, (err, user) => {
    if (err || !user) {
      next();
    }

    req.login(user, { session: false }, (loginError) => {
      if (loginError) {
        return res.status(401).send({ ok: false, code: _.toLower(_.replace(loginError.message, /[\b\s+-]+/gi, '_')) });
      }

      next();
    });
  })(req, res, next);
};

exports.isAuthenticated = function isAuthenticated(req, res, next) {
  passport.authenticate(['bearer', 'jwt'], { session: false }, (err, user) => {
    if (err) {
      res.status(401).send({ ok: false, code: _.toLower(_.replace(err.message, /[\b\s+-]+/gi, '_')) });

      return;
    }

    if (!user) {
      res.status(401).send({ ok: false, code: 'user_not_found' });

      return;
    }

    req.login(user, { session: false }, (loginError) => {
      if (loginError) {
        return res.status(401).send({ ok: false, code: _.toLower(_.replace(loginError.message, /[\b\s+-]+/gi, '_')) });
      }

      next();
    });
  })(req, res, next);
};

exports.logUserIn = function logUserIn(req, res) {
  // eslint-disable-next-line consistent-return
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err) {
      return res.status(401).send({ ok: false, code: _.toLower(_.replace(err.message, /[\b\s+-]+/gi, '_')) });
    }

    if (!user) {
      return res.status(401).send({ ok: false, code: 'email_password_not_found' });
    }

    req.login(user, { session: false }, (loginError) => {
      if (loginError) {
        return res.status(401).send({ ok: false, code: _.toLower(_.replace(loginError.message, /[\b\s+-]+/gi, '_')) });
      }

      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.send({ ok: true, data: { token, user } });
    });
  })(req, res);
};

exports.passport = passport;
