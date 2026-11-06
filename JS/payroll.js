const express = require('express');
const router = express.Router();
const db = require('./db');

// Display payroll records
router.get('/', (req, res) => {
    const sql = `
        SELECT p.*, e.name, s.net_salary
        FROM payroll p
        JOIN Employees e ON p.employee_id = e.employee_id
        JOIN salary_details s ON p.salary_id = s.salary_id
    `;

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

// Create payroll
router.post('/', (req, res) => {
    const {
        employee_id, salary_id, month,
        year, payment_date, payment_status
    } = req.body;

    const sql = `
        INSERT INTO payroll
        (employee_id, salary_id, month, year, payment_date, payment_status)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql,
        [employee_id, salary_id, month, year, payment_date, payment_status],
        (err, result) => {
            if (err) return res.status(500).json(err);

            res.status(201).json({
                message: 'Payroll record created successfully',
                payroll_id: result.insertId
            });
        }
    );
});

module.exports = router;