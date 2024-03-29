import React from 'react';
import TrackList from '../Tracklist/TrackList';
import './SearchResults.css';

class SearchResults extends React.Component {
    render() {
      return (
        <div className="SearchResults">
        <h2>Results</h2>
        <TrackList 
          tracks={this.props.SearchResults}
          onAdd={this.props.onAdd}
          isRemoval={false} />
        </div>
      );
    }
  }
  
  export default SearchResults;
  