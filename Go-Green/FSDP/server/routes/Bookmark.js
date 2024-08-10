const express = require('express');
const router = express.Router();
const { Bookmark, Article } = require('../models');
const { Op } = require("sequelize");

// Get all bookmarks for a user
router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const bookmarks = await Bookmark.findAll({
            where: { userId },
            include: [Article]
        });
        res.json(bookmarks.map(b => b.Article));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a bookmark
router.post('/', async (req, res) => {
    const { userId, articleId } = req.body;

    try {
        const bookmark = await Bookmark.create({ userId, articleId });
        res.json(bookmark);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Remove a bookmark
router.delete('/:userId/:articleId', async (req, res) => {
    const { userId, articleId } = req.params;

    try {
        await Bookmark.destroy({
            where: {
                userId,
                articleId
            }
        });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;