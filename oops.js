class Task {
  constructor(title, description, category, dueDate, status) {
    this.title = title;
    this.description = description || "No description";
    this.category = category || "General";
    this.dueDate = dueDate || "";
    this.status = status || "Pending";
  }

  isOverdue() {
    if (!this.dueDate) return false;
    const today = new Date();
    const due = new Date(this.dueDate);
    return due < today && this.status !== "Completed";
  }
}
const taskList = [];
const taskListUI = document.getElementById("taskList");
const summaryUI = document.getElementById("dashboardSummary");

function addTask() {
  const title = document.getElementById("taskInput").value.trim();
  const description = document.getElementById("taskDesc").value.trim();
  const category = document.getElementById("taskCategory").value;
  const dueDate = document.getElementById("taskDate").value;
  const status = document.getElementById("taskStatus").value;

  if (!title) {
    alert("Task title is required!");
    return;
  }

  const newTask = new Task(title, description, category, dueDate, status);

  taskList.push(newTask);
  displayTasks();
  updateSummary();

  // Clear input fields
  document.getElementById("taskInput").value = "";
  document.getElementById("taskDesc").value = "";
  document.getElementById("taskCategory").value = "";
  document.getElementById("taskDate").value = "";
  document.getElementById("taskStatus").value = "Pending";
}

function displayTasks() {
  taskListUI.innerHTML = "";

  taskList.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item", "p-3");

    li.innerHTML = `
            <h5>${task.title}</h5>
            <p>${task.description}</p>
            <span class="badge bg-info">${task.category}</span>
            <br>
            <small>Due: ${task.dueDate || "No date"}</small><br>
            <small>Status: ${task.status}</small><br>
            ${
              task.isOverdue()
                ? <span class="badge bg-danger mt-2">Overdue</span>
                : ""
            }
        `;

    taskListUI.appendChild(li);
  });
}

function updateSummary() {
  const total = taskList.length;
  const completed = taskList.filter((t) => t.status === "Completed").length;
  const pending = taskList.filter((t) => t.status === "Pending").length;
  const overdue = taskList.filter((t) => t.isOverdue()).length;

  summaryUI.innerHTML = `
        <p><strong>Total Tasks:</strong> ${total}</p>
        <p><strong>Completed:</strong> ${completed}</p>
        <p><strong>Pending:</strong> ${pending}</p>
        <p><strong>Overdue:</strong> ${overdue}</p>
    `;
}

document.getElementById("addTaskBtn").addEventListener("click", addTask);