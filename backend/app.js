require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.locals.encodeURIComponenet = encodeURIComponent;
app.use(cors());

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
})