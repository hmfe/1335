import React from "react";
import PropTypes from "prop-types";
import './SearchInput.css';

class SearchInput extends React.Component {
  static propTypes = {
    searchKeyword: PropTypes.string,
  };

  static defaultProps = {
    searchKeyword: []
  };

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