import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch request for comments

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (post) => {
    const response = await fetch(`https://www.reddit.com/${post.subreddit}/comments/${post.id}.json`);
    const data = await response.json();
    console.log(data);
    return data[1].data.children.map(child => child.data);
  }
);

// Comments Slice

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    status: 'idle',
    error: null,
  },
  reducers: {},

  // Reducers for fetchComments:

  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default commentsSlice.reducer;

// Selectors:

export const selectComments = (state) => state.comments.comments;