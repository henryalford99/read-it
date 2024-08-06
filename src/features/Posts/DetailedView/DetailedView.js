import React, { useEffect } from "react";
import './DetailedView.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectSelectedResult, clearSelectedItem } from "../postsSlice";


export default function DetailedView() {
    const dispatch = useDispatch();
    const selectedPost = useSelector(selectSelectedResult);
    
    useEffect(() => {
        // Disable scrolling on the main page when the modal is open
        document.body.style.overflow = 'hidden';
        
        // Re-enable scrolling when the modal is closed
        return () => {
            console.log('Cleanup: Re-enabling scrolling');
            document.body.style.overflow = 'auto';
        };
    }, []); // Use an empty dependency array to run only on mount and unmount

    if (!selectedPost) {
        return null; // Return null if no post is selected
    }

    const handleCloseDetailed = () => {
        dispatch(clearSelectedItem())
    };

    return (
        <div className="detailedPost">
            <p>post goes here</p>
            <button className="closeDetailed" onClick={handleCloseDetailed}>
                &times;
            </button>
        </div>
    )
};