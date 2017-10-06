import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

export const Playlist {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input
          value={this.props.name}
          onChange={this.handleNameChange}
        />
        <TrackList
          tracks={this.props.playlistTracks}
          isRemoval={true}
          onAdd={this.props.onAdd}
          onRemove={this.props.onRemove}
        />
        <a
          className="Playlist-save"
          onClick={this.props.onSave}
        >SAVE TO SPOTIFY</a>
      </div>
    );
  }
};
