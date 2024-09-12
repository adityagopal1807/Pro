let users = [
    { username: 'admin1', password: 'admin123', role: 'admin' },
    { username: 'employee1', password: 'employee123', role: 'employee' }
];

// Elements
const loginPage = document.getElementById('login-page');
const adminDashboard = document.getElementById('admin-dashboard');
const employeeDashboard = document.getElementById('employee-dashboard');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');

// Function to switch dashboards based on role
function login(username, password) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        if (user.role === 'admin') {
            showAdminDashboard();
        } else {
            showEmployeeDashboard(user.username);
        }
    } else {
        loginError.textContent = 'Invalid login credentials';
    }
}

// Show Admin Dashboard
function showAdminDashboard() {
    loginPage.style.display = 'none';
    adminDashboard.style.display = 'block';
    updateEmployeeList();
}

// Show Employee Dashboard
function showEmployeeDashboard(username) {
    loginPage.style.display = 'none';
    employeeDashboard.style.display = 'block';
    document.getElementById('employee-name-display').textContent = username;
    updateEmployeeTaskList(username);
}

// Event listeners for login
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    login(username, password);
});

// Logout functionality for Admin
document.getElementById('logout').addEventListener('click', function() {
    adminDashboard.style.display = 'none';
    loginPage.style.display = 'block';
});

// Logout functionality for Employee
document.getElementById('logout-employee').addEventListener('click', function() {
    employeeDashboard.style.display = 'none';
    loginPage.style.display = 'block';
});

// Add employee tasks (stored in localStorage for now)
document.getElementById('add-employee-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const employeeName = document.getElementById('employee-name').value;
    const employeeTask = document.getElementById('employee-task').value;

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ name: employeeName, task: employeeTask });
    localStorage.setItem('tasks', JSON.stringify(tasks));

    updateEmployeeList();
});

// Update employee task list for Admin
function updateEmployeeList() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const employeeList = document.getElementById('employee-list');
    employeeList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = `${task.name}: ${task.task}`;
        employeeList.appendChild(li);
    });
}

// Update task list for Employee based on the logged-in user
function updateEmployeeTaskList(username) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const employeeTaskList = document.getElementById('employee-task-list');
    employeeTaskList.innerHTML = '';

    tasks.filter(task => task.name === username).forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.task;
        employeeTaskList.appendChild(li);
    });
}

// Initialize the task list for the Admin Dashboard
updateEmployeeList();
// Show the Contact section (Admin only)
document.getElementById('contact-btn').addEventListener('click', function() {
    adminDashboard.style.display = 'none';
    document.getElementById('contact-section').style.display = 'block';
});

// Go back to Admin Dashboard from Contact section
document.getElementById('contact-back-btn').addEventListener('click', function() {
    document.getElementById('contact-section').style.display = 'none';
    adminDashboard.style.display = 'block';
});
