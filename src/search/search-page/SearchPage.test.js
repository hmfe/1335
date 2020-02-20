import React from "react";
import { render } from '@testing-library/react'
import SearchPage from "./SearchPage.js";

describe('search-page', () => {
    test('renders a message', () => {
        const { getByText } = render(<SearchPage />)
        getByText('Search form')
      })
});
