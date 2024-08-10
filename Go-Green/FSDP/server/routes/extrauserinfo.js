// server/routes/extrauserinfo.js
const express = require('express');
const { ExtraUserInfo } = require('../models');
const { validateToken, validateUserAccess } = require('../middlewares/auth');
const yup = require('yup');

const router = express.Router();

// Get ExtraUserInfo for the logged-in user
router.get('/:id', validateToken, validateUserAccess, (req, res) => {
  res.json(req.extraUserInfo);
});

// Update ExtraUserInfo for the logged-in user
router.put('/:id', validateToken, validateUserAccess, async (req, res) => {
  const schema = yup.object().shape({
    displayName: yup.string().trim().min(3).max(63),
    phoneNumber: yup.string().trim().max(20),
    gender: yup.string().trim().max(10).nullable(),
    age: yup.number().integer().nullable(),
    dateOfBirth: yup.date().nullable(),
    socialMedia: yup.string().trim().max(255),
    bio: yup.string().trim().max(255).nullable(),
    profilePicture: yup.string().trim().max(255).nullable(),
  });

  try {
    const validatedData = await schema.validate(req.body, { abortEarly: false });
    await req.extraUserInfo.update(validatedData);
    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(400).json({ errors: error.errors });
  }
});

// Create ExtraUserInfo for the logged-in user (only if it doesn't exist)
router.post('/', validateToken, async (req, res) => {
  const userId = req.user.id;

  const existingInfo = await ExtraUserInfo.findOne({ where: { userId } });
  if (existingInfo) {
    return res.status(400).json({ message: "Profile already exists" });
  }

  const schema = yup.object().shape({
    displayName: yup.string().trim().min(3).max(63).required(),
    phoneNumber: yup.string().trim().max(20).required(),
    gender: yup.string().trim().max(10).nullable(),
    age: yup.number().integer().nullable(),
    dateOfBirth: yup.date().nullable(),
    socialMedia: yup.string().trim().max(255).required(),
    bio: yup.string().trim().max(255).nullable(),
    profilePicture: yup.string().trim().max(255).nullable(),
  });

  try {
    const validatedData = await schema.validate(req.body, { abortEarly: false });
    validatedData.userId = userId;
    const newExtraUserInfo = await ExtraUserInfo.create(validatedData);
    res.json(newExtraUserInfo);
  } catch (error) {
    res.status(400).json({ errors: error.errors });
  }
});

module.exports = router;
