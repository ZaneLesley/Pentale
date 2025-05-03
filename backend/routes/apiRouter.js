const {Router: ApiRouter} = require("express")
const gameRouter = ApiRouter();

// Controllers
const apiController = require('../controllers/apiController')

gameRouter.get("/", apiController.getRandomPlayerByDate)

module.exports = gameRouter;