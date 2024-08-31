// Import createSlice here.
import { createSlice } from '@reduxjs/toolkit';

// Options object for Subreddits Slice:
const options = {
  name: 'subreddits',
  initialState: {
      savedSubreddits: [
        { name: 'r/funny', icon: "https://a.thumbs.redditmedia.com/kIpBoUR8zJLMQlF8azhN-kSBsjVUidHjvZNLuHDONm8.png" },
        { name: 'r/AskReddit', icon: "https://b.thumbs.redditmedia.com/LSHrisQApf1H5F8nWShTx3_KjTOMc3R_ss3kx3XAyXQ.png" },
        { name: 'r/aww', icon: "https://a.thumbs.redditmedia.com/A71uOuvJLekakhm6d5jn3SPO2R7IezsXTT72Fq98J30.png" },
        { name: 'r/worldnews', icon: "https://styles.redditmedia.com/t5_6/styles/communityIcon_a8uzjit9bwr21.png" },
        { name: 'r/todayilearned', icon: "https://b.thumbs.redditmedia.com/B7IpR8P1mEsQIjdizK5x79s5aGfJUtKk3u2ksGZ9n2Q.png" },
        { name: 'r/science', icon: "https://b.thumbs.redditmedia.com/pkTkSME-lKZcgYyhnOLC5Byj_5SgU5G4B4u1td1F-4Y.png" }
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