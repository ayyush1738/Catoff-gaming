import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { ethers } from "ethers";

const ProfilePage = () => {
    const query = new URLSearchParams(useLocation().search);
    const username = query.get("username") || "Guest";

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
        <div className="relative w-full h-screen">
            <Navbar />
            <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <h1 className="text-4xl font-bold">
                    {username.substr(0, 5)}
                </h1>
                <section>Address: {data.address || "No address connected"}</section>
                <section>Balance: {data.Balance}</section>
                <button
                    onClick={btnHandler}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Connect Wallet
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
