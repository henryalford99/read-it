// Import createSlice here.
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


// Async thunk for Reddit JSON fetch request
export const search = createAsyncThunk(
    'searchBar/search',
    async (searchTerm) => {
        // insert fetch request here
        const encodedTerm = encodeURIComponent(searchTerm);
        const url = `https://www.reddit.com/search.json?q=${encodedTerm}&limit=20`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Data:', data)

        return data.data.children.map(post => ({
            title: post.data.title,
            url: post.data.url,
            score: post.data.score,
            subreddit: post.data.subreddit,
            subredditId: post.data.subreddit_id
        }));

    }
);
  

// Options object for Topics Slice:
const options = {
    name: 'searchBar',
    initialState: {
        searchResults: {},
        isSearching: false,
        hasError: false
    },
    extraReducers: (builder) => {
        builder
          .addCase(search.pending, (state) => {
            state.isSearching = true;
            state.hasError = false;
          })
          .addCase(search.fulfilled, (state, action) => {
            state.isSearching = false;
            state.hasError = false;
            state.searchResults = action.payload;
            console.log("Search Results:", action.payload) // check
          })
          .addCase(search.rejected, (state) => {
            state.isSearching = false;
            state.hasError = true;
            state.searchResults = {};
            console.log("Search Results: {}") // check
          })
    }
}
// Topics Slice:
export const searchResultsSlice = createSlice(options)


// Selectors:
export const selectSearchResults = (state) => state.searchBar.searchResults;
export const isSearching = (state) => state.searchBar.isSearching;

export default searchResultsSlice.reducer;