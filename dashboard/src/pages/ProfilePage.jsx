import React from "react";
import { useLocation } from "react-router-dom";

const ProfilePage = () => {
    const query = new URLSearchParams(useLocation().search);
    const username = query.get("username");
    const photo = query.get("photo");

    return (
        <div className="container">
            <h1>Welcome, {username}</h1>
            <img src={photo} alt="Profile" />
        </div>
    );
};

export default ProfilePage;
