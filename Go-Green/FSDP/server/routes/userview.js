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
        .matches(/^[a-zA-Z '-,.]+$/, "Name only allows letters, spaces, and characters: ' - , ."),
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

// Get all users
router.get("/", validateToken, async (req, res) => {
    try {
        const users = await User.findAll({ attributes: ['id', 'name', 'email', 'roles', 'password'] });
        res.json(users);
    } catch (err) {
        res.status(500).json({ errors: err.message });
    }
});

// Get user by ID
router.get("/:id", validateToken, async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, { attributes: ['id', 'name', 'email', 'roles', 'password'] });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ errors: err.message });
    }
});

// Update user by ID
router.put("/:id", validateToken, async (req, res) => {
    const data = req.body;
    let validationSchema = yup.object({
        name: yup.string().trim().min(3).max(50)
            .matches(/^[a-zA-Z '-,.]+$/, "Name only allows letters, spaces, and characters: ' - , ."),
        email: yup.string().trim().lowercase().email().max(50),
        password: yup.string().trim().min(8).max(50)
            .matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/, "Password must contain at least 1 letter and 1 number")
    });
    try {
        const validData = await validationSchema.validate(data, { abortEarly: false });
        if (validData.password) {
            validData.password = await bcrypt.hash(validData.password + PEPPER, 10);
        }
        await User.update(validData, { where: { id: req.params.id } });
        res.json({ message: "User updated successfully" });
    } catch (err) {
        res.status(400).json({ errors: err.errors });
    }
});

// Update user role by ID
router.put("/:id/role", validateToken, async (req, res) => {
    const { role } = req.body;
    if (!['USER', 'ADMIN'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role.' });
    }
    try {
        await User.update({ roles: role }, { where: { id: req.params.id } });
        res.json({ message: "User role updated successfully" });
    } catch (err) {
        res.status(400).json({ errors: err.message });
    }
});

// Delete user by ID
router.delete("/:id", validateToken, async (req, res) => {
    try {
        await User.destroy({ where: { id: req.params.id } });
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ errors: err.message });
    }
});

module.exports = router;
