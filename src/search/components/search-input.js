import React from "react";
import './search-input.css';

class SearchInput extends React.Component {

  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange = async userInput => {
    this.props.onUserInputChange(userInput);
  };

  onKeyDown = e => {
    this.props.onKeyDownChange(e);
  };

  render() {

    return (
      <div className="hm-input-group">
        <input type="text"
          list="suggestionList"
          id="countryName"
          className="hm-input"
          onChange={e => this.handleTextChange(e.target.value)}
          onKeyDown={this.onKeyDown}
          value={this.props.searchKeyword}
          required
          autoFocus></input>
        <label htmlFor="countryName" className="hm-input-label">Country Name</label>
      </div>
    );
  }
}

export default SearchInput;