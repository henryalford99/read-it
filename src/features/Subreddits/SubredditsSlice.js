// Import createSlice here.
import { createSlice } from '@reduxjs/toolkit';

// Options object for Subreddits Slice:
const options = {
  name: 'subreddits',
  initialState: {
      savedSubreddits: [
        { name: 'r/funny', icon: null },
        { name: 'r/AskReddit', icon: null },
        { name: 'r/aww', icon: null },
        { name: 'r/worldnews', icon: null },
        { name: 'r/todayilearned', icon: null },
        { name: 'r/science', icon: null }
      ],
      selectedSubreddit: null
  },
  reducers: {
    removeSubreddit: (state, action) => {
      state.savedSubreddits = state.savedSubreddits.filter(subreddit => subreddit.name !== action.payload);
    },
    addSubreddit: (state, action) => {
      // Add the new subreddit if it doesn't already exist
      if (!state.savedSubreddits.some(subreddit => subreddit.name === action.payload.name)) {
          state.savedSubreddits.unshift(action.payload);
      }
    },
    selectSubreddit: (state, action) => {
      state.selectedSubreddit = action.payload;
    },
    setSubredditIcon: (state, action) => {
      const { name, icon } = action.payload;
      const subreddit = state.savedSubreddits.find(sub => sub.name === name);
      if (subreddit) {
          subreddit.icon = icon;
      }
    }
  }
};

// Subreddits Slice:
export const subredditsSlice = createSlice(options)


// Selectors:
export const selectSavedSubreddits = (state) => state.subreddits.savedSubreddits;
export const selectSelectedSubreddit = (state) => state.subreddits.selectedSubreddit;
export const { removeSubreddit, addSubreddit, selectSubreddit, setSubredditIcon } = subredditsSlice.actions;
export default subredditsSlice.reducer;