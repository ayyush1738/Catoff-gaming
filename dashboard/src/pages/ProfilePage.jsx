import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { ethers } from "ethers";
import bops from "../../public/BlackOps3.jpg";

const ProfilePage = () => {
    const query = new URLSearchParams(useLocation().search);
    const username = query.get("username") || "Guest";
    const photo = query.get("photo");

    const [data, setData] = useState({
        address: "",
        Balance: "Fetching balance...",
    });

    const btnHandler = () => {
        if (window.ethereum && typeof window.ethereum.request === "function") {
            window.ethereum
                .request({ method: "eth_requestAccounts" })
                .then((res) => accountChangeHandler(res[0]))
                .catch((error) => {
                    console.error("Error connecting wallet:", error);
                    alert("Failed to connect wallet. Please try again.");
                });
        } else {
            alert("Please install MetaMask extension!");
        }
    };

    const getbalance = (address) => {
        if (window.ethereum && typeof window.ethereum.request === "function") {
            window.ethereum
                .request({
                    method: "eth_getBalance",
                    params: [address, "latest"],
                })
                .then((balance) => {
                    if (ethers && ethers.utils && ethers.utils.formatEther) {
                        setData((prevData) => ({
                            ...prevData,
                            Balance: ethers.utils.formatEther(balance),
                        }));
                    } else {
                        console.error("ethers.utils.formatEther is not available");
                        setData((prevData) => ({
                            ...prevData,
                            Balance: "Formatting utility unavailable",
                        }));
                    }
                })
                .catch((error) => {
                    console.error("Error fetching balance:", error);
                    setData((prevData) => ({
                        ...prevData,
                        Balance: "Error fetching balance",
                    }));
                });
        } else {
            console.error("Ethereum provider is not available.");
            setData((prevData) => ({
                ...prevData,
                Balance: "Ethereum provider unavailable",
            }));
        }
    };

    const accountChangeHandler = (account) => {
        setData((prevData) => ({
            ...prevData,
            address: account,
        }));
        getbalance(account);
    };

    return (
        <div
            className="relative min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${bops})` }}
        >
            {/* Navbar above the background */}
            <div className="relative z-20">
                <Navbar />
            </div>

            {/* Content centered above the background */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative z-30 p-8 bg-gradient-to-t from-orange-300 to-orange-600 shadow-lg rounded-lg text-white max-w-lg text-center">
                    <div className="flex justify-between">
                        <img
                            className="w-20 h-20 rounded-full mb-4"
                            src={photo || "https://via.placeholder.com/150"}
                            alt="Profile"
                        />
                        <h1 className="text-4xl font-bold mx-1 mt-4 mb-4">{username}</h1>
                    </div>
                    <section>Address: {data.address || "No address connected"}</section>
                    <section>Balance: {data.Balance}</section>
                    <button
                        onClick={btnHandler}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Connect Wallet
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
