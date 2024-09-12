let users = [
    { username: 'admin1', password: 'admin123', role: 'admin' },
    { username: 'employee1', password: 'employee123', role: 'employee' }
];

let tasks = []; // Store tasks for employees

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

logoutBtn.addEventListener('click', function() {
    adminDashboard.style.display = 'none';
    loginPage.style.display = 'block';
});

logoutEmployeeBtn.addEventListener('click', function() {
    employeeDashboard.style.display = 'none';
    loginPage.style.display = 'block';
});

// Function to handle login
function login(username, password) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        if (user.role === 'admin') {
            showAdminDashboard();
        } else {
            showEmployeeDashboard(username);
        }
    } else {
        loginError.textContent = 'Invalid login credentials';
    }
}

// Show Admin Dashboard
function showAdminDashboard() {
    loginPage.style.display = 'none';
    adminDashboard.style.display = 'block';
    contactSection.style.display = 'none';
    employeeDashboard.style.display = 'none';
    updateEmployeeList();
}

// Show Employee Dashboard
function showEmployeeDashboard(username) {
    loginPage.style.display = 'none';
    employeeDashboard.style.display = 'block';
    adminDashboard.style.display = 'none';
    contactSection.style.display = 'none';
    document.getElementById('employee-name-display').textContent = username;
    updateEmployeeTaskList(username);
}

// Update the list of employees and tasks for Admin
function updateEmployeeList() {
    employeeList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-card';
        li.innerHTML = `
            <p><strong>${task.employee}</strong>: ${task.task}</p>
            <button onclick="deleteTask('${task.id}')">Delete</button>
        `;
        employeeList.appendChild(li);
    });
}

// Add a task to the employee's task list
function addTaskToEmployee(employee, taskName) {
    const taskId = new Date().getTime(); // Simple unique ID
    tasks.push({ id: taskId, employee, task: taskName });
    updateEmployeeList();
}

// Update employee's task list for the logged-in employee
function updateEmployeeTaskList(username) {
    employeeTaskList.innerHTML = '';
    tasks.filter(task => task.employee === username).forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-card';
        li.innerHTML = `
            <p>${task.task}</p>
        `;
        employeeTaskList.appendChild(li);
    });
}

// Delete a task
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    updateEmployeeList();
}
