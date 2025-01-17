import express from "express";
import { createWager } from "../controllers/wager.controllers.js";

const router = express.Router();

// Route for fetching player stats
router.post('/create', createWager);

export default router;