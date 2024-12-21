import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import AddButton from "../components/AddButton.jsx";
import { ethers } from "ethers";

const ProfilePage = () => {
    const query = new URLSearchParams(useLocation().search);
    const username = query.get("username");
    const photo = query.get("photo");

    return (
        <div className="relative w-full h-screen">
            {/* Background Image */}
            <img
                className="absolute inset-0 w-full h-full object-cover z-0 blur-sm"
                src="../public/BlackOps3.jpg"
                alt="Background"
            />
            {/* Navbar */}
            <Navbar />
            {/* Content Section */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <h1 className="text-4xl font-bold text-white">Hello, {username}</h1>
                <div className="mt-4 flex space-x-4">
                    <AddButton btnVal="Add Wager" />
                    <AddButton btnVal="Connect Wallet" />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
