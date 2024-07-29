const express = require('express');
const router = express.Router();
const { Op } = require("sequelize");
const { LearningTopic } = require('../models');
const yup = require("yup");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads directory exists
const uploadDirectory = path.join(__dirname, '../public/uploads/');
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Set up multer for video upload
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
    limits: { fileSize: 200 * 1024 * 1024 }, // 200MB limit
    fileFilter: (req, file, cb) => {
        const fileTypes = /mp4|avi|mov/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Videos only!'));
        }
    }
});

// Create a new learning topic
router.post("/", upload.single('videoFile'), async (req, res) => {
    let data = req.body;

    // Validate request body
    let validationSchema = yup.object({
        title: yup.string().trim().min(3).max(100).required(),
        content: yup.string().trim().required(),
        videoLink: yup.string().url().nullable(),
        videoFile: yup.string().nullable()
    });

    try {
        data = await validationSchema.validate(data, { abortEarly: false });

        // Handle video file upload
        if (req.file) {
            data.videoFile = req.file.filename;
        }

        // Combine video file and video link into a single array
        let videos = [];
        if (data.videoLink) videos.push(data.videoLink);
        if (data.videoFile) videos.push(data.videoFile);

        data.videos = videos;

        // Process valid data
        let result = await LearningTopic.create(data);
        res.json(result);
    } catch (err) {
        if (err.name === 'MulterError') {
            return res.status(400).json({ errors: [err.message] });
        }
        res.status(400).json({ errors: err.errors || [err.message] });
    }
});

// Get all learning topics
router.get("/", async (req, res) => {
    let condition = {};
    let search = req.query.search;
    if (search) {
        condition[Op.or] = [
            { title: { [Op.like]: `%${search}%` } },
            { content: { [Op.like]: `%${search}%` } }
        ];
    }

    let list = await LearningTopic.findAll({
        where: condition,
        order: [['createdAt', 'DESC']]
    });
    res.json(list);
});

// Get a learning topic by ID
router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let topic = await LearningTopic.findByPk(id);
    if (!topic) {
        res.sendStatus(404);
        return;
    }
    res.json(topic);
});

// Update a learning topic
router.put("/:id", upload.single('videoFile'), async (req, res) => {
    let id = req.params.id;
    let topic = await LearningTopic.findByPk(id);
    if (!topic) {
        res.sendStatus(404);
        return;
    }

    let data = req.body;
    // Validate request body
    let validationSchema = yup.object({
        title: yup.string().trim().min(3).max(100).required(),
        content: yup.string().trim().required(),
        videoLink: yup.string().url().nullable(),
        videoFile: yup.string().nullable()
    });

    try {
        data = await validationSchema.validate(data, { abortEarly: false });

        // Handle video file upload if any
        if (req.file) {
            data.videoFile = req.file.filename;
        }

        // Combine video file and video link into a single array
        let videos = [];
        if (data.videoLink) videos.push(data.videoLink);
        if (data.videoFile) videos.push(data.videoFile);

        data.videos = videos;

        // Process valid data
        let num = await LearningTopic.update(data, {
            where: { id: id }
        });
        if (num == 1) {
            res.json({
                message: "Learning Topic was updated successfully."
            });
        } else {
            res.status(400).json({
                message: `Cannot update Learning Topic with id ${id}.`
            });
        }
    } catch (err) {
        res.status(400).json({ errors: err.errors });
    }
});

// Delete a learning topic
router.delete("/:id", async (req, res) => {
    let id = req.params.id;
    let num = await LearningTopic.destroy({
        where: { id: id }
    });
    if (num == 1) {
        res.json({
            message: "Learning Topic was deleted successfully."
        });
    } else {
        res.status(400).json({
            message: `Cannot delete Learning Topic with id ${id}.`
        });
    }
});

module.exports = router;





