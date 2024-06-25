const express = require("express");
const router = express.Router();
const { User, Announcement } = require("../models");
const { Op } = require("sequelize");
const yup = require("yup");
const { validateToken } = require("../middlewares/auth");

