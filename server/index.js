require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql')
const cors = require('cors');
const app = express();
app.use(express.json());

// Enable CORS
app.use(cors({
    origin: process.env.CLIENT_URL
}));

// Simple Route
app.get("/", (req, res) => {
    res.send("Welcome to Go Green.");
});
// Routes
const tutorialRoute = require('./routes/tutorial');
app.use("/tutorial", tutorialRoute);

// Set up body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Create a MySQL connection
const gogreendb = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'mysql',
    database: 'gogreendb'
  });

let port = process.env.APP_PORT;

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
