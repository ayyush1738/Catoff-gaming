import axios from 'axios';
import 'dotenv/config';

// const FORTNITE_API_KEY = process.env.TRN_API_KEY;

export const getFortniteStats = async (req, res) => {
    try {
        const { game, mode, matchId } = req.params;

        const encodedMatchId = encodeURIComponent(matchId);

        const apiUrl = `https://www.callofduty.com/api/papi-client/crm/cod/v2/title/${game}/platform/battle/fullMatch/${mode}/${encodedMatchId}/it`;

        const response = await axios.get(apiUrl, {
            headers: {
                // 'TRN-Api-Key': FORTNITE_API_KEY,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip'
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
