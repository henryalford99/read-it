import './Comments.css';
import { selectComments } from './CommentsSlice';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import timeSince from '../../components/TimeSince';



export default function Comments() {
    const comments = useSelector(selectComments);
    const [commentsOnOff, setCommentsOnOff] = useState(false);

    const toggleComments = () => {
        setCommentsOnOff(!commentsOnOff)
    }

    return (
        <div className="commentsSection">
            <h3 className="commentsButton" style={{ display: !commentsOnOff ? 'block' : 'none' }} onClick={toggleComments}>Comments</h3>
            <div className="comments" style={{ display: commentsOnOff ? 'block' : 'none' }} >
                {comments.map(comment => (
                <div key={comment.id} className="comment">
                    <div className="commenter-container">    
                        <a 
                            href={`https://www.reddit.com/user/${comment.author}`}
                            className="commenter" 
                            target="_blank" rel="noopener noreferrer" aria-label="Visit Comment Author"
                        >
                            <strong>{comment.author}</strong>
                        </a>
                        <p className="commentTime">{timeSince(comment.created_utc)}</p>
                    </div>
                    <p className="commentBody">{comment.body}</p>
                </div>
            ))}
            </div>
        </div>
    )
}