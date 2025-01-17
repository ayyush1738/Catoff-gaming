import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ConnectGame from "./components/ConnectGame.jsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/addWager" element={<ConnectGame />} />
            </Routes>
        </Router>
    );
};

export default App;
