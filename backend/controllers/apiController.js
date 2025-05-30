const playerService = require('../services/playerService');

exports.getRandomPlayerByDate = async (req, res) => {
    try {
        const {year} = req.body;
        const randomPlayer = await playerService.getRandomPlayerByDate(year);

        if (!randomPlayer) {
            return res.status(400).json({error: res.statusText});
        }

        return res.json(randomPlayer);
    } catch (error) {
        res.status(500).json({error: `${error}`});
    }
};

exports.getPlayerData = async (req, res) => {
    try {
        const {username} = req.body;

        if (!username) {
            return res.status(400).json({error: "Username is required"});
        }

        const player = await playerService.getPlayerData(username)
        if (!player) {
            return res.status(404).json({error: "Player not found"})
        }
        return res.json(player);

    } catch (e) {
        res.status(500).json({error: `${e}`});
    }
};

exports.getPlayerImage = async (req, res) => {
    try {
        const {imagePath} = req.body

        if (!imagePath) {
            return res.status(400).json({error: "Image path is required"});
        }

        const file = playerService.getPlayerImagePath(imagePath)
        res.sendFile(file);

    } catch (err) {
        res.status(500).json({error: `${err}`});
    }
}
