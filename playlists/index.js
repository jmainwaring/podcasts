const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
var request = require('request');
const passport = require('passport');
const ppmodule = require('./passport');
const playlistMod = require('./playlistModification');

// When I end up changing the port, make sure to add the new Redirect URI to project on spotify developer portal
const port = 4020;  



require('dotenv').config(); // Removes private keys from public code

// access info from Passport file
require('./passport');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', function (req, res) {
  res.send('Welcome to Podcasts');
});

app.get(
  '/auth/spotify',
  passport.authenticate('spotify', {
    scope: [
      'user-read-email',
      'user-read-private',
      'playlist-modify-public',
      'playlist-modify-private',
      'playlist-read-private',
      'playlist-read-collaborative',
    ],
    showDialog: true,
  })

);

app.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  function (req, res) {
    console.log("isAuthenticated: " + req.isAuthenticated());
    console.log('----------------------------------------------')
    console.log(ppmodule.accessToken)
    // res.send(Access code. Attach this as a header to future requests)

    res.redirect('/');
  }
);
  




// TO-DO: Format uri, and pass playlist and the episode in as args vs hard-coding
// Consider using this - https://github.com/thelinmichael/spotify-web-api-node

// Add episode to a playlist (does currently work)
app.get('/episode',
// , function(args){
//   console.log('Format url and uri here')}, 
  function(req, res){
  request({
    url: `https://api.spotify.com/v1/playlists/2cY4kuJiz1hg6gDYHB34I7/tracks?uris=spotify%3Aepisode%3A46BkCZaK49uiXIdpo3Xp49`,
    // uri: 'spotify:episode:46BkCZaK49uiXIdpo3Xp49',
    // uri: 'spotify%3Aepisode%3A46BkCZaK49uiXIdpo3Xp49',
    method: "POST",

    // params: {
    //   'uris': `spotify%3Aepisode%3A446BkCZaK49uiXIdpo3Xp49`
    // },
    
    headers: {
      'Accept': 'application/json',  
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ppmodule.accessToken}`
    },
    body: '{}'
  }, function (error, response, data){
    //send the access token back to client
    res.end(data);
  });    
});
  


// Can either use approach above or middleware function like below
// Add episode to a playlist (doesn't currently work)
app.get(
  '/newepisode', 

  function (req, res) {
    playlistMod.playlistModificationRequest(
      'post',
      "2cY4kuJiz1hg6gDYHB34I7",
      "46BkCZaK49uiXIdpo3Xp49",
      ppmodule.accessToken
    )
    res.send('Added!')
  }
)


  // function (req, res, next) {
  
  //   console.log('Test')
  //   next()},




app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
