import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx"

const ProfilePage = () => {
    const query = new URLSearchParams(useLocation().search);
    const username = query.get("username");
    const photo = query.get("photo");

    return (
        <div className="container">
            <Navbar />
            <h1>Welcome, {username}</h1>
            {/* <img className="w-40 h-40 rounded-full" src={photo} alt="Profile" /> */}
        </div>
    );
};

export default ProfilePage;
