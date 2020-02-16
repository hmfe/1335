import React from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import SearchInput from '../../components/search-input';
import SuggestionsList from '../../components/suggestions-list';
import countryAPI from '../../../api/country';
import SearchHistory from '../../components/search-history';

import './search-container.css';

class SearchContainer extends React.Component {
    constructor(props) {
        super(props);
        this.searchAPIDebounced = AwesomeDebouncePromise(countryAPI, 500);
        this.handleOnUserInputChange = this.handleOnUserInputChange.bind(this);
        this.handleOnKeyDownChange = this.handleOnKeyDownChange.bind(this);
        this.handleOnCountrySelected = this.handleOnCountrySelected.bind(this);
        this.handleDeleteRecord = this.handleDeleteRecord.bind(this);
        this.handleClearHistory = this.handleClearHistory.bind(this);

        this.state = {
            searchResults: [],
            searchKeyword: '',
            activeSuggestion: 0,
            showSuggestions: false,
            historyItems: []
        }
    }

    handleOnUserInputChange(userInput) {
        if (userInput !== '') {
            this.setState({ searchKeyword: userInput });
            const countries$ = this.searchAPIDebounced(userInput);
            countries$.then(c => {
                if (c && c.length > 0) {
                    const startsWith = c.filter(c => c.name.toLowerCase().startsWith(userInput.toLowerCase()));
                    this.setState({
                        showSuggestions: true,
                        searchResults: startsWith
                    });
                } else {
                    this.setState({
                        showSuggestions: true,
                        searchResults: []
                    });
                }
            });
        }
    }
    handleOnCountrySelected(e) {
        const index = this.state.searchResults.map(e => e.name).indexOf(e.currentTarget.innerText);
        if (this.state.searchResults[index]) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: this.state.searchResults[index],
                searchKeyword: '',
                historyItems: [...this.state.historyItems, { name: this.state.searchResults[index].name, dateModified: new Date() }]
            });
        }
    }
    handleOnKeyDownChange(e) {
        // User pressed the enter key
        if (e.keyCode === 13) {
            if (this.state.searchKeyword !== '' && this.state.searchResults[this.state.activeSuggestion]) {
                this.setState({
                    activeSuggestion: 0,
                    showSuggestions: false,
                    searchKeyword: '',
                    historyItems: [...this.state.historyItems, { name: this.state.searchResults[this.state.activeSuggestion].name, dateModified: new Date() }]
                });
            }
        }
        // User pressed the up arrow
        else if (e.keyCode === 38) {
            if (this.state.activeSuggestion === 0) {
                return;
            }

            this.setState({ activeSuggestion: this.state.activeSuggestion - 1 });
        }
        // User pressed the down arrow
        else if (e.keyCode === 40) {
            if (this.state.activeSuggestion - 1 === this.state.searchResults.length) {
                return;
            }

            this.setState({ activeSuggestion: this.state.activeSuggestion + 1 });
        }
        // User pressed Esc key
        else if (e.keyCode === 27) {
            this.setState({ showSuggestions: false });
        }
    }

    handleDeleteRecord(e) {
        const index = this.state.historyItems.map(e => e).indexOf(e);

        this.state.historyItems.splice(index, 1)
        this.setState({ historyItems: this.state.historyItems })
    }

    handleClearHistory() {
        this.setState({ historyItems: [] });
    }
    render() {
        return (
            <div>
                <header className='header'>
                    <section className="text-center mb-4">
                        <img className="mb-4" src="data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2232%22%20height%3D%2221%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%23CD1F26%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M29.272.953c-.506.225-.9-.01-1.517%201.257-1.94%203.987-3.45%207.223-5.25%2011.88.053-3.824.737-6.868%201.145-10.59.075-.688.18-1.633.165-2.346-.012-.548-.558-.62-1.658-.078-.612.302-1.348.277-1.63%201.004-1.195%203.097-3.956%2011.707-5.238%2016.576-.31%201.17.85%201.366%201.197.166.843-2.9%202.77-9.323%203.917-12.63-.115%203.028-.94%207.813-.555%2010.324.12.79.857%201.13%201.236%201.8.27.475.703.523.94-.127%201.123-3.064%203.308-8.464%205.416-12.784-.413%201.9-1.998%209.97-2.44%2013.187-.088.646.704.662%201.406%201.633.157.218.763.455.872-.103.375-1.93%202.822-14.458%203.78-18.438.258-1.072.184-1.612-1.79-.733m-16.005%209.104c.843-1.257%201.086-1.002%201.29-1.385.252-.477.085-.93-.817-.817%200%200-.34.025-.968.096%201-2.57%201.872-4.753%202.502-6.41.213-.565.24-.977-.108-1.06-.373-.09-1.45.492-2.115.606-.21.036-.414.26-.484.42A190.712%20190.712%200%200%200%209.728%208.39c-1.055.18-2.29.416-3.67.726.99-2.536%201.99-5.036%202.962-7.446C9.5.488%208.24.376%207.75%201.577a441.612%20441.612%200%200%200-3.148%207.88c-.97.24-1.996.51-3.07.82-.782.226-.816.434-.478.9.188.263.572.237.748.423.456.48.732%201.057%201.547%201.144a206.53%20206.53%200%200%200-2.115%205.88c-.413%201.21.764%201.46%201.217.177a300.08%20300.08%200%200%201%202.288-6.243c.658-.153%202.25-.496%203.723-.815-1.168%203.2-1.937%205.63-2.226%206.813-.056.227.037.353.084.446.396.574.77.597%201.278%201.306a.428.428%200%200%200%20.755-.178%20231.115%20231.115%200%200%201%203.23-9.08c.432-.095%201.207-.283%201.683-.99%22/%3E%3Cpath%20d%3D%22M14.062%2015.046a6.46%206.46%200%200%200-.236.22%2085.602%2085.602%200%200%201-.268-.837c.255-.314.5-.62.71-.946.868-1.352-.85-2.13-1.59-1.253-.394.47-.296.93-.187%201.323l.15.506c-.21.215-.463.486-.8.877-.84.974-.61%202.24.288%202.518.547.17%201.056-.082%201.498-.474.02.057.044.12.064.17.234.588.96.41.683-.3-.047-.12-.11-.294-.176-.484a9.27%209.27%200%200%200%20.388-.53c.535-.795.018-1.26-.523-.79zm-.57-1.86c-.08.092-.157.173-.233.252a3.895%203.895%200%200%201-.053-.184c-.25-.944.832-.686.285-.068zm-.586%202.874c-.328.2-.59-.015-.148-.62.074-.103.152-.192.23-.29.073.227.15.457.227.685a2.694%202.694%200%200%201-.31.225z%22/%3E%3C/g%3E%3C/svg%3E" alt="H&M Logo" width="68" height="44"></img>
                        <h1>Search form</h1>
                        <p>Search for your favorite products with our awsome search engine!</p>
                    </section>
                </header>
                <main>
                    <section >
                        <summary>
                            <SearchInput
                                onUserInputChange={this.handleOnUserInputChange}
                                onKeyDownChange={this.handleOnKeyDownChange}
                                searchKeyword={this.state.searchKeyword}>
                            </SearchInput>

                            <SuggestionsList
                                searchResults={this.state.searchResults}
                                activeSuggestion={this.state.activeSuggestion}
                                showSuggestions={this.state.showSuggestions}
                                searchKeyword={this.state.searchKeyword}
                                onCountrySelected={this.handleOnCountrySelected}>
                            </SuggestionsList>
                        </summary>
                        <section>
                            <SearchHistory
                                onClearHistory={this.handleClearHistory}
                                searchHistoryItems={this.state.historyItems}
                                onDeleteRecord={this.handleDeleteRecord}>
                            </SearchHistory>

                        </section>
                    </section>

                </main>

                <footer>
                    <p className="mt-5 mb-3 text-muted text-center">&copy; 2020</p>
                </footer>
            </div >
        )
    }
}

export default SearchContainer;