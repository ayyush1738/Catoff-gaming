import React from "react";

const Login = () => {
    const handleLogin = () => {
        window.location.href = "http://localhost:5723/auth/twitter";
    };

    return (
        <div>
            <h2>Login with Twitter</h2>
            <button onClick={handleLogin}>Login via Twitter</button>
        </div>
    );
};

export default Login;
