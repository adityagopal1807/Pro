document.addEventListener('DOMContentLoaded', () => {
    const loginPage = document.getElementById('login-page');
    const adminDashboard = document.getElementById('admin-dashboard');
    const employeeDashboard = document.getElementById('employee-dashboard');
    const errorMessage = document.getElementById('error-message');
    const taskList = document.getElementById('task-list');
    const employeeTaskList = document.getElementById('employee-task-list');
    const userList = document.getElementById('user-list');
    const employeeDetails = document.getElementById('employee-details');

    const localStorage = window.localStorage;

    // Check if the user is logged in
    function checkLogin() {
        const user = localStorage.getItem('user');
        if (user) {
            if (user === 'admin') {
                loginPage.classList.add('hidden');
                adminDashboard.classList.remove('hidden');
                loadTasks();
                loadUsers();
            } else {
                loginPage.classList.add('hidden');
                employeeDashboard.classList.remove('hidden');
                loadEmployeeTasks();
                loadEmployeeDetails();
            }
        }
    }

    // Handle login
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simple authentication logic
        if (username === 'admin' && password === 'admin') {
            localStorage.setItem('user', 'admin');
            loginPage.classList.add('hidden');
            adminDashboard.classList.remove('hidden');
            loadTasks();
            loadUsers();
        } else if (username === 'employee' && password === 'employee') {
            localStorage.setItem('user', 'employee');
            loginPage.classList.add('hidden');
            employeeDashboard.classList.remove('hidden');
            loadEmployeeTasks();
            loadEmployeeDetails();
        } else {
            errorMessage.textContent = 'Invalid credentials';
        }
    });

    // Handle logout
    function logout() {
        localStorage.removeItem('user');
        loginPage.classList.remove('hidden');
        adminDashboard.classList.add('hidden');
        employeeDashboard.classList.add('hidden');
    }

    document.getElementById('logout').addEventListener('click', logout);
    document.getElementById('logout-employee').addEventListener('click', logout);

    // Add task
    document.getElementById('add-task').addEventListener('click', () => {
        const taskInput = document.getElementById('task-input');
        const task = taskInput.value;
        if (task) {
            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            taskInput.value = '';
            loadTasks();
        }
    });

    // Load tasks
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = task;
            taskList.appendChild(li);
        });
    }

    // Add user
    document.getElementById('add-user').addEventListener('click', () => {
        const userInput = document.getElementById('user-input');
        const user = userInput.value;
        if (user) {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            userInput.value = '';
            loadUsers();
        }
    });

    // Load users
    function loadUsers() {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        userList.innerHTML = '';
        users.forEach((user, index) => {
            const li = document.createElement('li');
            li.textContent = user;
            userList.appendChild(li);
        });
    }

    // Load employee tasks
    function loadEmployeeTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        employeeTaskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = task;
            employeeTaskList.appendChild(li);
        });
    }

    // Load employee details
    function loadEmployeeDetails() {
        const details = localStorage.getItem('employeeDetails') || 'No details available.';
        employeeDetails.textContent = details;
    }

    // Update employee details
    document.getElementById('update-details').addEventListener('click', () => {
        const newDetails = prompt('Enter new details:');
        if (newDetails) {
            localStorage.setItem('employeeDetails', newDetails);
            loadEmployeeDetails();
        }
    });

    // Initial check
    checkLogin();
});
