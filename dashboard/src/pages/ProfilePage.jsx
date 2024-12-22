import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { ethers } from "ethers";

const ProfilePage = () => {
    const query = new URLSearchParams(useLocation().search);
    const username = query.get("username") || "Guest";
    const photo = query.get("photo")

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
        <div className="relative w-full">
            <Navbar />
            <div className="absolute h-screen w-full bg-cover z-0 ">
                <img src="../../public/BlackOps3.jpg" className="z-0" alt="" />
            </div>
            <div className="h-96 w-3/4 mt-20 z-10 flex mx-auto font-medium text-sm py-2 px-4 text-white bg-gradient-to-t from-green-600 to-green-400 shadow-lg shadow-green-500/60 rounded-md hover:shadow-green-500/40 active:shadow-green-500/20">
                <div className="relative z-10 flex flex-col items-center justify-center text-center">
                    <h1 className="text-4xl font-bold">
                        {username.substr(0, 5)}
                    </h1>
                    <img
                    className="w-10 h-10 rounded-full"
                    src={photo || "https://via.placeholder.com/150"}
                    alt="Profile"
                />
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
        </div>
    );
};

export default ProfilePage;
