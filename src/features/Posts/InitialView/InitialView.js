import React, { useState } from "react";
import './InitialView.css';
import { useDispatch, useSelector } from 'react-redux';

export default function InitialView() {
    const allPosts = useSelector((state) => state.search.searchResults);
    const error = useSelector((state) => state.search.hasError);
    const loading = useSelector((state) => state.search.isSearching)

    return (
        <div className="postHolder">
            {loading && <p>Loading...</p>}
            {error && <p>Error: Retry search.</p>}
            {allPosts && allPosts.map((result) => (
                <div className="post" key={result.id}>
                    <p className="postSubReddit">{result.subreddit}</p>
                    <p className="postTime"> {result.time}</p>
                    <p className="postTitle">{result.title}</p>
                    {result.ups < 1000 && <p className="postUpvotes">{`${result.ups} votes`}</p>}
                    {result.ups >= 1000 && <p className="postUpvotes">{`${Math.round(result.ups / 1000)}k votes`}</p>}
                    {!result.thumbnail.includes('external-preview') && <img className="postThumbnail" src={result.thumbnail}/>}
                    <p className="postComments">{`${result.comments} comments`}</p>
                </div>
            ))}
        </div>
    )
};