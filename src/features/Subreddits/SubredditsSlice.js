// Import createSlice here.
import { createSlice } from '@reduxjs/toolkit';

  

// Options object for Subreddits Slice:
const options = {
    name: 'subreddits',
    initialState: {
      savedSubreddits: ['r/funny', 'r/AskReddit', 'r/aww', 'r/worldnews', 'r/todayilearned', 'r/science'],
      selectedSubreddit: null
    },
    reducers: {
      removeSubreddit: (state, action) => {
        const updatedSavedSubreddits = state.savedSubreddits.filter(subreddit => subreddit !== action.payload);
        state.savedSubreddits = updatedSavedSubreddits;
      },
      addSubreddit: (state, action) => {
        if (!state.savedSubreddits.includes(action.payload)) {
          state.savedSubreddits.unshift(action.payload);
        }
      },
      selectSubreddit: (state, action) => {
        state.selectedSubreddit = action.payload;
      }
    }
}


// Subreddits Slice:
export const subredditsSlice = createSlice(options)


// Selectors:
export const selectSavedSubreddits = (state) => state.subreddits.savedSubreddits;
export const selectSelectedSubreddit = (state) => state.subreddits.selectedSubreddit;
export const { removeSubreddit, addSubreddit, selectSubreddit } = subredditsSlice.actions;
export default subredditsSlice.reducer;