require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.locals.encodeURIComponenet = encodeURIComponent;
app.use(cors());

// Log all routes requests to console
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

const PORT = process.env.PORT || 8080;

app.get("/",  (req, res) => {
    res.redirect("/api");
})


// Router
const apiRouter = require('../backend/routes/apiRouter');
app.use("/api", apiRouter);

const gameRouter = require('../backend/routes/gameRouter');
app.use("/game", gameRouter)

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
})