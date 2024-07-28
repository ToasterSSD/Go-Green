require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql')
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));


// Enable CORS
app.use(cors({
    origin: process.env.CLIENT_URL
}));

// Simple Route
app.get("/", (req, res) => {
    res.send("Welcome to Go Green.");
});
// Routes
const articleRoute = require('./routes/article');
app.use("/article", articleRoute);

const fileRoute = require('./routes/file');
app.use("/file", fileRoute);

// Route for public articles
app.get('/public-articles', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Adjust the path as needed
});

// Set up body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Create a MySQL connection
const gogreendb = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'mysql',
    database: 'gogreendb'
  });

const db = require('./models');
db.sequelize.sync({ alter: true })
    .then(() => {
        let port = process.env.APP_PORT;

        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
