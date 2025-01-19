import express from "express";
import { getFortniteStats } from "../controllers/gameStats.controllers.js";

const router = express.Router();

// Route for fetching player stats
router.get("/fortnite/:game/:mode/:matchId", getFortniteStats);

export default router;
