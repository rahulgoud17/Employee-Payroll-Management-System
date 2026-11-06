const form = document.getElementById('salaryForm');
const table = document.getElementById('salaryTable');
const message = document.getElementById('message');

async function loadSalary() {
    const response = await fetch('/api/salary');
    const records = await response.json();

    table.innerHTML = '';

    records.forEach(s => {
        const row = document.createElement('tr');

        [s.salary_id, s.employee_id, s.name,
         s.basic_salary, s.allowance, s.deduction, s.net_salary]
        .forEach(value => {
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
        basic_salary: document.getElementById('basic_salary').value,
        allowance: document.getElementById('allowance').value,
        deduction: document.getElementById('deduction').value
    };

    const response = await fetch('/api/salary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    message.textContent = result.message || 'Something went wrong';

    if (response.ok) {
        form.reset();
        loadSalary();
    }
});

loadSalary();