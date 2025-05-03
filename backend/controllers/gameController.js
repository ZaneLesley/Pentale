const playerService = require("../services/playerService")

exports.getPlayers = async (req, res) => {
    //
    try {
        const data = await playerService.getRandomPlayerByDate()
        res.json(data);
    } catch (error) {
        res.status(500).json({error: `${error}`});
    }
};