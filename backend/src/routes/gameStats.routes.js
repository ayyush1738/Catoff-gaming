import express from "express";
import { getPlayerStats } from "../controllers/gameStats.controllers.js";

const router = express.Router();

// Define route for fetching player stats
router.get("/player/:platform/:username", getPlayerStats);

export default router;
