const passport = require('passport');
const User = require('../users/usersModel');
const config = require('../config/auth_key');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Local Strategy => Will authenticate whether user exists in DB or not;
const LocalOpts = { usernameField: 'username'};
/*
  # Takes in a payload obj and done callback
  @username => username from client-side
  @password => password from client-side
  @done => callback supplied by passport => assigns result to req as req.user
  # Ouputs a callback for
    1) err
    2) found user
    3) no user found
*/
const LocalLogin = new LocalStrategy(LocalOpts, function(username, password, done) {
  User.findOne({ username: username }, function(err, user) {
    if (err) { return done(err); };
    if (!user) { return done(null, false) };
    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }

      return done(null, user);
    })
  })
})



// JWTStrategy => We will authenticate user upon whether they have a token or not
const JwtOpts = {
  // Look for strategy at Headers in authorization fieldname
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

/*
  # Takes in a payload obj and done callback
  @payload => jwt-encode obj
  @done => callback
  # Ouputs a callback for
    1) err
    2) found user
    3) no user found
*/
const JwtLogin = new JwtStrategy(JwtOpts, function(payload, done) {
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  })
});

// Use these strategies betch
passport.use(JwtLogin);
passport.use(LocalLogin);