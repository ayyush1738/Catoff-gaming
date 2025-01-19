import React, { useState } from "react";
import axios from "axios";
import bops from "../../public/BlackOps3.jpg";
import CreateWager from "./Wager.jsx";

const ConnectGame = () => {
  const [matchId, setMatchId] = useState("");
  const [game, setPlatform] = useState("mw");
  const [mode, setMode] =  useState("wz");
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [showNextPart, setShowNextPart] = useState(false); // State to manage slider visibility

  const fetchStats = async () => {
    if (!matchId) {
      setError("Please enter a username.");
      return;
    }
    
    try {
      const encodedMatchId = encodeURIComponent(matchId);
      const response = await axios.get(
        `http://localhost:8000/api/connect/fortnite/${game}/${mode}/${encodedMatchId}`,
        {
            headers: {
                'Content-Type': 'application/json',
                // Add any additional headers if needed
            }
        }
      );
      setStats(response.data);
      setError("");
      setShowNextPart(true); // Show the next part after fetching stats successfully
    } catch (err) {
      setError("Failed to fetch stats. Please check the username or platform.");
      console.error(err);
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="z-30 p-8 bg-gradient-to-t from-orange-300 to-orange-600 shadow-lg rounded-lg max-w-lg text-center">
        {/* Slider Part 1 */}
        {!showNextPart && (
          <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1>Call Of Duty Player Stats</h1>
            <div style={{ marginBottom: "20px" }}>
              <label>
                <strong>Game:</strong>
                <select
                  value={game}
                  onChange={(e) => setPlatform(e.target.value)}
                  style={{ marginLeft: "10px", padding: "5px" }}
                >
                  <option value="mw">Modern Warfare</option>
                  <option value="psn">Black Ops</option>
                  <option value="xbl">Ghosts</option>
                </select>

                <strong>Mode:</strong>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  style={{ marginLeft: "10px", padding: "5px" }}
                >
                  <option value="wz">War Zone</option>
                  <option value="psn">PlayStation</option>
                  <option value="xbl">Xbox</option>
                </select>
              </label>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <input
                type="text"
                placeholder="Enter Match Id"
                value={matchId}
                onChange={(e) => setMatchId(e.target.value)}
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
          <CreateWager />
        )}
      </div>
    </div>
  );
};

export default ConnectGame;
