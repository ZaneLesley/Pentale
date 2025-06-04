const playerService = require("../services/playerService");
const playerPerSplitService = require("../services/playerPerSplitService");
const gameService = require("../services/gameService");

exports.generateGame = async (req, res) => {
    console.log("Session ID:", req.sessionID);
    try {
        const {year} = req.body;
        const randomPlayer = await playerService.fetchPlayerFullData(year);
        const numGuesses = 0;
        if (!randomPlayer) {
            return res.status(400).json({error: res.statusText});
        }

        req.session.playerPerSplitId = randomPlayer.playerPerSplit.id;
        req.session.numGuesses = numGuesses;
        req.session.year = year;
        res.json(randomPlayer);
    } catch (error) {
        res.status(500).json({error: `${error}`});
    }
};

exports.fetchGameStatus = (req, res) => {
    console.log("Session ID:", req.sessionID);
    try {
        res.json({
            player: req.session.playerPerSplitId,
            guesses: req.session.numGuesses,
        });
    } catch (e) {
        console.error(e);
    }
};

exports.analyzePlayerGuess = async (req, res) => {
    console.log("Session ID:", req.sessionID);
    const {player} = req.body;
    const {player: correctPlayer} = await playerService.fetchPlayerByPerSplitId(req.session.playerPerSplitId);
    player.cspm = parseFloat(player.cspm);
    correctPlayer.cspm = parseFloat(correctPlayer.cspm);

    const result = gameService.analyzeGuess(player, correctPlayer);
    console.log(result);
    res.json(result);
};