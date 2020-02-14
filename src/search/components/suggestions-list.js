import React from "react";
import PropTypes from "prop-types";

class SuggestionsList extends React.Component {
    static propTypes = {
        searchResults: PropTypes.array
    };

    static defaultProps = {
        searchResults: []
    };

    constructor() {
        super();
        this.onCountrySelection = this.onCountrySelection.bind(this);
    }

    onCountrySelection(event) {
        this.props.onCountrySelected(event);
    }

    render() {
        if (this.props.showSuggestions && this.props.userInput !== '') {
            if (this.props.searchResults != null && this.props.searchResults.length > 0) {
                return (
                    <ul className="list-group overflow-auto">
                        {this.props.searchResults.map((suggestion, index) => {
                            let className = 'list-group-item';

                            //Flag the active suggestion with a class
                            if (index === this.props.activeSuggestion) {
                                className = "list-group-item active";
                            }

                            return (
                                <li className={className} key={suggestion.alpha2Code} onClick={this.onCountrySelection}>
                                    {suggestion.name}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                return (
                    <ul className="list-group">
                        <li className="list-group-item list-group-item-danger">
                            No suggestions available, please refine your search inputs!
                        </li>
                    </ul>
                );

            }
        } else {
            return (null)
        }
    }
}


export default SuggestionsList;