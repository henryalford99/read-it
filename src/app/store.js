import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../features/SearchBar/SearchBarSlice';
import postsReducer from '../features/Posts/postsSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    posts: postsReducer
  },
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development mode
});