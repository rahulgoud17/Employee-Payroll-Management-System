
const express = require('express');
const db = require('./JS/db');
const path = require('path');

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'HTML')));

// Employee routes
const employeeRoutes = require('./JS/employees');
app.use('/api/employees', employeeRoutes);
const salaryRoutes = require('./JS/salary');
app.use('/api/salary', salaryRoutes);
const payrollRoutes = require('./JS/payroll');
app.use('/api/payroll', payrollRoutes);

app.listen(3000, () => {
    console.log('Server Running on port 3000');
});
app.use('/js', express.static(path.join(__dirname, 'JS')));