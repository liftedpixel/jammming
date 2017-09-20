import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
  render() {
    console.log("tracklist.props.tracks: " + this.props.tracks);
    let trackArray = this.props.tracks;
    return (
      <div className="TrackList">
        {trackArray.map(track =>{<Track key={track.id} name={track.name} album={track.album} artist={track.artist} onAdd={this.props.onAdd} onRemove={this.props.onRemove} />})}
      </div>
    );
  }
};

export default TrackList;

/*

*/
