const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');
const yup = require("yup");
const { sign } = require('jsonwebtoken');
const { validateToken } = require('../middlewares/auth');
require('dotenv').config();

const PEPPER = process.env.PEPPER;

const validationSchema = yup.object({
    name: yup.string().trim().min(3).max(50).required()
        .matches(/^[a-zA-Z0-9\s'-,.!@#$%^&*()_+=]*$/, "Name can contain letters, numbers, spaces, and special characters like ' - , . ! @ # $ % ^ & * ( ) _ + ="),
    email: yup.string().trim().lowercase().email().max(50).required(),
    password: yup.string().trim().min(8).max(50).required()
        .matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/, "Password must contain at least 1 letter and 1 number")
});

async function registerUser(req, res, role) {
    let data = req.body;
    try {
        data = await validationSchema.validate(data, { abortEarly: false });

        // Check if email already exists
        let existingUser = await User.findOne({ where: { email: data.email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use.' });
        }

        // Pepper and hash password
        const pepperedPassword = data.password + PEPPER;
        data.password = await bcrypt.hash(pepperedPassword, 10);
        
        // Assign the role
        data.roles = role;
        
        // Create user
        let result = await User.create(data);
        res.json({
            message: `Email ${result.email} was registered successfully.`
        });
    } catch (err) {
        res.status(400).json({ errors: err.errors || err.message });
    }
}

router.post("/register", (req, res) => {
    registerUser(req, res, 'USER');
});

router.post("/adminregister", (req, res) => {
    registerUser(req, res, 'ADMIN');
});

router.post("/login", async (req, res) => {
    let data = req.body;
    let validationSchema = yup.object({
        email: yup.string().trim().lowercase().email().max(50).required(),
        password: yup.string().trim().min(8).max(50).required()
    });
    try {
        data = await validationSchema.validate(data, { abortEarly: false });

        let errorMsg = "Email or password is not correct.";
        let user = await User.findOne({ where: { email: data.email } });
        if (!user) {
            res.status(400).json({ message: errorMsg });
            return;
        }
        
        // Add pepper to password before comparing
        const pepperedPassword = data.password + PEPPER;
        let match = await bcrypt.compare(pepperedPassword, user.password);
        if (!match) {
            res.status(400).json({ message: errorMsg });
            return;
        }

        // Return user info
        let userInfo = {
            id: user.id,
            email: user.email,
            name: user.name,
            roles: user.roles
        };
        let accessToken = sign(userInfo, process.env.APP_SECRET, { expiresIn: process.env.TOKEN_EXPIRES_IN });
        res.json({
            accessToken: accessToken,
            user: userInfo
        });
    } catch (err) {
        res.status(400).json({ errors: err.errors || err.message });
    }
});

router.get('/email', validateToken, (req, res) => {
    res.json({ email: req.user.email });
});

router.get("/auth", validateToken, (req, res) => {
    let userInfo = {
        id: req.user.id,
        email: req.user.email,
        name: req.user.name,
        roles: req.user.roles
    };
    res.json({
        user: userInfo
    });
});

module.exports = router;