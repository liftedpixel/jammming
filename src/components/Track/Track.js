import React from 'react';
import './Track.css';

export const Track {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.renderAction = this.renderAction.bind(this);
  }

  renderAction() {
    if (this.props.isRemoval) {
      return (
        <a
          id={this.props.track.key}
          className="Track-action"
          onClick={this.removeTrack}
        >-</a>
      )
    }
    else {
      return (
        <a
          id={this.props.track.key}
          className="Track-action"
          onClick={this.addTrack}
        >+</a>
      )
    }
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        { this.renderAction() }
      </div>
    );
  };
}
