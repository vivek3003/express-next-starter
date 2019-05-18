const passport = require('passport');
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
  jwtFromRequest: (req) => (req.get('X-Lit-Token')),
  secretOrKey: process.env.JWT_SECRET,
  jsonWebTokenOptions: { maxAge: '120h' },
}, async (jwtPayload, done) => {
  try {
    const user = await User.findByPk(jwtPayload.id);

    if (!user) return done(null, false, { message: 'User not found' });

    return done(null, user.getPublicProfile());
  } catch(e) {
    return done(new Error(e));
  }
}));

// Log Users In with email password
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ where: { email }});

    if (!user) return done(null, false, { message: 'User not found' });

    const doPasswordsMatch = user.verifyPassword(password);

    if (!doPasswordsMatch) return done(null, false, { message: 'Password is incorrect' });

    return done(null, user.getPublicProfile());
  } catch(e) {
    return done(new Error(e));
  }
}));

exports.setAuthenticationState = function(req, res, next) {
  passport.authenticate(['bearer', 'jwt'], { session: false }, (err, user) => {
    if (err || !user) {
      next();
    }

    req.login(user, { session: false }, (loginError) => {
      if (loginError) {
        return res.status(401).send({ ok: false, m: loginError.message || 'Login Error' });
      }

      next();
    });
  })(req, res, next);
}

exports.isAuthenticated = function(req, res, next) {
  passport.authenticate(['bearer', 'jwt'], { session: false }, (err, user) => {
    if (err) {
      res.status(401).send({ ok: false, m: err.message || 'Authentication Failed' });

      return;
    }

    if (!user) {
      res.status(401).send({ ok: false, m: 'User not found' });

      return;
    }

    req.login(user, { session: false }, (loginError) => {
      if (loginError) {
        return res.status(401).send({ ok: false, m: loginError.message || 'Login Error' });
      }

      next();
    });
  })(req, res, next);
}

exports.logUserIn = function(req, res) {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err) {
      return res.status(401).send({ ok: false, m: err.message || 'Password is incorrect' });
    }

    if (!user) {
      return res.status(401).send({ ok: false, m: 'Email/Password not found' });
    }

    req.login(user, { session: false }, (loginError) => {
      if (loginError) {
        return res.status(401).send({ ok: false, m: loginError.message || 'Login Error' });
      }

      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '120h' });
      res.send({ ok: true, d: { token, user }});
    });
  })(req, res);
}

exports.passport = passport;
