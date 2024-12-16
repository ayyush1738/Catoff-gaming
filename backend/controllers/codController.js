const axios = require('axios');
const { generateProof } = require('../zk/proofs');
const ethers = require('ethers');

const COD_API_KEY = process.env.COD_API_KEY;

// Fetch COD player stats
const getPlayerStats = async (req, res, next) => {
    try {
        const { platform, username } = req.params;
        const response = await axios.get(
            `https://api.tracker.gg/api/v2/warzone/standard/profile/${platform}/${username}`,
            { headers: { 'TRN-Api-Key': COD_API_KEY } }
        );
        res.json(response.data);
    } catch (error) {
        next(error);
    }
};

// Place a bet
const placeBet = async (req, res, next) => {
    try {
        const { condition, amount } = req.body;
        const tx = await contract.placeBet(condition, {
            value: ethers.utils.parseEther(amount),
        });
        await tx.wait();
        res.json({ success: true, txHash: tx.hash });
    } catch (error) {
        next(error);
    }
};

// Validate stats using zk-proof
const validateStats = async (req, res, next) => {
    try {
        const { kills } = req.body;
        const proof = await generateProof(kills);
        res.json({ proof });
    } catch (error) {
        next(error);
    }
};

module.exports = { getPlayerStats, placeBet, validateStats };
