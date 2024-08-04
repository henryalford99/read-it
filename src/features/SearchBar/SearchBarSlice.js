// Import createSlice here.
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import timeSince from './TimeSince';


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
            id: post.data.id,
            author: post.data.author,
            authorIsBlocked: post.data.author_is_blocked,
            url: post.data.url,
            score: post.data.score,
            subreddit: post.data.subreddit_name_prefixed,
            subredditId: post.data.subreddit_id,
            ups: post.data.ups,
            upvoteRatio: post.data.upvote_ratio,
            thumbnail: post.data.thumbnail,
            thumbnailRatio: {height: post.data.thumbnail_height, width: post.data.thumbnail_width},
            time: timeSince(post.data.created_utc),
            comments: post.data.num_comments
        }));

    }
);
  

// Options object for Topics Slice:
const options = {
    name: 'searchBar',
    initialState: {
        searchResults: [],
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