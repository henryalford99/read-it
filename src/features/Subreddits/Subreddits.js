import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSavedSubreddits, removeSubreddit, selectSubreddit, addSubreddit } from './SubredditsSlice';
import './Subreddits.css';

const Subreddits = () => {
  const dispatch = useDispatch();
  const savedSubreddits = useSelector(selectSavedSubreddits);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleRemove = (subreddit) => {
    dispatch(removeSubreddit(subreddit));
  };

  const handleSelect = (subreddit) => {
    dispatch(selectSubreddit(subreddit));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim().length === 0) {
      return;
    }
    try {
      const response = await fetch(`https://www.reddit.com/search.json?q=${searchTerm.trim()}&type=sr&limit=5`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.data.children.map(child => child.data.display_name_prefixed));
      }
    } catch (error) {
      console.error("Error fetching subreddits:", error);
    }
  };

  const handleSaveSubreddit = (subreddit) => {
    dispatch(addSubreddit(subreddit));
    handleSelect(subreddit);
  };

  return (
    <div className="subreddits-dropdown">
      <button className="subreddits-button">Subreddits</button>
      <div className="subreddits-list">
        {savedSubreddits.map(subreddit => (
          <div key={subreddit} className="subreddit-item" onClick={() => handleSelect(subreddit)}>
            <span>{subreddit}</span>
            <button onClick={() => handleRemove(subreddit)} className="remove-button">-</button>
          </div>
        ))}
        <div className="subredditSearch">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search subreddits..."
            />
            {/* The search button is removed, form submission handles the search */}
          </form>
          <ul className="search-results">
            {searchResults.map(result => (
              <li key={result} onClick={() => handleSaveSubreddit(result)}>{result}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Subreddits;
