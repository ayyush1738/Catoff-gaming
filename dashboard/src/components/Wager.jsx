import React, { useState } from "react";
import axios from "axios";
import WagerLink from "./WagerLink";
import bops from "../../public/BlackOps3.jpg";
import AddButton from "./AddButton.jsx";


const Wager = () => {
    const [challenge, setChallenge] = useState("");
    const [amount, setAmount] = useState("");
    const [wagerLink, setWagerLink] = useState("");
    const [codAccount, setCodAccount] = useState(null);

    const [platform, setPlatform] = useState("battle"); // Default platform
    const [username, setUsername] = useState("");
    const [stats, setStats] = useState(null);
    const [error, setError] = useState("");


    const connectCodHandler = async () => {
        try {
            const encodedUsername = encodeURIComponent(username);
            const response = await fetch(`/api/cod/player/${platform}/${username}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            setStats(data);
            setError(""); // Clear error
        } catch (err) {
            console.error("Error connecting to COD account:", err.message);
            setError("Failed to fetch player data. Please try again.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send wager details to the backend
            const response = await axios.post("http://localhost:3000/api/cod/bet", {
                condition: challenge,
                amount: amount,
            });

            // Generate a wager link using transaction hash
            const wagerId = response.data.txHash;
            setWagerLink(`http://localhost:3000/wager/${wagerId}`);
        } catch (error) {
            console.error("Error creating wager:", error);
            alert("Failed to create wager");
        }
    };

    const handleClick = async () => {
        try {
            
        } catch (error) {
            console.error("Error during sign-in:", error);
        }
    };


    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="z-30 p-8 bg-gradient-to-t from-orange-300 to-orange-600 shadow-lg rounded-lg text-white max-w-lg text-center">
            <div>
                <h1>Connect Your Call of Duty Account</h1>
                <div>
            <h1>COD Player Stats</h1>
            <input
                type="text"
                placeholder="Enter Platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
                            <AddButton btnVal="Connect" onClick={connectCodHandler}/>

            {error && <p className="error">{error}</p>}
            {stats && (
                <div>
                    <h2>Player Stats</h2>
                    <pre>{JSON.stringify(stats, null, 2)}</pre>
                </div>
            )}
        </div>
                </div>
            </div>
        </div>
    );
};

export default Wager;