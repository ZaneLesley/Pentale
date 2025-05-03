const {Router: ApiRouter} = require("express")
const gameRouter = ApiRouter();

// Controllers
const apiController = require('../controllers/apiController')

gameRouter.get("/", apiController.getRandomPlayer)

module.exports = gameRouter;