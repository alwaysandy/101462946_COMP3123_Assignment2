const employeeModel = require("../models/EmployeesModel");
const express = require('express');
const {body, query, param, validationResult} = require('express-validator');
const employeeRoutes = express.Router();

const firstNameValidation = () => body('first_name')
    .trim().notEmpty().withMessage('Must include first name');
const lastNameValidation = () => body('last_name')
    .trim().notEmpty().withMessage('Must include last name');
const emailValidation = () => body('email')
    .trim().notEmpty().withMessage('Must include email').bail()
    .isEmail().withMessage('Invalid email address');
const positionValidation = () => body('position')
    .trim().notEmpty().withMessage('Must include position');
const salaryValidation = () => body('salary')
    .notEmpty().withMessage('Must include salary').bail()
    .isNumeric().withMessage('Salary must be a number').bail()
    .isInt({min: 0}).withMessage('Salary must be positive');
const dateOfJoiningValidation = () => body('date_of_joining')
    .notEmpty().withMessage('Must include date of joining').bail()
    .isISO8601().toDate().withMessage('Date of joining must be a date');
const departmentValidation = () => body('department')
    .trim().notEmpty().withMessage('Must include department');

const mongoIdParamValidation = () => param('employeeId')
    .isMongoId().withMessage("Parameter must be valid MongoDB ID");


employeeRoutes.get('/', async (req, res) => {
    let filter = {};
    if (req.query.q) {
        const regex = new RegExp(req.query.q, 'i');
        filter = {
            $or: [
                { department: { $regex: regex } },
                { position: { $regex: regex }},
            ]
        }
    }
    try {
        const employees = await employeeModel.find(filter);
        return res.send(employees);
    } catch (err) {
        return res.status(400).send({
            message: err.message
        });
    }
});

employeeRoutes.post('/', [
    firstNameValidation(),
    lastNameValidation(),
    emailValidation(),
    positionValidation(),
    salaryValidation(),
    dateOfJoiningValidation(),
    departmentValidation()
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send(
            result.array().map(error => error.msg)
        );
    }

    const employee = new employeeModel(req.body);
    try {
        const newEmployee = await employee.save();
        return res.status(201).send({
            message: "Employee created successfully",
            employee_id: newEmployee._id,
        });
    } catch (err) {
        return res.status(500).send(
            err.message
        );
    }
});

employeeRoutes.get('/:employeeId', mongoIdParamValidation(), async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send(
            result.array().map(error => error.msg)
        );
    }

    try {
        const employee = await employeeModel.findById(req.params.employeeId)
        return res.send(employee);
    } catch (err) {
        return res.status(500).send(
            err.message
        )
    }
});

employeeRoutes.put('/:employeeId', [
    mongoIdParamValidation(),
    firstNameValidation().optional(),
    lastNameValidation().optional(),
    emailValidation().optional(),
    positionValidation().optional(),
    salaryValidation().optional(),
    dateOfJoiningValidation().optional(),
    departmentValidation().optional()
],
async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send(
            result.array().map(error => error.msg)
        );
    }

    try {
        await employeeModel.findByIdAndUpdate(req.params.employeeId, req.body)
        return res.status(200).send({
            message: "Employee details updated successful."
        });
    } catch (err) {
        return res.status(500).send({
            message: err.message
        })
    }
});

employeeRoutes.delete('/',
    query('eid')
        .isMongoId().withMessage("Parameter must be valid MongoDB ID"), 
    async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send(
            result.array().map(error => error.msg)
        );
    }

    try {
        await employeeModel.findByIdAndDelete(req.query.eid)
        return res.status(200).send({
            message: "Employee deleted successfully."
        });
    } catch (err) {
        return res.status(500).send(
            err.message
        )
    }
});

module.exports = employeeRoutes;