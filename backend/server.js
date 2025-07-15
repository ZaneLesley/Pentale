const app = require("./app");
const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`App running on port ${PORT}!`);
});
