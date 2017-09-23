import React from 'react';
import {clientId, clientSecret} from './secret';

let accessToken;
let ttl;
let tracksArray = [];

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return new Promise(resolve => resolve(accessToken));
    }
    else {
      let temp = window.location.href.match(/access_token=([^&]*)/);
      if (temp) {
        accessToken = temp[1];
        temp = window.location.href.match(/expires_in=([^&]*)/);
        ttl = temp[1];
        window.setTimeout(() => accessToken = '', ttl * 1000);
        window.history.pushState('Access Token', null, '/');
      }
      else {
        const redirectUri = 'http://localhost:3000';
        const scope = 'user-read-private playlist-modify-public';
        const redirectUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token`;
        window.location = redirectUrl;
      }
    }
  },

  search(term) {
    if (!accessToken) { Spotify.getAccessToken(); }
    const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    const headers = { headers: { Authorization: `Bearer ${accessToken}` } };
    return fetch(searchUrl, headers).then(response => response.json()).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
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
    console.log("playlistName: " + playlistName);
    console.log("playlistTracks: " + playlistTracks);
    if (!playlistName || !playlistTracks) { return }
    else {
      let userId;
      let url = 'https://api.spotify.com/v1/me';
      let headers = { headers: { Authorization: `Bearer ${accessToken}` } };
      //get userID
      return fetch(url, headers).then(response => response.json()).then(jsonResponse => {
        userId = jsonResponse.id;
        url = `https://api.spotify.com/v1/users/${userId}/playlists`;
        headers = { Authorization: `Bearer ${accessToken}` };
        let body = { name: playlistName };
        let thePost = { headers: headers, method: 'POST', body: JSON.stringify(body) };
        //get playlistID
        return fetch(url, thePost).then(response => response.json()
          ).then(jsonResponse => jsonResponse.id).then(playlistId => {
          console.log("Spotify.playlistid: " + playlistId);
          url = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;
          body = { uris: playlistTracks };
          thePost = { headers: headers, method: 'POST', body: JSON.stringify(body) };
          //save track uris
          return fetch(url, thePost).then(response => console.log("Spotify.saveplaylist(): " + response));
        });
      });
    }
  }
};

export default Spotify;
