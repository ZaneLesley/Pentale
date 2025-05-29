const express = require('express');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.locals.encodeURIComponenet = encodeURIComponent;
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// Session Middleware
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,                          // Change if using HTTPS
        //httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24             // 24 hours
    }
}));

// Log all routes requests to console
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});


// Router Redirect
app.get("/", (req, res) => {
    res.redirect("/api");
});


// Routers
const apiRouter = require('../backend/routes/apiRouter');
app.use("/api", apiRouter);


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});