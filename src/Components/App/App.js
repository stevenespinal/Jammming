import React, {Component} from 'react';
import './App.css';
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../Util/Spotify";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playListName: '',
      playListTracks: []
    }
  }

  addTrack = (track) => {
    if (this.state.playListTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }

    let tracks = this.state.playListTracks;
    tracks.push(track);
    this.setState({
      playListTracks: tracks
    });

  };

  removeTrack = (track) => {
    let tracks = this.state.playListTracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({
      playListTracks: tracks
    })
  };

  updatedPlayListName = (name) => {
    this.setState({
      playListName: name
    })
  };

  savePlayList = () => {
    const trackUris = this.state.playListTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playListName, trackUris).then(() => {
      this.setState({
        playListName: 'New Playlist',
        playListTracks: [],
        searchResults: []
      });
      window.location.href = '/';
    });
  };

  search = (query) => {
    Spotify.search(query).then(results => {
      this.setState({
        searchResults: results
      })
    });
  };

  render() {
    const {searchResults, playListName, playListTracks} = this.state;
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={searchResults} onAdd={this.addTrack}/>
            <Playlist name={playListName} tracks={playListTracks} onNameChange={this.updatedPlayListName}
                      onRemove={this.removeTrack}
                      onSave={this.savePlayList}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
