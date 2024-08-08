import React from "react";
import './InitialView.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectItem } from "../postsSlice";
import { selectHasError, selectIsSearching, selectSearchResults } from "../../SearchBar/SearchBarSlice";

export const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}


export default function InitialView() {
    const dispatch = useDispatch();
    
    const allPosts = useSelector(selectSearchResults);
    const error = useSelector(selectHasError);
    const loading = useSelector(selectIsSearching);

    const maxTextLength = 300;

    const handleResultSelection = (id) => {
        const selectedPost = allPosts.find(post => post.id === id);
        if (selectedPost) {
            dispatch(selectItem(selectedPost));
        }
    };

    return (
        <div className="postHolder">
            {loading && <p>Loading...</p>}
            {error && <p>Error: Retry search.</p>}
            {allPosts && allPosts.map((result) => (
                <div className="postFlex" key={result.id} onClick={() => handleResultSelection(result.id)}>
                    <div className="post">
                        <div className="aboveTitle">
                            <p className="postSubReddit">{result.subreddit}</p>
                            <div className="circle-divider"></div>
                            <p className="postTime"> {result.time}</p>
                        </div>
                        <p className="postTitle">{result.title}</p>
                        <p className="postText">{truncateText(result.selfText, maxTextLength)}</p>
                        <div className="belowTitle">
                            {result.ups < 1000 ? <p className="postUpvotes">{`${result.ups} votes`}</p> : <p className="postUpvotes">{`${Math.round(result.ups / 1000)}K votes`}</p>}
                            <div className="circle-divider"></div>
                            <p className="postComments">{`${result.comments} comments`}</p>
                        </div>
                    </div>
                    <div className="thumbnailContainer">
                        {!result.thumbnail.includes('external-preview') && result.thumbnail.includes('https://') && <img className="postThumbnail" src={result.thumbnail} alt="thumbnail"/>}
                    </div>
                </div>
            ))}
        </div>
    )
};