const express = require('express');
const router = express.Router();
const { Op } = require("sequelize");
const { Article } = require('../models');
const yup = require("yup");

router.post("/", async (req, res) => {
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object({
        title: yup.string().trim().min(3).max(30).required(),
        category: yup.string().trim().min(3).max(30).required(),
        author: yup.string().trim().min(3).max(30).required()
    });
    try {
        data = await validationSchema.validate(data,
            { abortEarly: false });
        // Process valid data
        let result = await Article.create(data);
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ errors: err.errors });
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

router.put("/:id", async (req, res) => {
    let id = req.params.id;
    // Check id not found
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
        author: yup.string().trim().min(3).max(30)
    });
    try {
        data = await validationSchema.validate(data,
            { abortEarly: false });
        // Process valid data


        let num = await Article.update(data, {
            where: { id: id }
        });
        if (num == 1) {
            res.json({
                message: "Article was updated successfully."
            });
        }
        else {
            res.status(400).json({
                message: `Cannot update Article with id ${id}.`
            });
        }
    }
    catch (err) {
        res.status(400).json({ errors: err.errors });
    }
});

router.delete("/:id", async (req, res) => {
    let id = req.params.id;
    let num = await Article.destroy({
        where: { id: id }
    })
    if (num == 1) {
        res.json({
            message: "Article was deleted successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot delete article with id ${id}.`
        });
    }
});


module.exports = router;