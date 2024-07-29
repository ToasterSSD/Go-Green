require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
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
    res.send("Welcome to the learning space.");
});

// Routes
const tutorialRoute = require('./routes/tutorial');
const userRoute = require('./routes/user');
const feedbackRoutes = require('./routes/feedback');
const fileRoute = require('./routes/file');
const announcementRoute = require('./routes/announcement');
const chatareaRoute = require('./routes/chatarea');
const articleRoute = require('./routes/article');
const learningRoute = require('./routes/learning');

app.use("/tutorial", tutorialRoute);
app.use("/user", userRoute);
app.use("/feedback", feedbackRoutes);
app.use("/file", fileRoute);
app.use("/announcement", announcementRoute);
app.use("/chatarea", chatareaRoute);
app.use("/article", articleRoute);
app.use("/learning", learningRoute);

// Route for public learning topics
app.get('/public-learning-topics', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Adjust the path as needed
});

// Route for public articles
app.get('/public-articles', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Adjust the path as needed
});

// Set up body-parser middleware to parse JSON requests
app.use(bodyParser.json());


const db = require('./models');
db.sequelize.sync({ alter: true })
    .then(() => {
        let port = process.env.APP_PORT;

        app.listen(port, () => {
            console.log(`⚡ Server running on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
