import React, {Component} from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    }
  }

  search = () => {
    this.props.onSearch(this.state.search);
    this.setState({
      search: ''
    })
  };

  handleTermChange = (e) => {
    const {name, value} = e.target;

    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" value={this.state.search} name="search" onChange={this.handleTermChange} />
        <button className="SearchButton" onClick={this.search}>SEARCH</button>
      </div>
    )
  }
}

export default SearchBar;