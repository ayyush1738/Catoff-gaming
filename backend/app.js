import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import healthcheckRouter from './src/routes/healthcheck.routes.js';
import errorHandler from './src/middleware/error.middleware.js';

const app = express();
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({ extended:true , limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    })
)

app.use("/api/v1/healthcheck", healthcheckRouter);

app.use(errorHandler)

export default app;