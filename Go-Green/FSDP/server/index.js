const express = require('express');
const cors = require('cors');
require('dotenv').config();

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

app.use("/tutorial", tutorialRoute);
app.use("/user", userRoute);
app.use("/feedback", feedbackRoutes);
app.use("/file", fileRoute);
app.use("/announcement", announcementRoute);
app.use("/chatarea", chatareaRoute);

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
