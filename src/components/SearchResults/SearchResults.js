import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

export const SearchResults {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList
          tracks={this.props.searchResults}
          isRemoval={false}
          onAdd={this.props.onAdd}
        />
      </div>
    );
  }
};
