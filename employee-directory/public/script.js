document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('employee-container');
    const loading = document.getElementById('loading');

    fetch('/api/employees')
        .then(response => response.json())
        .then(employees => {
            loading.style.display = 'none';
            container.innerHTML = employees.map(employee => `
                <div class="employee-card">
                    <img src="${employee.profileImage}" 
                         alt="${employee.name}" 
                         class="profile-image">
                    <h2>${employee.name}</h2>
                    <div class="employee-info">
                        <p><strong>Designation:</strong> ${employee.designation}</p>
                        <p><strong>Department:</strong> ${employee.department}</p>
                        <p><strong>Salary:</strong> $${employee.salary.toLocaleString()}</p>
                    </div>
                </div>
            `).join('');
        })
        .catch(error => {
            loading.textContent = 'Error loading employee data';
            console.error('Error:', error);
        });
});