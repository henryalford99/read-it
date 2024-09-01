import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { search } from "./SearchBarSlice";
import { selectSubreddit, selectSelectedSubreddit } from "../Subreddits/SubredditsSlice";
import './SearchBar.css';
import logo from '../../assets/search-icon.svg'


export default function SearchBar() {
  const dispatch = useDispatch();
  const searchSubreddit = useSelector(selectSelectedSubreddit);
  const [searchTerm, setSearchTerm] = useState("");
  const [placeholder, setPlaceholder] = useState('search Reddit...');

  useEffect(() => {
    // Function to update the placeholder based on window width
    const updatePlaceholder = () => {
      if (window.innerWidth < 1200) {
        setPlaceholder(searchSubreddit ? 'search subreddit...' : 'search Reddit...');
      } else {
        setPlaceholder(searchSubreddit ? `search in ${searchSubreddit.name}...` : 'search Reddit...');
      }
    };

    // Initial placeholder setup
    updatePlaceholder();

    // Add event listener for window resize
    window.addEventListener('resize', updatePlaceholder);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', updatePlaceholder);
    };
  }, [searchSubreddit]);


  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedSearchTerm = searchTerm.trim();
    if (trimmedSearchTerm.length === 0) {
      return;
    }

    let formattedSearchSubreddit = '';
    if (searchSubreddit && searchSubreddit.name) {
      formattedSearchSubreddit = `${searchSubreddit.name}/`;
    }

    dispatch(search({ trimmedSearchTerm, subreddit: formattedSearchSubreddit }));
    setSearchTerm('');
    console.log(trimmedSearchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="searchBarForm">
        {searchSubreddit && <div className={'search-subreddit-container'}>
          <img src={searchSubreddit.icon} alt={`${searchSubreddit.name} icon`} className="searchSubredditIcon"/>
          <span className="truncate-text">{searchSubreddit.name}</span>
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
          placeholder={placeholder}
          className="searchInput"
        />
        <button className="searchButton" type="submit">
          <img id="searchIcon" src={logo} alt="Logo" width={22} height={22} />
        </button>
    </form>
  );
}