// Elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Data
let tasks = [];

// Functions
function renderTasks() {
  // Clear the task list and render all tasks from the 'tasks' array
  taskList.innerHTML = ''
  tasks.forEach(task => {
    const li = document.createElement('li');

    li.classList.add("task-item");
    li.id = task.id;
    
    if (task.is_toggled) {
      li.classList.add('completed');
    }
    
    li.appendChild(createToggleBtn(task));
    li.appendChild(createTitleSpan(task));
    li.appendChild(createDeleteBtn(task));
    taskList.appendChild(li);
  })
}

function createToggleBtn(task) {
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'toggle-btn';
  toggleBtn.addEventListener('click', () => toggleTask(task.id));

  if (task.is_toggled) {
    toggleBtn.classList.add('completed');
  }
  return toggleBtn;
}

function createTitleSpan(task) {
  const titleSpan = document.createElement('span');
  titleSpan.textContent = task.title;
  titleSpan.className = 'task-title';
  return titleSpan;
}

function createDeleteBtn(task) {
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '🗑️';
  deleteBtn.addEventListener('click', () => deleteTask(task.id));
  return deleteBtn;
}

function addTask(title) {
  // Add a new task object to the tasks array and update localStorage
  const task = {
    id: Date.now(),
    title: title,
    is_toggled: false
  }
  tasks.push(task);
  saveTasks();
  renderTasks();
}

function toggleTask(id) {
  // Toggle 'completed' for a given task
  for (let task of tasks) {
    if (task.id == id) {
      task.is_toggled = !task.is_toggled;
      break;
    }
  }
  renderTasks();
}

function deleteTask(id) {
  console.log(`Delete Task Called for id: ${id}`)
  // Remove the task with given id from the tasks array
  let newTasks = tasks.filter(task => task.id != id);
  tasks = newTasks;
  saveTasks();
  renderTasks()
}

function saveTasks() {
  // Save tasks to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  // Load tasks from localStorage and update the 'tasks' array
  tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  console.log(tasks)
}

// Event Listeners
addTaskBtn.addEventListener('click', () => {
  const title = taskInput.value.trim();
  if (title) {
    addTask(title);
    console.log(taskInput.value);
    taskInput.value = '';
  }
});

taskInput.addEventListener('keydown', (event) => {
  if (event.key == 'Enter') {
    const title = taskInput.value.trim();
    if (title) {
      addTask(title);
      console.log(taskInput.value);
      taskInput.value = '';
    }
  }
});

// Init
loadTasks();
renderTasks();
