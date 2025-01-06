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

    const connectCodHandler = async () => {
        try {
            const response = await fetch("http://localhost:8000/connect-cod", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            setCodAccount(data);
        } catch (error) {
            console.error("Error connecting to COD account:", error);
            alert("Failed to connect to COD account. Please try again.");
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
                <AddButton btnVal="Connect" onClick={connectCodHandler}/>
                {codAccount && (
                    <div>
                        <h2>Connected Account:</h2>
                        <p>Username: {codAccount.username}</p>
                        <p>Platform: {codAccount.platform}</p>
                    </div>
                )}
                </div>
            </div>
        </div>
    );
};

export default Wager;