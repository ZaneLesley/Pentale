const playerService = require('../services/playerService');

exports.getRandomPlayerByDate = async (req, res) => {
    // Get how many entries are in 2024 for playerPerSplits
    try {
        const randomPlayer = await playerService.getRandomPlayerByDate();
        res.json(randomPlayer);
    } catch (error) {
        res.status(500).json({error: `${error}`});
    }
};
