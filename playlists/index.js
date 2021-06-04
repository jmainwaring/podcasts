const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const passport = require('passport');

// When I end up changing the port, make sure to add the new Redirect URI to project on spotify developer portal
const port = 8888;  

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
    // console.log(req);
    res.redirect('/');
  }
);
  


// Add episode to a playlist
app.get(
  '/episode', 
  passport.authenticate('spotify', 
  { scope: ['playlist-modify-public', 'playlist-modify-private']}), 

  
  function (req, res, next) {
  
    console.log('Test')
    next()},


  // Need to validate inputs

  function (req, res) {
    const playlist_id = "2cY4kuJiz1hg6gDYHB34I7";
    const episode_id = "46BkCZaK49uiXIdpo3Xp49";
    axios.post(`https://api.spotify.com/v1/playlists/tracks?uris=spotify%3Aepisode%3A{episode_id}`);
    console.log('A')
    res.status(201).send("Episode successfully added");
    console.log('B')
    console.log('C')
  })




  // try {
  //   axios.post(`https://api.spotify.com/v1/playlists/{playlist_id}/{episode_id}`, function (req, res) {
  //     res.status(201).send("Episode successfully added") 
  //     res.redirect('/');  
  //   })
  // }
  // catch (err) { 
  //   console.log(err)
  // }


  // });


app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
