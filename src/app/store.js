import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../features/SearchBar/SearchBarSlice';
import postsReducer from '../features/Posts/postsSlice';
import commentsReducer from '../features/Comments/CommentsSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    posts: postsReducer,
    comments: commentsReducer
  },
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development mode
});