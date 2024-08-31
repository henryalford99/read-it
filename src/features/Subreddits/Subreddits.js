import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSavedSubreddits, removeSubreddit, selectSubreddit, addSubreddit, setSubredditIcon } from './SubredditsSlice';
import './Subreddits.css';
import fetchSubredditIcon from '../../components/fetchSubredditIcon';

const Subreddits = () => {
  
  const dispatch = useDispatch();
  const savedSubreddits = useSelector(selectSavedSubreddits);
  const [resultVisible, setResultVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [savedVisible, setSavedVisible] = useState(true);

  const toggleSavedVisibility = () => {
    setSavedVisible(!savedVisible);
  };

  const handleRemove = (e, subreddit) => {
    e.stopPropagation();  // Prevent the event from propagating to the parent
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
        setResultVisible(true);
      }
    } catch (error) {
      console.error("Error fetching subreddits:", error);
    }
  };

  const handleSaveSubreddit = async (subreddit) => {
    const subredditObject = {
      name: subreddit,
      icon: await fetchSubredditIcon(subreddit)
    };

    dispatch(addSubreddit(subredditObject));
    handleSelect(subredditObject);
    setResultVisible(false);
    setSearchTerm('');
  };

  return (
    <div className="subreddits-dropdown">
      <button className="subreddits-button">SUBREDDITS</button>
      <div className="subreddits-list">
        <div className="subredditSearch">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="search for subreddits..."
            />
            {/* The search button is removed, form submission handles the search */}
          </form>
          {resultVisible && <ul className="search-results">
            {searchResults.map(result => (
              <li key={result} onClick={() => handleSaveSubreddit(result)}>{result}</li>
            ))}
          </ul>}
        </div>
        <button className="toggle-button" onClick={toggleSavedVisibility}>
          <div className="toggleFlex">
            <p className="toggle-title">SAVED</p>
            <p className={`toggle-arrow ${savedVisible ? 'up' : 'down'}`}>
              {'▲'}
            </p>
          </div>
        </button>
        {savedVisible && savedSubreddits.map(subreddit => (
          <div key={subreddit.name} className="subreddit-item" onClick={() => handleSelect(subreddit)}>
            <div className="subredditWithIcon">
              <span>{subreddit.name}</span>
            </div>
            <button onClick={(e) => handleRemove(e, subreddit.name)} className="remove-button">-</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subreddits;
