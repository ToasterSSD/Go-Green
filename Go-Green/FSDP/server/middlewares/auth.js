// middlewares/auth.js
const { verify } = require('jsonwebtoken');
const { User, ExtraUserInfo } = require('../models');
require('dotenv').config();

// Middleware to validate JWT token and extract user info
const validateToken = (req, res, next) => {
  try {
    const accessToken = req.header("Authorization")?.split(" ")[1];
    if (!accessToken) {
      return res.sendStatus(401);
    }

    const payload = verify(accessToken, process.env.APP_SECRET);
    req.user = payload; // Attach the user payload to the request object
    next();
  } catch (err) {
    return res.sendStatus(401);
  }
};

// Middleware to check if the authenticated user is an admin
const checkAdminRole = async (req, res, next) => {
  const userId = req.user.id; // Access the user info from the request object
  const user = await User.findByPk(userId);

  if (user && user.roles && user.roles.includes("ADMIN")) {
    return next(); // Allow access if the user is an admin
  }

  return res.status(403).json({ message: "You do not have the required permissions" });
};

// Middleware to ensure the user can only access their own data
const validateUserAccess = async (req, res, next) => {
  const { id } = req.params; // Assume `id` is the `ExtraUserInfo` ID
  const userId = req.user.id;

  const extraUserInfo = await ExtraUserInfo.findByPk(id);
  if (!extraUserInfo || extraUserInfo.userId !== userId) {
    return res.status(403).json({ message: "Unauthorized access" });
  }

  req.extraUserInfo = extraUserInfo; // Attach the `ExtraUserInfo` to the request object
  next();
};

module.exports = { validateToken, checkAdminRole, validateUserAccess };
