require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS
app.use(cors({
    origin: process.env.CLIENT_URL
}));

// Simple Route
app.get("/", (req, res) => {
    res.send("Welcome to Go Green.");
});
let port = process.env.APP_PORT;

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
