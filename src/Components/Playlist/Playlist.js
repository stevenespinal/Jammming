import React, {Component} from 'react';
import './Playlist.css';
import TrackList from "../TrackList/TrackList";

class Playlist extends Component {

  handleNameChange = (event) => {
    this.props.onNameChange(event.target.value)
  };


  render() {
    const {tracks, onSave, onRemove} = this.props;
    return (
      <div className="Playlist">
        <input defaultValue="New Playlist" onChange={this.handleNameChange}/>
        <TrackList tracks={tracks} onRemove={onRemove} isRemoval={true}/>
        <button className="Playlist-save" onClick={onSave}>SAVE TO SPOTIFY</button>
      </div>
    )
  }
}

export default Playlist;