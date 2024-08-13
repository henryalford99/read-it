import React from "react";
import './Logo.css'

const Logo = () => {
    return (
        <div className="logo-container">
            <button className="logo-button">Read it</button>
            <div className="about-dropdown">
                <p><a href="https://www.reddit.com" target="_blank" rel="noopener noreferrer">and weep</a>.</p>
            </div>
        </div>
    );
};

export default Logo;