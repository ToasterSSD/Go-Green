const express = require('express');
const router = express.Router();
const { Op } = require("sequelize");
const { Article } = require('../models');
const yup = require("yup");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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
    limits: { fileSize: 1024 * 1024 }, // 1MB limit
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

router.post("/", upload.single('imageFile'), async (req, res) => {
    let data = req.body;

    // Validate request body
    let validationSchema = yup.object({
        title: yup.string().trim().min(3).max(30).required(),
        category: yup.string().trim().min(3).max(30).required(),
        author: yup.string().trim().min(3).max(30).required(),
        content: yup.string().trim().required()
    });

    try {
        data = await validationSchema.validate(data, { abortEarly: false });

        // Validate image file
        if (!req.file) {
            return res.status(400).json({ errors: ['Image file is required'] });
        }

        data.imageFile = req.file.filename;

        // Process valid data
        let result = await Article.create(data);
        res.json(result);
    } catch (err) {
        if (err.name === 'MulterError') {
            return res.status(400).json({ errors: [err.message] });
        }
        res.status(400).json({ errors: err.errors || [err.message] });
    }
});

router.get("/", async (req, res) => {
    let condition = {};
    let search = req.query.search;
    if (search) {
        condition[Op.or] = [
            { title: { [Op.like]: `%${search}%` } },
            { category: { [Op.like]: `%${search}%` } },
            { author: { [Op.like]: `%${search}%` } }
        ];
    }

    let list = await Article.findAll({
        where: condition,
        order: [['createdAt', 'DESC']]
    });
    res.json(list);
});

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let article = await Article.findByPk(id);
    // Check id not found
    if (!article) {
        res.sendStatus(404);
        return;
    }
    res.json(article);
});

router.put("/:id", upload.single('imageFile'), async (req, res) => {
    let id = req.params.id;
    let article = await Article.findByPk(id);
    if (!article) {
        res.sendStatus(404);
        return;
    }

    let data = req.body;
    // Validate request body
    let validationSchema = yup.object({
        title: yup.string().trim().min(3).max(30),
        category: yup.string().trim().min(3).max(30),
        author: yup.string().trim().min(3).max(30),
        content: yup.string().trim().required()
    });

    try {
        data = await validationSchema.validate(data, { abortEarly: false });

        // Validate image file if uploaded
        if (req.file) {
            data.imageFile = req.file.filename;
        }

        // Process valid data
        let num = await Article.update(data, {
            where: { id: id }
        });
        if (num == 1) {
            res.json({
                message: "Article was updated successfully."
            });
        } else {
            res.status(400).json({
                message: `Cannot update Article with id ${id}.`
            });
        }
    } catch (err) {
        res.status(400).json({ errors: err.errors });
    }
});

router.delete("/:id", async (req, res) => {
    let id = req.params.id;
    let num = await Article.destroy({
        where: { id: id }
    });
    if (num == 1) {
        res.json({
            message: "Article was deleted successfully."
        });
    } else {
        res.status(400).json({
            message: `Cannot delete article with id ${id}.`
        });
    }
});

module.exports = router;



