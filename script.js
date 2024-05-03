const taskInput = document.getElementById("taskInput");
const taskForm = document.getElementById("taskForm");
const tasksWrapper = document.getElementById("tasksWrapper");

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();
});

function addTask() {
  const taskContent = taskInput.value;
  if (!taskContent) {
    alert("Please input a task!");
    return;
  }

  const taskItem = createTaskItem(taskContent);
  tasksWrapper.appendChild(taskItem);

  TaskItemEventListeners(taskItem);

  saveTask();

  taskInput.value = "";
}

function createTaskItem(taskContent) {
  const taskItem = document.createElement("div");
  taskItem.classList.add("task-item");

  const checkboxContainer = document.createElement("div");
  checkboxContainer.classList.add("checkbox-container");
  taskItem.appendChild(checkboxContainer);

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkboxContainer.appendChild(checkBox);

  const taskText = document.createElement("span");
  taskText.textContent = taskContent;
  taskItem.appendChild(taskText);

  const controlButtons = document.createElement("div");
  controlButtons.classList.add("controls");
  taskItem.appendChild(controlButtons);

  const editButton = document.createElement("button");
  editButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
  editButton.classList.add("edit-button");
  controlButtons.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
  deleteButton.classList.add("delete-button");
  controlButtons.appendChild(deleteButton);

  return taskItem;
}

function TaskItemEventListeners(taskItem) {
  const checkBox = taskItem.querySelector('.checkbox-container input[type="checkbox"]');
  const editButton = taskItem.querySelector('.edit-button');
  const deleteButton = taskItem.querySelector('.delete-button');
  
  checkBox.addEventListener("click", function () {
    const taskText = taskItem.querySelector('span');
    taskText.classList.toggle("checked", checkBox.checked);
    saveTask();
  });

  editButton.addEventListener("click", function () {
    const taskText = taskItem.querySelector('span');
    taskText.contentEditable = true;
    taskText.focus();
    saveTask();
  });


  deleteButton.addEventListener("click", function () {
    tasksWrapper.removeChild(taskItem);
    saveTask();
  });
}

function saveTask() {
  localStorage.setItem("data", tasksWrapper.innerHTML);
}

function getTask() {
  tasksWrapper.innerHTML = localStorage.getItem("data");
  const taskItems = tasksWrapper.querySelectorAll(".task-item");
  taskItems.forEach(taskItem => {
    TaskItemEventListeners(taskItem);
  });
}

getTask();
