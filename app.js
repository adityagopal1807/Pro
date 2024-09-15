let users = [
    { username: 'admin1', password: 'admin123', role: 'admin' },
    { username: 'employee1', password: 'employee123', role: 'employee' }
];

let tasks = [];

// Elements
const loginPage = document.getElementById('login-page');
const adminDashboard = document.getElementById('admin-dashboard');
const employeeDashboard = document.getElementById('employee-dashboard');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const employeeList = document.getElementById('employee-list');
const employeeTaskList = document.getElementById('employee-task-list');
const contactSection = document.getElementById('contact-section');
const contactBtn = document.getElementById('contact-btn');
const contactBackBtn = document.getElementById('contact-back-btn');
const addEmployeeForm = document.getElementById('add-employee-form');
const employeeNameInput = document.getElementById('employee-name');
const employeeTaskInput = document.getElementById('employee-task');
const logoutBtn = document.getElementById('logout');
const logoutEmployeeBtn = document.getElementById('logout-employee');

// Load tasks from LocalStorage
function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
}

// Save tasks to LocalStorage
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event Listeners
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    login(username, password);
});

addEmployeeForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskName = employeeTaskInput.value;
    const employeeName = employeeNameInput.value;

    if (taskName && employeeName) {
        addTaskToEmployee(employeeName, taskName);
        employeeNameInput.value = '';
        employeeTaskInput.value = '';
    }
});

contactBtn.addEventListener('click', function() {
    adminDashboard.style.display = 'none';
    contactSection.style.display = 'block';
});

contactBackBtn.addEventListener('click', function() {
    contactSection.style.display = 'none';
    adminDashboard.style.display = 'block';
});

logoutBtn.add
