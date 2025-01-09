import express from "express";
import { getFortniteStats } from "../controllers/gameStats.controllers.js";

const router = express.Router();

// Route for fetching player stats
router.get("/player/:platform/:username", getFortniteStats);

export default router;
