const express = require('express');
const router = express.Router();
const { ExtraUserInfo } = require('../models');
const yup = require("yup");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { validateToken } = require('../middlewares/auth');

// Ensure the uploads directory exists
const uploadDirectory = path.join(__dirname, '../public/uploads/');
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Set up multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 1024 }, // 1GB limit
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Images only!'));
        }
    }
});

// Validation Schema for ExtraUserInfo
const schema = yup.object().shape({
    displayName: yup.string().max(63),
    phoneNumber: yup.string().max(20),
    gender: yup.string().max(10),
    age: yup.number().integer(),
    dateOfBirth: yup.date(),
    socialMedia: yup.string().max(255),
    profilePicture: yup.string().max(255),
    bio: yup.string().max(255),
});

// PUT method to update all ExtraUserInfo fields by userId
router.put('/:userId', validateToken, upload.single('profilePicture'), async (req, res) => {
    try {
        const { userId } = req.params;
        const extraInfo = await ExtraUserInfo.findOne({ where: { userId } });

        if (!extraInfo) {
            return res.status(404).json({ error: 'Extra user info not found' });
        }

        let updateData = req.body;

        // Handle file upload
        if (req.file) {
            updateData.profilePicture = `/uploads/${req.file.filename}`;
        }

        // Validate the entire update data against the schema
        await schema.validate(updateData);

        // Update the entire record
        await extraInfo.update(updateData);

        res.json(extraInfo);
    } catch (error) {
        if (error.name === 'MulterError') {
            return res.status(400).json({ errors: [error.message] });
        }
        res.status(400).json({ error: error.message });
    }
});

// Existing routes...

// Get ExtraUserInfo by userId or by individual fields
router.get('/:userId/:field?', validateToken, async (req, res) => {
    try {
        const { userId, field } = req.params;
        const extraInfo = await ExtraUserInfo.findOne({ where: { userId } });

        if (!extraInfo) {
            return res.status(404).json({ error: 'Extra user info not found' });
        }

        if (field && extraInfo[field] !== undefined) {
            return res.json({ [field]: extraInfo[field] });
        }

        res.json(extraInfo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete ExtraUserInfo fields by userId
router.delete('/:userId/:field?', validateToken, async (req, res) => {
    try {
        const { userId, field } = req.params;
        const extraInfo = await ExtraUserInfo.findOne({ where: { userId } });

        if (!extraInfo) {
            return res.status(404).json({ error: 'Extra user info not found' });
        }

        if (field) {
            if (extraInfo[field] !== undefined) {
                await extraInfo.update({ [field]: null }); // Clear the specific field
                return res.json({ message: `Field ${field} cleared` });
            } else {
                return res.status(400).json({ error: 'Invalid field' });
            }
        } else {
            await extraInfo.destroy();
            return res.json({ message: 'Extra user info deleted' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read all ExtraUserInfo by userId
router.get('/:userId', validateToken, async (req, res) => {
    try {
        const extraInfo = await ExtraUserInfo.findOne({ where: { userId: req.params.userId } });
        if (!extraInfo) {
            return res.status(404).json({ error: 'Extra user info not found' });
        }
        res.json(extraInfo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
