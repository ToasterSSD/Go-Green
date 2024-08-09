require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
const mcache = require('memory-cache');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(bodyParser.json());

// Enable CORS
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

// Enable gzip compression
app.use(compression());

// Caching middleware
const cache = (duration) => {
    return (req, res, next) => {
        let key = '__express__' + req.originalUrl || req.url;
        let cachedBody = mcache.get(key);
        if (cachedBody) {
            res.send(cachedBody);
            return;
        } else {
            res.sendResponse = res.send;
            res.send = (body) => {
                mcache.put(key, body, duration * 1000);
                res.sendResponse(body);
            };
            next();
        }
    };
};

// Import routes
const homepageRoutes = require("./routes/homepage");
const registrationRoutes = require("./routes/registration");
const quizRoutes = require("./routes/quiz");
const userRoutes = require("./routes/user");
const feedbackRoutes = require("./routes/feedback");
const fileRoutes = require("./routes/file");
const announcementRoutes = require("./routes/announcement");
const chatareaRoutes = require("./routes/chatarea");
const articleRoutes = require("./routes/article");
const learningRoutes = require("./routes/learning");
const userviewRoutes = require("./routes/userview");
const gameRoutes = require("./routes/game");
const extrauserinfoRoute = require("./routes/extrauserinfo");
const HomeAddressRoute = require("./routes/HomeAddress");
const PaymentRoute = require("./routes/Payment");

// Use routes
app.use("/homepage", homepageRoutes);
app.use("/api/registration", registrationRoutes);
app.use("/quiz", quizRoutes);
app.use("/user", userRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/file", fileRoutes);
app.use("/announcement", announcementRoutes);
app.use("/chatarea", chatareaRoutes);
app.use("/article", articleRoutes);
app.use("/learning", learningRoutes);
app.use("/userview", userviewRoutes);
app.use("/game", gameRoutes);
app.use("/extrauserinfo", extrauserinfoRoute);
app.use("/HomeAddress", HomeAddressRoute);
app.use("/Payment", PaymentRoute);

// Simple route
app.get("/", (req, res) => {
    res.send("Welcome to Go Green!");
});

// Route for public learning topics
app.get('/public-learning-topics', cache(10), (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Adjust the path as needed
});

// Route for public articles
app.get('/public-articles', cache(10), (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Adjust the path as needed
});

// Handle 404 for undefined routes
app.use((req, res, next) => {
    res.status(404).send("Route not found");
});

// Start the server
const db = require('./models');
db.sequelize.sync({ alter: true })
    .then(() => {
        let port = process.env.APP_PORT || 3001;
        app.listen(port, () => {
            console.log(`⚡ Server running on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error("Failed to sync database:", err);
    });
