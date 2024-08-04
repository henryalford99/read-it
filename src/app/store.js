import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../features/SearchBar/SearchBarSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
  },
});