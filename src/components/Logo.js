import React from "react";
import './Logo.css'

const Logo = () => {
    return (
        <div className="logo-container">
            <a href="https://www.reddit.com" target="_blank" rel="noopener noreferrer">
                <button className="logo-button">READ IT</button>
            </a>
        </div>
    );
};

export default Logo;