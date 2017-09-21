import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';


class TrackList extends React.Component {
  render() {
    if (!this.props.tracks) { console.log("trackArray empty"); return (<Track />);}
    else {
      let trackArray = this.props.tracks;
      console.log("TrackList trackArray: " + trackArray);
      return (
        <div className="TrackList">
          {trackArray.map(track =>{<Track key={track.id} name={track.name} album={track.album.name} artist={track.artist} onAdd={this.props.onAdd} onRemove={this.props.onRemove} />})}
        </div>
      );
    }
  }
};

export default TrackList;


/**/
