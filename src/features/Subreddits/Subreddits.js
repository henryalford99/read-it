import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSavedSubreddits, removeSubreddit, selectSubreddit } from './SubredditsSlice';
import './Subreddits.css';

const Subreddits = () => {
  const dispatch = useDispatch();
  const savedSubreddits = useSelector(selectSavedSubreddits);

  const handleRemove = (subreddit) => {
    dispatch(removeSubreddit(subreddit));
  };

  const handleSelect = (subreddit) => {
    dispatch(selectSubreddit(subreddit));
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
      </div>
    </div>
  );
};

export default Subreddits;
