import axios from 'axios';
import 'dotenv/config';

const FORTNITE_API_KEY = process.env.TRN_API_KEY; // Replace COD_API_KEY with a more generic name if necessary

export const getFortniteStats = async (req, res) => {
    try {
        const { platform, username } = req.params;

        // Ensure username is URL-encoded
        const encodedUsername = encodeURIComponent(username);

        // Fortnite API Endpoint
        const apiUrl = `https://api.tracker.gg/api/v2/fortnite/standard/profile/${platform}/${encodedUsername}`;

        const response = await axios.get(apiUrl, {
            headers: {
                'TRN-Api-Key': FORTNITE_API_KEY,
            },
        });

        // Return the player's Fortnite stats
        res.json(response.data.data);
    } catch (err) {
        console.error('Error fetching Fortnite stats:', err.response?.data || err.message);
        res.status(err.response?.status || 500).json({
            error: err.response?.data?.errors?.[0]?.message || 'Error fetching Fortnite stats',
        });
    }
};
