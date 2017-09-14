import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../util/Spotify';

export const playlistName = "Test playlist";
export const playlistTracks = [
  {name: "Song 1",
   artist: "Band 1",
   album: "Album 1"},
  {name: "Song 2",
   artist: "Band 2",
   album: "Album 2"},
  {name: "Song 3",
   artist: "Band 3",
   album: "Album 3"}
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: [] };
     this.addTrack = this.addTrack.bind(this);
     this.removeTrack = this.removeTrack.bind(this);
     this.updatePlaylistName = this.updatePlaylistName.bind(this);
     this.savePlaylist = this.savePlaylist.bind(this);
     this.search = this.search.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    //if (track.id === tracks[x].id) { //don't add it }
    //if (track.id !== tracks[x].id) { //do add it}
    //if (everything is done) {
      //tracks.push(track);
      //this.setState({ playlistTracks: tracks }); }
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    //if (track.id === tracks[x].id) { //remove it }
    //if (everything is done) {
      //this.setState({ playlistTracks: tracks }); }
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    //generate array trackURIs from playlistTracks
    //pass trackURIs and playlistName to spotify
  }

  search(term) {
    console.log(term);
    Spotify.search(term);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmmmm</span>ing</h1>
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
