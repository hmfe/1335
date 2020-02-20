import React from "react";
import { arrayOf,  number, string, bool } from 'prop-types';
import { Country } from '../../../prototypes'
import './SuggestionsList.css';

class SuggestionsList extends React.Component {
    static propTypes = {
        searchResults: arrayOf(Country),
        activeSuggestion: number,
        showSuggestions: bool,
        searchKeyword: string
    };

    static defaultProps = {
        searchResults: [],
        activeSuggestion: 0,
        showSuggestions: false,
        searchKeyword: ''
    };

    onCountrySelection = (event) => {
        this.props.onCountrySelected(event);
    }

    render() {
        if (this.props.showSuggestions) {
            if (this.props.searchResults != null && this.props.searchResults.length > 0) {
                return (
                    <ol className="suggestion-list">
                        {this.props.searchResults.map((suggestion, index) => {
                            let className = 'suggestion-item';

                            //Flag the active suggestion with a class
                            if (index === this.props.activeSuggestion) {
                                className = "suggestion-item active";
                            }

                            return (
                                <li className={className} key={suggestion.alpha2Code} onClick={this.onCountrySelection}>
                                    {/* Bold the matching characters as the keyword lenght */}
                                    <b>
                                        {suggestion.name.slice(0, this.props.searchKeyword.length)}
                                    </b>
                                    {suggestion.name.slice(this.props.searchKeyword.length)}
                                </li>
                            );
                        })}
                    </ol>
                );
            } else {
                return (
                    <ul className="suggestion-list">
                        <li className="suggestion-item danger">
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