import './Comments.css';
import { selectComments } from './CommentsSlice';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';



export default function Comments() {
    const comments = useSelector(selectComments);
    const [commentsOnOff, setCommentsOnOff] = useState(false);

    const toggleComments = () => {
        setCommentsOnOff(!commentsOnOff)
    }

    return (
        <div className="commentsSection">
            <h3 className="commentsButton" onClick={toggleComments}>Comments</h3>
            {comments.map(comment => (
                <div key={comment.id} style={{ display: commentsOnOff ? 'block' : 'none' }}>
                        <p><strong>{comment.author}</strong>: {comment.body}</p>
                </div>
            ))}
        </div>
    )
}