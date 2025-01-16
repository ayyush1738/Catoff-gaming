import React, { useState } from "react";
import axios from "axios";
import bops from "../../public/BlackOps3.jpg";

const Wager = () => {
  const [username, setUsername] = useState("");
  const [platform, setPlatform] = useState("epic"); // Default to "epic"
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [showNextPart, setShowNextPart] = useState(false); // State to manage slider visibility

  const fetchStats = async () => {
    if (!username) {
      setError("Please enter a username.");
      return;
    }
    
    try {
      const encodedUsername = encodeURIComponent(username);
      const response = await axios.get(
        `http://localhost:8000/api/cod/fortnite/${platform}/${encodedUsername}`
      );
      setStats(response.data);
      setError("");
      setShowNextPart(true); // Show the next part after fetching stats successfully
    } catch (err) {
      setError("Failed to fetch stats. Please check the username or platform.");
      console.error(err);
      setShowNextPart(true);
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="z-30 p-8 bg-gradient-to-t from-orange-300 to-orange-600 shadow-lg rounded-lg max-w-lg text-center">
        {/* Slider Part 1 */}
        {!showNextPart && (
          <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1>Fortnite Player Stats</h1>
            <div style={{ marginBottom: "20px" }}>
              <label>
                <strong>Platform:</strong>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  style={{ marginLeft: "10px", padding: "5px" }}
                >
                  <option value="epic">Epic</option>
                  <option value="psn">PlayStation</option>
                  <option value="xbl">Xbox</option>
                </select>
              </label>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <input
                type="text"
                placeholder="Enter Epic Games Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ padding: "10px", width: "300px" }}
              />
            </div>
            <button
              onClick={fetchStats}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Connect
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {stats && (
              <div style={{ marginTop: "20px" }}>
                <h2>Player: {stats.platformInfo.platformUserHandle}</h2>
                <p><strong>Wins:</strong> {stats.stats.all.overall.wins}</p>
                <p><strong>Kills:</strong> {stats.stats.all.overall.kills}</p>
                <p><strong>K/D Ratio:</strong> {stats.stats.all.overall.kd}</p>
              </div>
            )}
          </div>
        )}

        {/* Slider Part 2 */}
        {showNextPart && (
          <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1>Set Your Wager</h1>
            <p>Create a challenge and set a bet to compete!</p>
            <div style={{ marginBottom: "20px" }}>
              <input
                type="number"
                placeholder="Enter Bet Amount"
                style={{ padding: "10px", width: "300px" }}
              />
            </div>
            <button
              onClick={() => alert("Wager Created!")}
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Create Wager
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wager;
