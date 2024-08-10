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

// Simple Route
app.get("/", (req, res) => {
    res.send("Welcome to Go Green!");
});

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

// Lazy load routes
app.use('/api/registration', (req, res, next) => {
    require('./routes/registration')(req, res, next);
});
app.use('/quiz', (req, res, next) => {
    require('./routes/quiz')(req, res, next);
});
app.use("/user", (req, res, next) => {
    require('./routes/user')(req, res, next);
});
app.use("/feedback", (req, res, next) => {
    require('./routes/feedback')(req, res, next);
});
app.use("/file", (req, res, next) => {
    require('./routes/file')(req, res, next);
});
app.use("/announcement", (req, res, next) => {
    require('./routes/announcement')(req, res, next);
});
app.use("/chatarea", (req, res, next) => {
    require('./routes/chatarea')(req, res, next);
});
app.use("/article", (req, res, next) => {
    require('./routes/article')(req, res, next);
});
app.use("/learning", (req, res, next) => {
    require('./routes/learning')(req, res, next);
});
app.use("/userview", (req, res, next) => {
    require('./routes/userview')(req, res, next);
});
app.use("/game", (req, res, next) => {
    require('./routes/game')(req, res, next);
});


// Route for public learning topics
app.get('/public-learning-topics', cache(10), (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Adjust the path as needed
});

// Route for public articles
app.get('/public-articles', cache(10), (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Adjust the path as needed
});

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