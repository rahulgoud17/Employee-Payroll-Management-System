const form = document.getElementById('payrollForm');
const table = document.getElementById('payrollTable');
const message = document.getElementById('message');

async function loadPayroll() {
    const response = await fetch('/api/payroll');
    const records = await response.json();

    table.innerHTML = '';

    records.forEach(p => {
        const row = document.createElement('tr');

        [
            p.payroll_id,
            p.employee_id,
            p.name,
            p.salary_id,
            p.month,
            p.year,
            p.net_salary,
            p.payment_date,
            p.payment_status
        ].forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });

        table.appendChild(row);
    });
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        employee_id: document.getElementById('employee_id').value,
        salary_id: document.getElementById('salary_id').value,
        month: document.getElementById('month').value,
        year: document.getElementById('year').value,
        payment_date: document.getElementById('payment_date').value,
        payment_status: document.getElementById('payment_status').value
    };

    const response = await fetch('/api/payroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    message.textContent = result.message || 'Something went wrong';

    if (response.ok) {
        form.reset();
        loadPayroll();
    }
});

loadPayroll();