const axios = require('axios');


const playlistModificationRequest = (requestType, playlist, episode, oAuthToken) => {
    
    // Need to keep working on this but as of now, planning on using this middleware for any playlist 
    // modification, so it includes adding an episode but also removing one, depending on
    // the request type (eg POST)


    let headersObj = {
      'Accept': 'application/json',  
      'Content-Type': 'application/json'  
    };

    headersObj['Authorization'] = `Bearer ${oAuthToken}`;

    const baseRequest = `https://api.spotify.com/v1/playlists/${playlist}/tracks`

    paramsObj = {
        'uris': `spotify%3Aepisode%3A${episode}` 
    }  
    
    // console.log('-------------------')

    console.log(baseRequest)

    axios.post(baseRequest, {}, { params: paramsObj, headers: headersObj })
        // .then((response) => {
        //     res.status(201).send("Episode successfully added!") 
        //     res.redirect('/');  
        // })
        // .catch((error) => {
        //     console.log(error)

     

};

exports.playlistModificationRequest = playlistModificationRequest;