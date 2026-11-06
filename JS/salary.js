const express = require('express');
const router = express.Router();
const db = require('./db');

// Display salary records
router.get('/', (req, res) => {
    const sql = `
        SELECT s.*, e.name
        FROM salary_details s
        JOIN Employees e ON s.employee_id = e.employee_id
    `;

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

// Add salary details
router.post('/', (req, res) => {
    const { employee_id, basic_salary, allowance, deduction } = req.body;

    const net_salary =
        Number(basic_salary) + Number(allowance) - Number(deduction);

    const sql = `
        INSERT INTO salary_details
        (employee_id, basic_salary, allowance, deduction, net_salary)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql,
        [employee_id, basic_salary, allowance, deduction, net_salary],
        (err, result) => {
            if (err) return res.status(500).json(err);

            res.status(201).json({
                message: 'Salary details added successfully',
                salary_id: result.insertId,
                net_salary
            });
        }
    );
});

module.exports = router;