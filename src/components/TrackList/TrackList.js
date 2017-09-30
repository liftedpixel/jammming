import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';
let trackArray;

class TrackList extends React.Component {
  mapTracks() {
    trackArray = Array.from(this.props.tracks);
    console.log("TrackList trackArray: " + trackArray);
    return (trackArray.map(track => {
      return (
        <Track
          track={track}
          key={track.id}
          onAdd={this.props.onAdd}
          onRemove={this.props.onRemove}
          isRemoval={this.props.isRemoval}
        />
      );
    }));
  };
  render() {
    return (
      <div className="TrackList">
        { this.mapTracks() }
      </div>
    );
  }
};

export default TrackList;
