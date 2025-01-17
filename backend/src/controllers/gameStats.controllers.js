import axios from 'axios';
import 'dotenv/config';

const FORTNITE_API_KEY = process.env.TRN_API_KEY;

export const getFortniteStats = async (req, res) => {
    try {
        const { platform, username } = req.params;
        console.log(platform);

        const encodedUsername = encodeURIComponent(username);

        const apiUrl = `https://api.tracker.gg/api/v2/fortnite/standard/profile/${platform}/${encodedUsername}`;

        const response = await axios.get(apiUrl, {
            headers: {
                'TRN-Api-Key': FORTNITE_API_KEY,
            },
        });

        res.status(200).json({message: "Successfully Connected", status: 200})
    } catch (err) {
        console.error('Error fetching Fortnite stats:', err.response?.data || err.message);
        res.status(err.response?.status || 500).json({
            error: err.response?.data?.errors?.[0]?.message || 'Error fetching Fortnite stats',
        });
    }
};
