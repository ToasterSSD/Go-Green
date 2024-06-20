const express = require('express');
const app = express();
// Simple Route
app.get("/", (req, res) => {
    res.send("Welcome to Go Green.");
});
let port = 3001;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
