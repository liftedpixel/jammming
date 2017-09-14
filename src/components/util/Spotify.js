import React from 'react';

const clientId = 'ad355c80a87f4b19b3b5fa4100b0b6b4';
const clientSecret = '75430b70f3ce462c94a477c24b1c4147';
let accessToken = null;
let ttl = null;

const Spotify = {
  getAccessToken() {
    if (accessToken) { console.log("already have token"); return accessToken; }
    else if (window.location.href.match(/access_token=([^&]*)/)) {
      console.log("saving token");
      let temp = window.location.href.match(/access_token=([^&]*)/);
      accessToken = temp.toString().substring(13);
      temp = window.location.href.match(/expires_in=([^&]*)/);
      ttl = parseInt(temp.toString().substring(11));
      window.setTimeout(() => accessToken = null, 5 * 1000);
      window.history.pushState('Access Token', null, '/');
      console.log(accessToken);
      return accessToken;
    }
    else {
      //console.log("requesting token");
      const redirectUri = 'http://localhost:3000';
      const scope = 'user-read-private playlist-modify-public';
      const redirectUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token`;
      window.location = redirectUrl;
    }
  },

  search(term) {
    if (accessToken) {
      const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term}`;
      console.log(searchUrl);
      const headers = { headers: { Authorization: `Bearer ${accessToken}` } };
      return new Promise(input => fetch(searchUrl, headers).then(response => response.json()).then(jsonResponse => {
        let tracksArray = [];
        if (jsonResponse.tracks) {
          console.log(jsonResponse.tracks);
          //return jsonResponse.tracks.map(track => ({
            //id: track.id,
            //name: track.name,
            //artist: track.artists[0].name,
            //album: track.album.name,
            //uri: track.uri
          //}))
        }
      })
    );
    }
    else {
      accessToken = Spotify.getAccessToken();
      Spotify.search(term);
    }
  },

  savePlaylist(playlistName,playlistTracks) {
    playlistName = 'Testing123';
    playlistTracks = { foo: 'bar' };
    if (!playlistName || !playlistTracks) { return }
    else {
      let userId = null;
      let url = 'https://api.spotify.com/v1/me';
      let headers = { headers: { Authorization: `Bearer ${accessToken}` } };
      return fetch(url, headers).then(response => response.json()).then(jsonResponse => {
        if (jsonResponse.id) {
          userId = jsonResponse.id;
          console.log(userId);
          url = `https://api.spotify.com/v1/users/${userId}/playlists`;
          console.log(url);
          headers = { headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' } };
          const body = { name: playlistName };
          const thePost = { method: 'POST', headers: headers, body: body };
          fetch(url, thePost).then(response => response.json()).then(jsonResponse => {
            if (jsonResponse.id) {
              const playlistId = jsonResponse.id;
              console.log(playlistId);
            }
          });
        }
      });
      //create new playlist
      //save name of new playlist
      //send tracks to playlist
    }

  }
};

export default Spotify;
