const {Router} = require("express")
const gameRouter = Router();

// Controllers
const gameController = require('../controllers/gameController')

gameRouter.get("/", gameController.getRandomPlayer)

module.exports = gameRouter;