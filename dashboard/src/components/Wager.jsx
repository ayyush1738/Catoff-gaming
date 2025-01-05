import React, { useState } from "react";
import axios from "axios";
import WagerLink from "./WagerLink";
import bops from "../../public/BlackOps3.jpg";
import AddButton from "./AddButton.jsx";


const Wager = () => {
    const [challenge, setChallenge] = useState("");
    const [amount, setAmount] = useState("");
    const [wagerLink, setWagerLink] = useState("");

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
            const result = await signInWithPopup(auth, provider);

            const credential = TwitterAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const secret = credential.secret;
            const user = result.user;

            console.log("User Info:", user);
            console.log("Access Token:", token);
            console.log("Token Secret:", secret);

            window.location.href = `/profile?username=${user.displayName}&photo=${user.photoURL}`;
            navigate(route);
        } catch (error) {
            console.error("Error during sign-in:", error);
        }
    };


    return (
        <div className="wager-form min-h-screen bg-center bg-cover"
            style={{ backgroundImage: `url(${bops})` }}
        >
            <h2>Create a New Wager</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Challenge</label>
                    <input
                        type="text"
                        placeholder="e.g., First to 10 kills"
                        value={challenge}
                        onChange={(e) => setChallenge(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Wager Amount (ETH)</label>
                    <input
                        type="number"
                        placeholder="e.g., 0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Create Wager</button>
            </form>
            {wagerLink && <WagerLink link={wagerLink} />}
            <AddButton btnVal="Connect" onClick={handleClick}/>
        </div>
    );
};

export default Wager;