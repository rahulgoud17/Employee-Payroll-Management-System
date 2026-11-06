const form = document.getElementById('employeeForm');
const table = document.getElementById('employeeTable');
const message = document.getElementById('message');

async function loadEmployees() {
    const response = await fetch('/api/employees');
    const employees = await response.json();

    table.innerHTML = '';

    employees.forEach(emp => {
        const row = document.createElement('tr');

        [emp.employee_id, emp.name, emp.department,
         emp.designation, emp.joining_date]
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

    const employee = {
        name: document.getElementById('name').value,
        department: document.getElementById('department').value,
        designation: document.getElementById('designation').value,
        joining_date: document.getElementById('joining_date').value
    };

    const response = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee)
    });

    const result = await response.json();
    message.textContent = result.message;

    if (response.ok) {
        form.reset();
        loadEmployees();
    }
});

loadEmployees();