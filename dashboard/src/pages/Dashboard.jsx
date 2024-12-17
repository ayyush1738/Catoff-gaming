import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:5723/auth/current_user", { withCredentials: true })
            .then((res) => setUser(res.data))
            .catch((err) => console.error("Error fetching user:", err));
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            {user ? (
                <div>
                    <p>Welcome, {user.username}</p>
                    <img src={user.avatar} alt="Avatar" width="100" />
                    <a href="http://localhost:5723/auth/logout">Logout</a>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Dashboard;
