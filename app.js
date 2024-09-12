// Initialize users and tasks if not already in localStorage
if (!localStorage.getItem('users')) {
  const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "employee", password: "employee123", role: "employee" }
  ];
  localStorage.setItem('users', JSON.stringify(users));
}

if (!localStorage.getItem('tasks')) {
  const tasks = [
    { task: "Review the financial report", assignedTo: "admin" },
    { task: "Prepare meeting agenda", assignedTo: "employee" }
  ];
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listener for login
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const users = JSON.parse(localStorage.getItem('users')); // Fetch users from localStorage
  
  const user = users.find(user => user.username === username && user.password === password);
  
  if (user) {
    if (user.role === "admin") {
      showPage("admin-dashboard");
      displayTasks("admin");
    } else {
      showPage("employee-dashboard");
      displayTasks("employee");
    }
  } else {
    document.getElementById("error-msg").textContent = "Invalid credentials!";
  }
});

// Show page by id
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
  document.getElementById(pageId).style.display = 'block';
}

// Display tasks based on role
function displayTasks(role) {
  const tasks = JSON.parse(localStorage.getItem('tasks')); // Fetch tasks from localStorage
  const taskList = role === "admin" ? document.getElementById("task-list") : document.getElementById("employee-task-list");
  taskList.innerHTML = '';
  
  tasks
    .filter(task => task.assignedTo === role)
    .forEach(task => {
      const li = document.createElement('li');
      li.textContent = task.task;
      taskList.appendChild(li);
    });
}

// Add task for Admin
document.getElementById("add-task-btn").addEventListener("click", function () {
  const newTask = document.getElementById("new-task").value;
  if (newTask) {
    let tasks = JSON.parse(localStorage.getItem('tasks')); // Fetch tasks from localStorage
    tasks.push({ task: newTask, assignedTo: "admin" });
    localStorage.setItem('tasks', JSON.stringify(tasks));  // Save updated tasks to localStorage
    displayTasks("admin");
    document.getElementById("new-task").value = "";
  }
});

// Logout functionality
document.getElementById("logout-btn").addEventListener("click", function () {
  showPage("login-page");
});

document.getElementById("logout-btn-employee").addEventListener("click", function () {
  showPage("login-page");
});
