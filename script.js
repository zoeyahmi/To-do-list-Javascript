const taskInput = document.getElementById("taskInput");
const taskForm = document.getElementById("taskForm");
const tasksWrapper = document.getElementById("tasksWrapper");
taskForm.addEventListener("submit", function (event) {
  event.preventDefault();
 
});

function addTask() {
  if (taskInput.value === "") {
    alert("Please input a task!");
  } else {

    let taskItem = document.createElement("div");
    taskItem.className = "task-item";

    let checkboxContainer = document.createElement("div");
    checkboxContainer.className = "checkbox-container";
    taskItem.appendChild(checkboxContainer);

    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.onclick = function () {
      if (checkBox.checked) {
        taskText.classList.add("checked");
      } else {
        taskText.classList.remove("checked");
      }
    
    };
    checkboxContainer.appendChild(checkBox);

    let taskText = document.createElement("span");
    taskText.innerHTML = taskInput.value;
    taskItem.appendChild(taskText);

    let controlButtons = document.createElement("div");
    controlButtons.className = "controls";
    taskItem.appendChild(controlButtons);

    let editButton = document.createElement("button");
    editButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
    editButton.className = "edit-button";
    editButton.onclick = function () {
      taskText.contentEditable = true;
     taskText.focus();
    };
    controlButtons.appendChild(editButton);

    taskText.onblur = function () {
      taskText.contentEditable = false;
    };

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
    deleteButton.className = "delete-button";
    deleteButton.onclick = function () {
      tasksWrapper.removeChild(taskItem);
     
    };

    controlButtons.appendChild(deleteButton);

    tasksWrapper.appendChild(taskItem);
  }
 

  taskInput.value = "";
}

function saveData() {
  localStorage.setItem("data", tasksWrapper.innerHTML);
}

function getData() {
  tasksWrapper.innerHTML = localStorage.getItem("data");
}


