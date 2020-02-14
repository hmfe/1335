import React from "react";
import PropTypes from "prop-types";

class SearchInput extends React.Component {

  static propTypes = {
    searchResults : PropTypes.array,
    userInput: PropTypes.any
  }
  static defaultProps = {
    searchResults: [],
    userInput: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      inputValue: this.props.userInput.name
    };
    this.handleTextChange = this.handleTextChange.bind(this);
  }


  handleTextChange = async userInput => {
    this.props.onUserInputChange(userInput);
    this.setState({ inputValue: userInput });
  };

  onClick = e => {
    const index = this.props.searchResults.map(e => e.name).indexOf(e.currentTarget.innerText);
    this.props.onSelectItemChange(index);
  };

  onKeyDown = e => {
    this.props.onKeyDownChange(e);
  };

  render() {

    return (
      <div className="form-label-group">
        <input type="text"
          id="countryName"
          className="form-control"
          placeholder="Type country name ..."
          onChange={e => this.handleTextChange(e.target.value)}
          onKeyDown={this.onKeyDown}
          value={this.state.inputValue}
          required
          autoFocus></input>
        <label htmlFor="countryName">Country Name</label>
      </div>
    );
  }
}

export default SearchInput;