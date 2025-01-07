import express from 'express';
import healthcheckRouter from './src/routes/healthcheck.routes.js';
import errorHandler from './src/middleware/error.middleware.js';
import 'dotenv/config';
import codRoutes from "./src/routes/gameStats.routes.js";
import cors from "cors";
import bodyParser from "body-parser";


// import router from "./src/routes/user.routes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));




app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/cod", codRoutes)

app.use(errorHandler);

export default app;
