import React from 'react'
import PropTypes from "prop-types";
import './SearchHistory.css';

class SearchHistory extends React.Component {
    static propTypes = {
        searchHistoryItems: PropTypes.array,
    };

    static defaultProps = {
        searchHistoryItems: []
    };

    onDeleteHistoryItem = (event) => {
        this.props.onDeleteRecord(event);
    }

    clearHistory = () => {
        this.props.onClearHistory();
    }

    render() {
        return (
            <article>
                <section className="hisotryTitle">
                    <h2> Search History: </h2>
                    <button type="button" className="hm-link" onClick={() => this.clearHistory()}> Clear History </button>
                </section>
                <hr></hr>
                <ul>
                    {this.props.searchHistoryItems.map(country => {
                        return (
                            <React.Fragment key={country.alpha2Code}>
                                <li key={country.alpha2Code}>
                                    <h3>{country.name}</h3>
                                    <time dateTime="country.dateModified.toLocaleTimeString('sv-SE')">
                                        {country.dateModified.toLocaleTimeString("sv-SE", { dateStyle: 'short', timeStyle: 'short', hour12: 'true' })}
                                    </time>
                                    <button type="button" aria-label="Delete" className="del-btn" onClick={() => this.onDeleteHistoryItem(country)}></button>
                                </li>
                                <hr></hr>
                            </React.Fragment>
                        );
                    })}
                </ul>
            </article>
        );
    }
}

export default SearchHistory;