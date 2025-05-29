const {Router} = require("express")
const apiRouter = Router();

// Controllers
const apiController = require('../controllers/apiController')

// GETS
apiRouter.get("/", apiController.getRandomPlayerByDate)

// POSTS
apiRouter.post("/player", apiController.getPlayerData)

module.exports = apiRouter;