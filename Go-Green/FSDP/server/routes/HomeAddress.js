const express = require('express');
const router = express.Router();
const { HomeAddress } = require('../models');
const yup = require("yup");
const { validateToken } = require('../middlewares/auth');

// Create or Update HomeAddress
router.post('/', validateToken, async (req, res) => {
    const schema = yup.object().shape({
        homeaddress: yup.string().max(255).required(),
        city: yup.string().max(100).required(),
        state: yup.string().max(100).required(),
        country: yup.string().max(100).required(),
        zipCode: yup.string().max(20).required(),
        postalcode: yup.string().max(20).required(),
    });

    try {
        const data = await schema.validate(req.body);
        data.userId = req.user.id;
        const homeAddress = await HomeAddress.create(data);
        res.status(201).json(homeAddress);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Read HomeAddress by userId
router.get('/:userId', validateToken, async (req, res) => {
    try {
        const homeAddress = await HomeAddress.findOne({ where: { userId: req.params.userId } });
        if (!homeAddress) {
            return res.status(404).json({ error: 'Home address not found' });
        }
        res.json(homeAddress);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read Specific Field by userId and field name
router.get('/:userId/:field', validateToken, async (req, res) => {
    const { userId, field } = req.params;
    const allowedFields = ['homeaddress', 'city', 'state', 'country', 'zipCode', 'postalcode'];

    if (!allowedFields.includes(field)) {
        return res.status(400).json({ error: 'Invalid field' });
    }

    try {
        const homeAddress = await HomeAddress.findOne({ where: { userId } });
        if (!homeAddress) {
            return res.status(404).json({ error: 'Home address not found' });
        }
        res.json({ [field]: homeAddress[field] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Specific Field by userId and field name
router.put('/:userId/:field', validateToken, async (req, res) => {
    const { userId, field } = req.params;
    const allowedFields = ['homeaddress', 'city', 'state', 'country', 'zipCode', 'postalcode'];

    if (!allowedFields.includes(field)) {
        return res.status(400).json({ error: 'Invalid field' });
    }

    try {
        const homeAddress = await HomeAddress.findOne({ where: { userId } });
        if (!homeAddress) {
            return res.status(404).json({ error: 'Home address not found' });
        }

        homeAddress[field] = req.body[field];
        await homeAddress.save();

        res.json(homeAddress);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete Specific Field by userId and field name
router.delete('/:userId/:field', validateToken, async (req, res) => {
    const { userId, field } = req.params;
    const allowedFields = ['homeaddress', 'city', 'state', 'country', 'zipCode', 'postalcode'];

    if (!allowedFields.includes(field)) {
        return res.status(400).json({ error: 'Invalid field' });
    }

    try {
        const homeAddress = await HomeAddress.findOne({ where: { userId } });
        if (!homeAddress) {
            return res.status(404).json({ error: 'Home address not found' });
        }

        homeAddress[field] = null;
        await homeAddress.save();

        res.json({ message: `Field ${field} deleted`, homeAddress });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete HomeAddress by userId
router.delete('/:userId', validateToken, async (req, res) => {
    try {
        const homeAddress = await HomeAddress.findOne({ where: { userId: req.params.userId } });
        if (!homeAddress) {
            return res.status(404).json({ error: 'Home address not found' });
        }
        await homeAddress.destroy();
        res.json({ message: 'Home address deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
