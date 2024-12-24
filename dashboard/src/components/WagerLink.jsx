import React from "react";

const WagerLink = ({ link }) => {
    return (
        <div className="wager-link">
            <h3>Wager Created Successfully!</h3>
            <p>Share this link with your friends:</p>
            <a href={link} target="_blank" rel="noopener noreferrer">
                {link}
            </a>
        </div>
    );
};

export default WagerLink;
