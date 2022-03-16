const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
require('dotenv').config();

// Change port to 8888 if not running through kubernetes;  
const port = 4020;  
var myConfig = {};

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
      callbackURL: `http://localhost:${port}/auth/spotify/callback`,
    },
    function (accessToken, refreshToken, expires_in, profile, done) {
      process.nextTick(function () {
        myConfig.accessToken = accessToken;
        return done(null, profile);
      });
    }
    )
    );
    
    
    module.exports = myConfig;