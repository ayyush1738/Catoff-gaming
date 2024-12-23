import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'cookie-session'; // Import cookie-session
import healthcheckRouter from './src/routes/healthcheck.routes.js';
import errorHandler from './src/middleware/error.middleware.js';
import passport from 'passport';
import 'dotenv/config';
import './src/config/passportSetup.js';
import helmet from 'helmet';


import router from "./src/routes/user.routes.js";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    })
);

if (!process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET is not defined in the environment variables.");
}

app.use(
    session({
        name: "session",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        keys: [process.env.SESSION_SECRET], 
    })
);


app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
                connectSrc: ["'self'", "http://localhost:5723"], // Allow backend connections
                imgSrc: ["'self'", "data:", "https://*"],
                styleSrc: ["'self'", "'unsafe-inline'"],
            },
        },
    })
);


app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/auth", router);

app.use(errorHandler);

export default app;
