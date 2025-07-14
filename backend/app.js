const express = require('express');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 8080;

console.log(process.env.DATABASE_URL)

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

const sessionMiddleware = (session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        //httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24         // 1 hour
    }
}));

// Log all routes requests to console
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});


app.get("/", (req, res) => {
    res.send("Backend API is running. Use /api or /game endpoints.");
});

app.post("/", (req, res) => {
    res.send("Backend API is running. Use /api or /game endpoints.");
});


// Routers
const apiRouter = require('./routes/apiRouter');
app.use("/api", apiRouter);

const gameRouter = require('./routes/gameRouter');
app.use("/game", sessionMiddleware, gameRouter);


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});