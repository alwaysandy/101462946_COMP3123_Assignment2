const userModel = require("../models/UsersModel");
const express = require('express');
const {body, validationResult} = require('express-validator');
const userRoutes = express.Router();

userRoutes.post('/signup', [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username is required'),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .bail()
        .isEmail()
        .withMessage('Invalid email format'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required')
        .bail()
        .isLength({min:6})
        .withMessage('Password must be minimum 6 characters')
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send({
            status: false,
            message: result.array().map(error => error.msg)
        });
    }

    const user = new userModel(req.body);
    try {
        const newUser = await user.save();
        return res.status(201).send({
            message: "User created successfully",
            user_id: newUser._id
        });
    } catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message
        });
    }
});

userRoutes.post('/login', [
    body('username')
        .trim()
        .notEmpty(),
    body('password')
        .trim()
        .notEmpty()
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send({
            status: false,
            message: "Invalid username or password"
        });
    }

    try {
        const user = await userModel.findOne({username: req.body.username});
        const isMatch = await user.comparePassword(req.body.password);
        if (!isMatch) {
            return res.status(400).send({
                status: false,
                message: "Invalid username or password"
            });
        }

        return res.status(200).send({
            message: "Login successful"
        });
    } catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message
        });
    }
});

module.exports = userRoutes;