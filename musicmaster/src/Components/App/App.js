import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: '',
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  addTrack(track) {
    let playlistTracks = this.state.playlistTracks;
    if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    playlistTracks.push(track);
    this.setState({ playlistTracks: playlistTracks });
  }

  removeTrack(track) {
    let playlistTracks = this.state.playlistTracks;
    playlistTracks = playlistTracks.filter(savedTrack => savedTrack.id !== track.id);
    this.setState({ playlistTracks: playlistTracks});
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    let playlistTracks = this.state.playlistTracks;
    const trackURIs = playlistTracks.map(track => track.uri);
  }

  render() {
    return (
      <div>
        <h1>Music<span className="highlight">Master</span></h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults 
            searchResults={this.state.searchResults}
            onAdd={this.addTrack} />
            <Playlist 
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
