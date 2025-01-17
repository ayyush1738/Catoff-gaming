import axios from 'axios';
import { ethers } from 'ethers';

// Utility function to generate a unique wager ID
const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
};

// In-memory storage for wagers (replace with a database for production)
const wagers = {};

// Place a bet
export const createWager = async (req, res) => {
    try {
        const { betAmount, chain, wagerType } = req.body;

        // Validate input
        if (!betAmount || typeof betAmount !== 'number' || betAmount <= 0) {
            return res.status(400).json({ error: 'Invalid bet amount. Must be a positive number.' });
        }

        if (!chain || !['USD', 'ETH'].includes(chain)) {
            return res.status(400).json({ error: 'Invalid chain. Must be "USD" or "ETH".' });
        }

        if (!wagerType || !['First to kill 6 people', 'First to kill 10 people'].includes(wagerType)) {
            return res.status(400).json({ error: 'Invalid wager type. Must be a valid type.' });
        }

        const wagerId = generateUniqueId();
        const wagerLink = `${req.protocol}://${req.get('host')}/wager/${wagerId}`;

        // Save wager details (use a database or in-memory for simplicity)
        wagers[wagerId] = { betAmount, chain, wagerType, createdAt: new Date().toISOString() };

        res.status(201).json({ wagerLink, wagerId });
    } catch (err) {
        console.error('Error Creating The Wager:', err.response?.data || err.message);
        res.status(err.response?.status || 500).json({
            error: err.response?.data?.errors?.[0]?.message || 'An unexpected error occurred while creating the wager.',
        });
    }
};


// const validateStats = async (req, res, next) => {
//     try {
//         const { kills } = req.body;
//         const proof = await generateProof(kills);
//         res.json({ proof });
//     } catch (error) {
//         next(error);
//     }
// };

