import React from 'react';
import Track from "../Track/Track";
import './TrackList.css';

const TrackList = ({searchResults, tracks, onAdd, isRemoval, onRemove}) => {
  return (
    <div className="TrackList">
      {searchResults && searchResults.map((track) =>  <Track onRemove={onRemove} isRemoval={isRemoval} onAdd={onAdd} key={track.id} track={track}/>)}
      {tracks &&  tracks.map((track) => <Track onRemove={onRemove} isRemoval={isRemoval} onAdd={onAdd} key={track.id} track={track}/>)}
    </div>
  );
};


export default TrackList;