const playerService = require('../services/playerService');
const playerPerSplitService = require('../services/playerPerSplitService');
const teamService = require('../services/teamService');

exports.getRandomPlayerByDate = async (req, res) => {
    try {
        const {year} = req.body;
        const randomPlayer = await playerService.fetchPlayerFullData(year);

        if (!randomPlayer) {
            return res.status(400).json({error: res.statusText});
        }

        return res.json([randomPlayer]);
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

        const player = await playerService.fetchPlayerData(username);
        const playerPerSplit = await playerPerSplitService.fetchPlayerPerSplitData(player.id);
        const team = await teamService.fetchTeam(playerPerSplit.teamId);
        const data = {
            ...player,
            playerPerSplit: playerPerSplit,
            team: team,
        };
        if (!data) {
            return res.status(404).json({error: "Player not found"});
        }
        return res.json(data);

    } catch (e) {
        res.status(500).json({error: `${e}`});
    }
};

exports.getPlayerImage = async (req, res) => {
    try {
        const {imagePath} = req.body;

        if (!imagePath) {
            return res.status(400).json({error: "Image path is required"});
        }

        const file = playerService.fetchPlayerImagePath(imagePath);
        res.sendFile(file);

    } catch (err) {
        res.status(500).json({error: `${err}`});
    }
};

exports.getSuggestions = async (req, res) => {
    try {
        const {username} = req.body;

        if (!username) {
            return res.status(400).json({error: "Username is required"});
        }

        const suggestions = await playerService.fetchSuggestions(username);
        return res.json(suggestions);
    } catch (err) {
        res.status(500).json({error: `${err}`});
    }
};

exports.getTeamImage = async (req, res) => {
    try {
        const {imagePath} = req.body;

        if (!imagePath) {
            return res.status(400).json({error: "Image path is required"});
        }

        const file = teamService.fetchTeamImagePath(imagePath);
        res.sendFile(file);

    } catch (err) {
        res.status(500).json({error: `${err}`});
    }
};
