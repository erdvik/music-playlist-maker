import React from 'react';
import TrackList from '../Tracklist/TrackList';
import './Playlist.css';

class Playlist extends React.Component {
    render() {
      return (
        <div className="Playlist">
        <input defaultValue={'New Playlist'}/>
        {/* <TrackList /> */}
        <button className="Playlist-save">SAVE TO SPOTIFY</button>
        </div>
      );
    }
  }
  
  export default Playlist;
  