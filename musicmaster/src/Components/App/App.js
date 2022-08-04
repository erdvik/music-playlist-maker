import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state.searchResults = [];
    this.state.playlistName = '';
    this.state.playlistTracks = [];
  }

  render() {
    return (
      <div>
        <h1>Music<span className="highlight">Master</span></h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist 
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks} 
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
