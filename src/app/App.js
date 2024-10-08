import './App.css';
import React from 'react';
import SearchBar from '../features/SearchBar/SearchBar';
import { useSelector } from 'react-redux';
import InitialView from '../features/Posts/InitialView/InitialView';
import DetailedView from '../features/Posts/DetailedView/DetailedView';
import { selectSelectedResult } from '../features/Posts/postsSlice';
import Subreddits from '../features/Subreddits/Subreddits';
import Logo from '../components/Logo';


function App() {
  const selectedPost = useSelector(selectSelectedResult);
  
  return (
    <div className="App">
      <nav className="App-nav">
        <Logo />
        <SearchBar />
        <Subreddits />
      </nav>
      <InitialView />
      {selectedPost && <DetailedView />}
    </div>
  );
}

export default App;
