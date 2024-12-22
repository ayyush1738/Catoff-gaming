import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { ethers } from "ethers";

const ProfilePage = () => {
    const query = new URLSearchParams(useLocation().search);
    const username = query.get("username") || "Guest";

    const [data, setData] = useState({
        address: "",
        Balance: null,
    });

    const btnHandler = () => {
        // Asking if metamask is already present or not
        if (window.ethereum) {
            // res[0] for fetching a first wallet
            window.ethereum
                .request({ method: "eth_requestAccounts" })
                .then((res) =>
                    accountChangeHandler(res[0])
                );
        } else {
            alert("install metamask extension!!");
        }
    };
    
    // getbalance function for getting a balance in
    // a right format with help of ethers
    const getbalance = (address) => {
        // Requesting balance method
        window.ethereum
            .request({
                method: "eth_getBalance",
                params: [address, "latest"],
            })
            .then((balance) => {
                // Setting balance
                setData({
                    Balance:
                        ethers.utils.formatEther(balance),
                });
            });
    };

    const accountChangeHandler = (account) => {
        // Setting an address data
        setData({
            address: account,
        });
    
        // Setting a balance
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
                <section>Balance: {data.Balance || "Fetching balance..."}</section>
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
