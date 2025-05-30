const {Router} = require("express")
const apiRouter = Router();

// Controllers
const apiController = require('../controllers/apiController')

// GETS

// POSTS
apiRouter.post("/player", apiController.getPlayerData)
apiRouter.post("/player/image", apiController.getPlayerImage)
apiRouter.post("/player/random", apiController.getRandomPlayerByDate)
apiRouter.post("/player/suggestions", apiController.getSuggestions)


module.exports = apiRouter;