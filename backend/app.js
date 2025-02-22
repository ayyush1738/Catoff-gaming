import express from 'express';
import healthcheckRouter from './src/routes/healthcheck.routes.js';
import errorHandler from './src/middleware/error.middleware.js';
import 'dotenv/config';
import connectRouter from "./src/routes/gameStats.routes.js";
import wagerRouter from "./src/routes/wager.routes.js"
import cors from "cors";
import bodyParser from "body-parser";


// import router from "./src/routes/user.routes.js";

const app = express();
const corsOptions = {
    origin: ["http://localhost:5173"], // Allow your frontend URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, 
    allowedHeaders: ["Content-Type", "Authorization", "TRN-Api-Key"]
};
  
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));



app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/connect", connectRouter);
app.use("/api/setWager", wagerRouter);

app.use(errorHandler);

export default app;
