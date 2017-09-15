import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
  render() {
    //let tracksArray = Array.from(this.props.tracks);
    let tracksArray = [];
    console.log(tracksArray);
    return (
      <div className="TrackList">
        {tracksArray.map(track => { return <Track key={track.id} track={track} /> })}
      </div>
    );
  }
};

export default TrackList;


/*
tracksArray.map(track =>{return <Track key={track.id} name={track.name} album={track.album} artist={track.artist} onAdd={this.props.onAdd} onRemove={this.props.onRemove} />})}
*/
