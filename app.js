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
const employeeList = document.getElementById('employee-list');
const employeeTaskList = document.getElementById('employee-task-list');

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
    document.getElementBy
