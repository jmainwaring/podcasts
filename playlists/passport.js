const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:8888/auth/spotify/callback',
    },
    function (accessToken, refreshToken, expires_in, profile, done) {
      process.nextTick(function () {
        return done(null, profile);
      });
    }
  )
);
