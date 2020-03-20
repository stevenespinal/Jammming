import React, {Component} from 'react';
import './Track.css';

//{track, onAdd, isRemoval, onRemove}
class Track extends Component {

  renderAction = () => {
    if (this.props.isRemoval) {
      return <button className="Track-action" onClick={this.removeTrack}>-</button>
    } else {
      return <button className="Track-action" onClick={this.addTrack}>+</button>
    }
  };

  addTrack = () => {
    this.props.onAdd(this.props.track);
  };

  removeTrack = () => {
    this.props.onRemove(this.props.track);
  };

  render() {
    const {track} = this.props;
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{track.name}</h3>
          <p>{track.artist} | {track.album}</p>
        </div>
        {this.renderAction()}
      </div>
    );

  }
};
export default Track;