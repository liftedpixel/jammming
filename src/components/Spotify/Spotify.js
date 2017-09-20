import React from 'react';
import {clientId, clientSecret} from './secret';

let accessToken;
let ttl;
let tracksArray = [];

const Spotify = {
  getAccessToken() {
    if (!accessToken) {
      let temp = window.location.href.match(/access_token=([^&]*)/);
      if (temp) {
        console.log("saving token");
        accessToken = temp.toString().substring(13);
        temp = window.location.href.match(/expires_in=([^&]*)/);
        ttl = parseInt(temp.toString().substring(11));
        window.setTimeout(() => accessToken = '', ttl * 1000);
        window.history.pushState('Access Token', null, '/');
        console.log("getaccesstoken(): " + accessToken);
        return accessToken;
      }
      const redirectUri = 'http://localhost:3000';
      const scope = 'user-read-private playlist-modify-public';
      const redirectUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token`;
      window.location = redirectUrl;
    }
    return accessToken;
  },

  search(term) {
    accessToken = Spotify.getAccessToken();
    const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    console.log(searchUrl);
    const headers = { headers: { Authorization: `Bearer ${accessToken}` } };
    return fetch(searchUrl, headers).then(response => response.json()).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      //console.log(jsonResponse.tracks);
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    });
  },

  savePlaylist(playlistName,playlistTracks) {
    //playlistName = 'Testing123';
    //playlistTracks = ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M"];
    if (!playlistName || !playlistTracks) { return }
    else {
      let userId = null;
      let url = 'https://api.spotify.com/v1/me';
      let headers = { headers: { Authorization: `Bearer ${accessToken}` } };
      return fetch(url, headers).then(response => response.json()).then(jsonResponse => {
        userId = jsonResponse.id;
        console.log(userId);
        url = `https://api.spotify.com/v1/users/${userId}/playlists`;
        console.log(url);
        headers = { Authorization: `Bearer ${accessToken}` };
        let body = { name: playlistName };
        let thePost = { headers: headers, method: 'POST', body: JSON.stringify(body) };
        fetch(url, thePost).then(response => response.json()).then(jsonResponse => jsonResponse.id).then(playlistId => { console.log(playlistId);
        url = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;
        console.log(url);
        body = { uris: playlistTracks };
        thePost = { headers: headers, method: 'POST', body: JSON.stringify(body) };
        fetch(url, thePost).then(response => console.log(response));
        });
      });
    }
  }
};

export default Spotify;


/*

return tracksArray.map(track => ({
  id: track.id,
  name: track.name,
  artist: track.artists[0].name,
  album: track.album.name,
  uri: track.uri
}))

*/
