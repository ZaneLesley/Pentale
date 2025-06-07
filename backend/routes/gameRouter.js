const {Router} = require('express');
gameRouter = new Router();

const gameController = require('../controllers/gameController');

// GETS

// POSTS
gameRouter.post("/generate", gameController.generateGame);
gameRouter.post("/status", gameController.fetchGameStatus);
gameRouter.post("/analyze", gameController.analyzePlayerGuess);
gameRouter.post("/correct", gameController.fetchCorrectPlayer)


module.exports = gameRouter;