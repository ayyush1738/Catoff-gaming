import axios from 'axios';
import 'dotenv/config';

const COD_API_KEY = process.env.COD_API_KEY; // Ensure this is set in your `.env` file

export const getPlayerStats = async (req, res) => {
    try {
        const { platform, username } = req.params;

        const response = await axios.get(
            `https://api.tracker.gg/api/v2/warzone/standard/profile/${platform}/${username}`,
            {
                headers: {
                    'TRN-Api-Key': COD_API_KEY,
                },
            }
        );

        res.json(response.data.data);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching player data' });
    }
};
