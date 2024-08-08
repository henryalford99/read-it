import React, { useEffect, useState } from "react";
import './DetailedView.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectSelectedResult, clearSelectedItem } from "../postsSlice";
import { fetchComments, selectComments } from '../../Comments/CommentsSlice';

export default function DetailedView() {
    const dispatch = useDispatch();
    const post = useSelector(selectSelectedResult);
    const comments = useSelector(selectComments);
    const [videoError, setVideoError] = useState(false);

    const [commentsOnOff, setCommentsOnOff] = useState(false);

    useEffect(() => {
        // Disable scrolling on the main page when the modal is open
        document.body.style.overflow = 'hidden';

        // Re-enable scrolling when the modal is closed
        return () => {
            console.log('Cleanup: Re-enabling scrolling');
            document.body.style.overflow = 'auto';
        };
    }, []); // Use an empty dependency array to run only on mount and unmount

    useEffect(() => {
        if (post) {
            dispatch(fetchComments(post));
        }
    }, [dispatch, post]);

    if (!post) {
        return null; // Return null if no post is selected
    }

    const handleCloseDetailed = () => {
        dispatch(clearSelectedItem());
    };

    const handleVideoError = () => {
        setVideoError(true);
    };

    const handleVideoCanPlay = () => {
        setVideoError(false);
    };

    const toggleComments = () => {
        setCommentsOnOff(!commentsOnOff)
    }

    return (
        <div className="detailedPost">
            <button className="closeDetailed" onClick={handleCloseDetailed}>
                &times;
            </button>
            <h2>{post.title}</h2>
            <p>{post.selftext}</p>
            <p>Author: {post.author}</p>
            <p>{post.time}</p>
            <p>Upvotes: {post.ups}</p>

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
            ) : null}

            <div className="commentsSection">
                <h3 className="commentsButton" onClick={toggleComments}>Comments</h3>
                {comments.map(comment => (
                    <div key={comment.id} style={{ display: commentsOnOff ? 'block' : 'none' }}>
                        <p><strong>{comment.author}</strong>: {comment.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
