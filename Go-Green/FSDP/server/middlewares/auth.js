// middlewares/auth.js
const { verify } = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const validateToken = (req, res, next) => {
  try {
    const accessToken = req.header("Authorization").split(" ")[1];
    if (!accessToken) {
      return res.sendStatus(401);
    }

    const payload = verify(accessToken, process.env.APP_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return res.sendStatus(401);
  }
};

const checkAdminRole = async (req, res, next) => {
  const userId = req.user.id; // assuming you have user info in req.user
  const user = await User.findByPk(userId);

  if (user && user.roles && user.roles.includes("ADMIN")) {
    return next();
  }

  return res
  .status(403)
  .json({ message: "You do not have the required permissions" });
};

module.exports = { validateToken, checkAdminRole };
