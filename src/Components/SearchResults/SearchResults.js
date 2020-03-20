import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

const SearchResults = ({searchResults, onAdd, onRemove}) => {
  console.log(searchResults);
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      <TrackList searchResults={searchResults} onAdd={onAdd} isRemoval={false} onRemove={onRemove}/>
    </div>
  )
};

export default SearchResults;