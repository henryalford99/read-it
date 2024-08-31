import React, { useEffect, useState } from "react";
import './DetailedView.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectSelectedResult, clearSelectedItem } from "../postsSlice";
import { fetchComments } from '../../Comments/CommentsSlice';
import Comments from "../../Comments/Comments.js";
import { addSubreddit, selectSavedSubreddits } from "../../Subreddits/SubredditsSlice.js";
import fetchSubredditIcon from "../../../components/fetchSubredditIcon.js";


export default function DetailedView() {
    const dispatch = useDispatch();
    const post = useSelector(selectSelectedResult);
    const savedSubreddits = useSelector(selectSavedSubreddits);
    const [videoError, setVideoError] = useState(false);
    const [subredditIcon, setSubredditIcon] = useState(null);
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);

    const handleUpvote = () => {
        setUpvoted(!upvoted);
        if (downvoted) setDownvoted(false); // Ensure downvote is reset
    };

    const handleDownvote = () => {
        setDownvoted(!downvoted);
        if (upvoted) setUpvoted(false); // Ensure upvote is reset
    };

    useEffect(() => {
        if (post) {
            dispatch(fetchComments(post));
            fetchSubredditIcon(post.subreddit).then(icon => setSubredditIcon(icon));
        }
    }, [dispatch, post]);

    if (!post) {
        return null; // Return null if no post is selected
    }

    const handleCloseDetailed = () => {
        dispatch(clearSelectedItem());
    };

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            handleCloseDetailed();
        }
    };

    const handleVideoError = () => {
        setVideoError(true);
    };

    const handleVideoCanPlay = () => {
        setVideoError(false);
    };

    const handleSaveSubreddit = async () => {
        const subredditName = post.subreddit;

        // Check if subreddit is already saved
        if (savedSubreddits.some(sub => sub.name === subredditName)) {
            console.log(`Subreddit ${subredditName} is already saved.`);
            return; // Exit the function if subreddit is already saved
        }

        // Fetch the subreddit icon if not already set
        const icon = subredditIcon || await fetchSubredditIcon(subredditName);

        const subredditObject = {
            name: subredditName,
            icon,
        };

        dispatch(addSubreddit(subredditObject));
        console.log(`Saving subreddit: ${subredditName}`);
    };

    const isImageUrl = (url) => {
        return /\.(jpeg|jpg|png)$/i.test(url);
    };

    return (
        <div className="detailedViewOverlay" onClick={handleBackgroundClick}><div className="detailedPost">
            <div className="header-container">
                {subredditIcon ? (
                    <div className="subredditIconContainer">
                        <button className="subredditIconButton" onClick={handleSaveSubreddit} aria-label="Save subreddit">
                            <img src={subredditIcon} alt={`${post.subreddit} icon`} className="subredditIcon" />
                            <div className="iconOverlay">
                                <span className="plusIcon">+</span>
                            </div>
                        </button>
                    </div>
                ) : (
                    <div className="subredditIconContainer">
                        <button className="saveSubredditButton" onClick={handleSaveSubreddit} aria-label="Save subreddit">+</button>
                    </div>
                )}
                <div className="detailed-aboveTitle">
                    <a 
                    href={`https://www.reddit.com/${post.subreddit}`} 
                    className="detailed-postSubReddit" 
                    target="_blank" rel="noopener noreferrer" aria-label="Visit subreddit"
                    onClick={handleSaveSubreddit}
                    >
                        {post.subreddit}
                    </a>
                    <div className="detailed-circle-divider-1"></div>
                    <p className="detailed-postTime"> {post.time}</p>
                    <div className="detailed-circle-divider-2"></div>
                    <a
                    href={`https://www.reddit.com/user/${post.author}`}
                    target="_blank" rel="noopener noreferrer" aria-label="Visit post author"
                    className="detailed-postAuthor"
                    >
                        {post.author}
                    </a>
                </div>
            </div>

            <div className="post-upvotes-container">
                <button 
                    type="button" 
                    className={`upvote ${upvoted ? 'active' : ''}`} 
                    aria-label="Upvote"
                    onClick={handleUpvote}
                >&#9650;</button>

                {post.ups < 1000 ? (
                    <p className={`detailed-postUpvotes ${upvoted ? 'upvoted' : downvoted ? 'downvoted' : ''}`}>
                        {post.ups}
                    </p>
                ) : (
                    <p className={`detailed-postUpvotes ${upvoted ? 'upvoted' : downvoted ? 'downvoted' : ''}`}>
                        {`${(post.ups / 1000).toFixed(1)}k`}
                    </p>
                )}   

                <button 
                    type="button" 
                    className={`downvote ${downvoted ? 'active' : ''}`} 
                    aria-label="Downvote"
                    onClick={handleDownvote}
                >&#9660;</button>
            </div>
            <button className="closeDetailed" onClick={handleCloseDetailed}>
                &times;
            </button>

            <div className="title-container">
                <h2 className="detailed-postTitle">{post.title}</h2>
                <a href={post.url} target="_blank" rel="noopener noreferrer" className="linkToPost" aria-label="Visit full post">...see full post</a>
            </div>
            
            <p>{post.selfText}</p>

            {/* Check for reddit_video property */}
            {post.media && post.media.reddit_video ? (
                <div className="videoContainer">
                    <video 
                        width="100%" 
                        controls 
                        onError={handleVideoError} 
                        onCanPlay={handleVideoCanPlay}
                    >
                        <source src={post.media.reddit_video.fallback_url} type="video/mp4" />
                        {videoError && "Your browser does not support the video tag."}
                    </video>
                </div>
            ) : isImageUrl(post.url) ? (
                <div className="imageContainer">
                    <img src={post.url} alt={post.title} style={{ width: '100%', height: 'auto' }} />
                </div>
            ) : null}


            <Comments />
        </div></div>
    );
};
