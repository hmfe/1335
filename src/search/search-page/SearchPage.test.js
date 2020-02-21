import React from "react";
import { render, getByDisplayValue } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchPage from "./SearchPage.js";
import SearchHistory from '../components/search-history/SearchHistory';
import SuggestionsList from '../components/suggestions-list/SuggestionsList';
import '@testing-library/jest-dom'

const mockedCountryItems = [{
  name: 'Democratic Republic of the Congo',
  alpha2Code: 'CD',
  dateModified: new Date()
}, {
  name: 'Denmark',
  alpha2Code: 'de',
  dateModified: new Date()
}, {
  name: 'Djibouti',
  alpha2Code: 'dj',
  dateModified: new Date()
}, {
  name: 'Dominica',
  alpha2Code: 'dm',
  dateModified: new Date()
}, {
  name: 'Dominican Republic',
  alpha2Code: 'do',
  dateModified: new Date()
}];


describe('search-page', () => {
  test('Delete method is called when clicking on Delete Button', () => {
    const props = {
      searchHistoryItems: mockedCountryItems,
      onDeleteRecord: jest.fn()
    }
    const { getByTestId } = render(<SearchHistory {...props}></SearchHistory>)

    userEvent.click(getByTestId(mockedCountryItems[1].alpha2Code));
    expect(props.onDeleteRecord).toHaveBeenCalledTimes(1)
  })

  test('Clear all history items', () => {
    const props = {
      searchHistoryItems: mockedCountryItems,
      onClearHistory: jest.fn()
    }
    const { getByText } = render(<SearchHistory {...props}></SearchHistory>)

    userEvent.click(getByText('Clear History'));
    expect(props.onClearHistory).toHaveBeenCalledTimes(1)
  })

  test('Suggestion list is populated when User type in the search box', () => {
    const { getByLabelText } = render(<SearchPage></SearchPage>)
    const searchInput = getByLabelText('Country Name');
    userEvent.type(searchInput, 'Sweden');
    expect(searchInput).toHaveValue('Sweden')
  })

  test('Suggestion list sould be displayed when there are items', () => {
    const props = {
      searchResults: mockedCountryItems,
      activeSuggestion: 0,
      showSuggestions: true
    }
    const { getByText } = render(<SuggestionsList {...props}></SuggestionsList>)
    getByText(mockedCountryItems[1].name);
  })

  test('Suggestion list should be hiden when there are no item', () => {
    const props = {
      searchResults: [],
      activeSuggestion: 0,
      showSuggestions: false
    }
    const { queryByText } = render(<SuggestionsList {...props}></SuggestionsList>)
    const elem = queryByText(mockedCountryItems[1].name);
    expect(elem).toBeNull()

  })

  test('No suggestions available message should be displayed if input is misspelled', () => {
    const props = {
      searchResults: [],
      showSuggestions: true
    }
    const { getByText, debug } = render(<SuggestionsList {...props}></SuggestionsList>)
    getByText('No suggestions', { exact: false })
  })

  // test('renders a message', () => {
  //   const { getByText } = render(<SearchPage />)
  //   getByText('Search form')
  // })
});
