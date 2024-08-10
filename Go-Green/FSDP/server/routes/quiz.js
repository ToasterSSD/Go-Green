const express = require('express');
const router = express.Router();
const { Quiz } = require('../models');
const yup = require('yup');

// Save a new quiz score
router.post('/save', async (req, res) => {
    const schema = yup.object().shape({
        username: yup.string().required(),
        score: yup.number().required()
    });

    try {
        await schema.validate(req.body);
        const quiz = await Quiz.create(req.body);
        res.json(quiz);
    } catch (error) {
        res.status(400).json({ errors: error.errors });
    }
});

// Get all quiz scores
router.get('/scores', async (req, res) => {
    const scores = await Quiz.findAll({
        order: [['score', 'DESC']]
    });
    res.json(scores);
});

// Delete a quiz score
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Quiz.destroy({
            where: { id }
        });
        if (result) {
            res.json({ message: 'Score deleted successfully.' });
        } else {
            res.status(404).json({ message: 'Score not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete score.', error });
    }
});

module.exports = router;


