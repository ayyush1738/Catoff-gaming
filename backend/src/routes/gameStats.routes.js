import express from "express";
import { getFortniteStats } from "../controllers/gameStats.controllers.js";

const router = express.Router();

// Route for fetching player stats
router.get("/fortnite/:platform/:username", getFortniteStats);

export default router;
