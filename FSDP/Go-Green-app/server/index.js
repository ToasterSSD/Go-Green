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
app.use("/tutorial", tutorialRoute);
const userRoute = require('./routes/user');
app.use("/user", userRoute);
const fileRoute = require('./routes/file');
app.use("/file", fileRoute);
// const adminRoute = require('./routes/admin');
// app.use("/admin", adminRoute);

const db = require('./models');
db.sequelize.sync({ alter: true })
    .then(() => {
        let port = process.env.APP_PORT;
        app.listen(port, () => {
            console.log(`⚡ Sever running on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });


    // //stripe
    // import Stripe from 'stripe';
    // import express, {json} from 'express';
    // import * as dotenv from 'dotenv';
    // import cors from 'cors';
    
    // dotenv.config();
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    // const port = process.env.PORT || 3000;
    // app.use(cors());
    // app.use(json());
    
    // app.use((error, req, res, next) => {
    //     res.status(500).json({ error: error.message });
    // });
