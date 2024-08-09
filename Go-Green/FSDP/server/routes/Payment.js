const express = require('express');
const router = express.Router();
const { Payment } = require('../models');
const yup = require("yup");
const { validateToken } = require('../middlewares/auth');

// Schema validation
const schema = yup.object().shape({
    cardnumber: yup.string().max(255).required(),
    expirationDate: yup.date().required(),
    ccv: yup.string().max(3).required(),
});

// Create Payment
router.post('/', validateToken, async (req, res) => {
    try {
        const data = await schema.validate(req.body);
        data.userId = req.user.id;
        const payment = await Payment.create(data);
        res.status(201).json(payment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Read Payment by userId
router.get('/:userId', validateToken, async (req, res) => {
    try {
        const payment = await Payment.findOne({ where: { userId: req.params.userId } });
        if (!payment) {
            return res.status(404).json({ error: 'Payment information not found' });
        }
        res.json(payment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read Specific Field by userId and field name
router.get('/:userId/:field', validateToken, async (req, res) => {
    const { userId, field } = req.params;
    const allowedFields = ['cardnumber', 'expirationDate', 'ccv'];

    if (!allowedFields.includes(field)) {
        return res.status(400).json({ error: 'Invalid field' });
    }

    try {
        const payment = await Payment.findOne({ where: { userId } });
        if (!payment) {
            return res.status(404).json({ error: 'Payment information not found' });
        }
        res.json({ [field]: payment[field] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Specific Field by userId and field name
router.put('/:userId/:field', validateToken, async (req, res) => {
    const { userId, field } = req.params;
    const allowedFields = ['cardnumber', 'expirationDate', 'ccv'];

    if (!allowedFields.includes(field)) {
        return res.status(400).json({ error: 'Invalid field' });
    }

    try {
        const payment = await Payment.findOne({ where: { userId } });
        if (!payment) {
            return res.status(404).json({ error: 'Payment information not found' });
        }

        payment[field] = req.body[field];
        await payment.save();

        res.json(payment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete Specific Field by userId and field name
router.delete('/:userId/:field', validateToken, async (req, res) => {
    const { userId, field } = req.params;
    const allowedFields = ['cardnumber', 'expirationDate', 'ccv'];

    if (!allowedFields.includes(field)) {
        return res.status(400).json({ error: 'Invalid field' });
    }

    try {
        const payment = await Payment.findOne({ where: { userId } });
        if (!payment) {
            return res.status(404).json({ error: 'Payment information not found' });
        }

        payment[field] = null;
        await payment.save();

        res.json({ message: `Field ${field} deleted`, payment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Payment by userId
router.delete('/:userId', validateToken, async (req, res) => {
    try {
        const payment = await Payment.findOne({ where: { userId: req.params.userId } });
        if (!payment) {
            return res.status(404).json({ error: 'Payment information not found' });
        }
        await payment.destroy();
        res.json({ message: 'Payment information deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
