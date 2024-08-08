// Import createSlice here.
import { createSlice } from '@reduxjs/toolkit';

  

// Options object for Posts Slice:
const options = {
    name: 'posts',
    initialState: {
        selectedResult: null,
    },
    reducers: {
        selectItem: (state, action) => {
          state.selectedResult = action.payload;
        },
        clearSelectedItem: (state) => {
          state.selectedResult = null;
        },
    }
}


// Posts Slice:
export const postsSlice = createSlice(options)


// Selectors:
export const selectSelectedResult = (state) => state.posts.selectedResult;
export const { selectItem, clearSelectedItem } = postsSlice.actions;
export default postsSlice.reducer;