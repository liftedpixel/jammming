import React from 'react';

const clientId = 'ad355c80a87f4b19b3b5fa4100b0b6b4';
const clientSecret = '75430b70f3ce462c94a477c24b1c4147';
let accessToken = null;
let ttl = null;
const redirectUri = 'http://localhost:3000';
const scope = 'playlist-modify-public';

const Spotify = {
  getAccessToken() {
    if (accessToken) { console.log(accessToken); return accessToken; }
    else if (window.location.href.match(/access_token=([^&]*)/)) {
      let temp = window.location.href.match(/access_token=([^&]*)/);
      accessToken = temp.toString().substring(13);
      ttl = window.location.href.match(/expires_in=([^&]*)/);
      window.setTimeout(() => accessToken = null, 5 * 1000);
      window.history.pushState('Access Token', null, '/');
      console.log(accessToken);
      return accessToken;
    }
    else {
      const redirectUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token`;
      window.location = redirectUrl;
    }
  },

  search(term) {
    const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    const headers = { headers: {Authorization: `Bearer ${accessToken}`} };
    return new Promise(input => fetch(searchUrl, headers).then(response => response.json()).then(jsonResponse => {
      let tracksArray = [];
      if (jsonResponse.tracks) {
        return jsonResponse.tracks.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }))
      }
      })
    );
  }
};

export default Spotify;
