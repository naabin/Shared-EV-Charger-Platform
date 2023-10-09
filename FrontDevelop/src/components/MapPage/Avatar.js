import React from 'react';
import "../../styles/MapPage/ChatPage.css";

Avatar.defaultProps = {
    username: 'NA'
};

function Avatar({ username, isSender }) {
    const avatarClass = isSender ? 'sender-avatar' : 'receiver-avatar';
    const initials = username ? username.slice(0, 2).toUpperCase() : 'NA';
    return (
        <div className={`avatar ${avatarClass}`}>
            {initials}
        </div>
    );
}

export default Avatar;
