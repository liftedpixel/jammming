import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../Spotify/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
     this.state = { searchResults: [], playlistTracks: {}, playlistName: 'New Playlist' };
     this.addTrack = this.addTrack.bind(this);
     this.removeTrack = this.removeTrack.bind(this);
     this.updatePlaylistName = this.updatePlaylistName.bind(this);
     this.savePlaylist = this.savePlaylist.bind(this);
     this.search = this.search.bind(this);
  }

  addTrack(track) {
    let currentPlaylist = this.state.playlistTracks;
    if (!currentPlaylist.includes(track)) { currentPlaylist.push(track) };
    this.setState({ playlistTracks: currentPlaylist, searchResults: [] });
  }

  removeTrack(track) {
    let currentPlaylist = this.state.playlistTracks;
    this.setState({ playlistTracks: currentPlaylist.filter(checkTrack => checkTrack.id !== track.id) });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    let uriArray = this.state.playlistTracks.map(track => track.uri);
    console.log(this.state.playlistName);
    console.log(uriArray);
    Spotify.savePlaylist(this.state.playlistName, uriArray);
    this.setState({ playlistName: 'New Playlist', searchResults: [], playlistTracks: {} });
  }

  search(term) {
    console.log(term);
    let theResults;
    Spotify.search(term).then(results => Array.from(results)).then(trackArray => {
      console.log("trackArray: " + trackArray);
      this.setState({ searchResults: trackArray });
      console.log("state: " + this.state.searchResults)});
  }

  render() {
    return (
      <div>
        <h1><a href="http://localhost:3000">Ja<span className="highlight">mmmmm</span>ing</a></h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} onRemove={this.removeTrack} />
            <Playlist name={this.state.playlistName} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
};

export default App;
