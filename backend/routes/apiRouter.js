const {Router} = require("express")
const apiRouter = Router();

// Controllers
const apiController = require('../controllers/apiController')

apiRouter.get("/", apiController.getRandomPlayerByDate)

module.exports = apiRouter;