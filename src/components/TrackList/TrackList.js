import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
  render() {
    console.log("tracklist.props.tracks: " + this.props.tracks);
    if (!this.props.tracks) {console.log("beep");}
    return (
      <div className="TrackList">
        <Track name="Song title" album="Album name" artist="Artist" />
      </div>
    );
  }
};

export default TrackList;

/*
{this.props.tracks.map(track =>{<Track key={track.id} name={track.name} album={track.album} artist={track.artist} onAdd={this.props.onAdd} onRemove={this.props.onRemove} />})}

*/
