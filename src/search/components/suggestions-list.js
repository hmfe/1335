import React from "react";
import PropTypes from "prop-types";

class SuggestionsList extends React.Component {
    static propTypes = {
        searchResults: PropTypes.array,
        searchKeyword: PropTypes.string
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
        if (this.props.showSuggestions) {
            if (this.props.searchResults != null && this.props.searchResults.length > 0) {
                return (
                    <ol role="listitem" className="list-group overflow-auto">
                        {this.props.searchResults.map((suggestion, index) => {
                            let className = 'list-group-item';

                            //Flag the active suggestion with a class
                            if (index === this.props.activeSuggestion) {
                                className = "list-group-item active";
                            }

                            return (
                                <li className={className} key={suggestion.alpha2Code} onClick={this.onCountrySelection}>
                                    <b>{suggestion.name.slice(0, this.props.searchKeyword.length)}</b>
                                    {suggestion.name.slice(this.props.searchKeyword.length)}
                                </li>
                            );
                        })}
                    </ol>
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