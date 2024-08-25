import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { search } from "./SearchBarSlice";
import { selectSavedSubreddits, selectSubreddit, selectSelectedSubreddit, removeSubreddit } from "../Subreddits/SubredditsSlice";
import './SearchBar.css';
import logo from '../../assets/search-icon.svg'


export default function SearchBar() {
  const dispatch = useDispatch();
  const savedSubreddits = useSelector(selectSavedSubreddits);
  const searchSubreddit = useSelector(selectSelectedSubreddit);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedSearchTerm = searchTerm.trim();
    if (trimmedSearchTerm.length === 0) {
      return;
    }
    let formattedSearchSubreddit = '';
    if (searchSubreddit.name) {
      formattedSearchSubreddit = `${searchSubreddit.name}/`;
    }
    dispatch(search({trimmedSearchTerm, subreddit: formattedSearchSubreddit}));
    setSearchTerm('');
    console.log(trimmedSearchTerm);
  };

  const handleSelectSubreddit = (subreddit) => {
    dispatch(selectSubreddit(subreddit));
  };

  const handleRemove = (subreddit) => {
    dispatch(removeSubreddit(subreddit));
  };

  return (
    <form onSubmit={handleSubmit} className="searchBarForm">
        {searchSubreddit && <div className={'search-subreddit-container'}>
          <img src={searchSubreddit.icon} alt={`${searchSubreddit.name} icon`} className="searchSubredditIcon"/>
          {searchSubreddit.name}
          <button 
            type="button" 
            className='resetButton'
            onClick={(e) => {
              e.stopPropagation(); // Prevents click from bubbling up
              dispatch(selectSubreddit(null)); // Assuming you have a Redux action to reset the subreddit
            }}
          >&times;</button>
        </div> }
        <input
          id="searchBar"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.currentTarget.value)}
          placeholder={searchSubreddit ? `search in ${searchSubreddit.name}...` : 'search Reddit...'}
          className="searchInput"
        />
        <button className="searchButton" type="submit">
          <img id="searchIcon" src={logo} alt="Logo" width={22} height={22} />
        </button>
    </form>
  );
}