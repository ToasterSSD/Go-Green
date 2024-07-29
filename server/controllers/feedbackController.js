const db = require('../models/Feedback');
const Feedback = db.Feedback;

exports.createFeedback = async (req, res) => {
  try {
    const {name, email, feedback} = req.body; 
    const newFeedback = await Feedback.create({id, name, email, feedback});
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Errorz', error });
  }
};

exports.getAllFeedbacks = async (_req, res) => {
  try {
    const feedbacks = await Feedback.findAll();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Errors', error });
  }
};

exports.getFeedbackById = async (req, res) => {
    try {
        const { id } = req.params;
        const feedback = await Feedback.findByPk(id);
        if (feedback) {
            res.status(200).json(feedback);
        } else {
            res.status(404).json({ message: 'Feedback not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Errorn', error });
    }
};

exports.deleteFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Feedback.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Feedback not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Errorw', error });
    }};