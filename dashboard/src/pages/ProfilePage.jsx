import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { ethers } from "ethers";

const ProfilePage = () => {
    const query = new URLSearchParams(useLocation().search);
    const username = query.get("username") || "Guest";

    const [data, setData] = useState({
        address: "",
        Balance: "Fetching balance...", // Default value
    });

    const btnHandler = () => {
        if (window.ethereum) {
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
        window.ethereum
            .request({
                method: "eth_getBalance",
                params: [address, "latest"],
            })
            .then((balance) => {
                console.log("Balance in Wei:", balance); // Debugging
                if (balance) {
                    try {
                        setData((prevData) => ({
                            ...prevData,
                            Balance: ethers.utils.formatEther(balance),
                        }));
                    } catch (error) {
                        console.error("Error formatting balance:", error);
                        setData((prevData) => ({
                            ...prevData,
                            Balance: "Error formatting balance",
                        }));
                    }
                } else {
                    console.error("Balance is undefined or null.");
                    setData((prevData) => ({
                        ...prevData,
                        Balance: "Unavailable",
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
