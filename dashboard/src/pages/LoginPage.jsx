import React from "react";
import { auth, provider, signInWithPopup, TwitterAuthProvider } from "../config/firebase.js";
import { useNavigate } from "react-router-dom";
import ProfilePage from './ProfilePage.jsx';

const LoginPage = () => {
    const navigate = useNavigate();
    const handleLogin = async () => {
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
            navigate(route)
        } catch (error) {
            console.error("Error during sign-in:", error);
        }
    };

    return (
        <div className="container">
            <h1>Login with Twitter</h1>
            <button onClick={handleLogin} route="/profile">Login with Twitter</button>
        </div>
    );
};

export default LoginPage;
