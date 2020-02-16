import React from "react";

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
      <div className="form-label-group">
        <input type="text"
          list="suggestionList"
          id="countryName"
          className="form-control"
          placeholder="Type country name ..."
          onChange={e => this.handleTextChange(e.target.value)}
          onKeyDown={this.onKeyDown}
          value={this.props.searchKeyword}
          required
          autoFocus></input>
        <label htmlFor="countryName">Country Name</label>
      </div>
    );
  }
}

export default SearchInput;