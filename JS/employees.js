
const express = require('express');
const router = express.Router();
const db = require('./db');

// GET: Display all employees
router.get('/', (req, res) => {

    const sql = 'SELECT * FROM Employees';

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });

});

// POST: Add a new employee
router.post('/', (req, res) => {

    const { name, department, designation, joining_date } = req.body;

    if (!name || !department || !designation || !joining_date) {
        return res.status(400).json({
            message: 'Please fill all employee details'
        });
    }

    const sql = `INSERT INTO Employees
    (name, department, designation, joining_date)
    VALUES (?, ?, ?, ?)`;

    db.query(sql,
        [name, department, designation, joining_date],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                message: 'Employee added successfully',
                employee_id: result.insertId
            });

        }
    );

});

module.exports = router;
