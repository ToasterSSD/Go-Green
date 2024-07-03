// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const { Admin } = require('../models'); // Use Admin model
// const yup = require("yup");
// const { sign } = require('jsonwebtoken');
// const { validateAdminToken } = require('../middlewares/auth'); // Admin-specific middleware
// require('dotenv').config();

// // Admin registration
// router.post("/admin/register", async (req, res) => {
//     let data = req.body;
//     let validationSchema = yup.object({
//         name: yup.string().trim().min(3).max(50).required()
//             .matches(/^[a-zA-Z '-,.]+$/, "name only allow letters, spaces and characters: ' - , ."),
//         email: yup.string().trim().lowercase().email().max(50).required(),
//         password: yup.string().trim().min(8).max(50).required()
//             .matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/, "password at least 1 letter and 1 number"),
//         isAdmin: yup.boolean().required() // Ensure isAdmin field is present and boolean
//     });
//     try {
//         data = await validationSchema.validate(data, { abortEarly: false });

//         // Check if admin email already exists
//         let admin = await Admin.findOne({
//             where: { email: data.email }
//         });
//         if (admin) {
//             res.status(400).json({ message: "Email already exists." });
//             return;
//         }

//         // Hash password
//         data.password = await bcrypt.hash(data.password, 10);
//         // Create admin
//         let result = await Admin.create(data);
//         res.json({
//             message: `Admin ${result.email} was registered successfully.`
//         });
//     } catch (err) {
//         res.status(400).json({ errors: err.errors });
//     }
// });

// // Admin login
// router.post("/admin/login", async (req, res) => {
//     let data = req.body;
//     let validationSchema = yup.object({
//         email: yup.string().trim().lowercase().email().max(50).required(),
//         password: yup.string().trim().min(8).max(50).required()
//     });
//     try {
//         data = await validationSchema.validate(data, { abortEarly: false });

//         let errorMsg = "Email or password is not correct.";
//         let admin = await Admin.findOne({
//             where: { email: data.email }
//         });
//         if (!admin) {
//             res.status(400).json({ message: errorMsg });
//             return;
//         }
//         let match = await bcrypt.compare(data.password, admin.password);
//         if (!match) {
//             res.status(400).json({ message: errorMsg });
//             return;
//         }

//         // Return admin info
//         let adminInfo = {
//             id: admin.id,
//             email: admin.email,
//             name: admin.name
//         };
//         let accessToken = sign(adminInfo, process.env.ADMIN_APP_SECRET, { expiresIn: process.env.ADMIN_TOKEN_EXPIRES_IN });
//         res.json({
//             accessToken: accessToken,
//             admin: adminInfo
//         });
//     } catch (err) {
//         res.status(400).json({ errors: err.errors });
//     }
// });

// // Admin authentication
// router.get("/admin/auth", validateAdminToken, (req, res) => {
//     let adminInfo = {
//         id: req.admin.id,
//         email: req.admin.email,
//         name: req.admin.name
//     };
//     res.json({
//         admin: adminInfo
//     });
// });

// module.exports = router;