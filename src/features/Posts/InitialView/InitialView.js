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
                <div className="postFlex" key={result.id}>
                    <div className="post">
                        <div className="aboveTitle">
                            <p className="postSubReddit">{result.subreddit}</p>
                            <div className="circle-divider"></div>
                            <p className="postTime"> {result.time}</p>
                        </div>
                        <p className="postTitle">{result.title}</p>
                        <div className="belowTitle">
                            {result.ups < 1000 ? <p className="postUpvotes">{`${result.ups} votes`}</p> : <p className="postUpvotes">{`${Math.round(result.ups / 1000)}K votes`}</p>}
                            <div className="circle-divider"></div>
                            <p className="postComments">{`${result.comments} comments`}</p>
                        </div>
                    </div>
                    <div className="thumbnailContainer">
                        {!result.thumbnail.includes('external-preview') && <img className="postThumbnail" src={result.thumbnail} alt="Sample Image"/>}
                    </div>
                </div>
            ))}
        </div>
    )
};