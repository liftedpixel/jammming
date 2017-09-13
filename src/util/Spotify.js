import React from 'react';

const clientID = 'ad355c80a87f4b19b3b5fa4100b0b6b4';
const clientSecret = '75430b70f3ce462c94a477c24b1c4147';
const accessToken = '';
const Spotify = {
  getAccessToken() {
    if (accessToken) { return accessToken; }
  },

  requestAccessToken() {
    const url = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=http://localhost:3000&scope=playlist-modify-public&response_type=token&state=hello`;
    fetch(url).then(response => {
      console.log(response);
      //get accesstoken from url
      //get expiration time
      //set access token to expire
      //clear the token if it's expired
    });
  }
};

export default Spotify;
