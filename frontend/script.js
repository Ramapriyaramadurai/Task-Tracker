const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

const API_URL = "http://localhost:5000/tasks";

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const taskName = taskInput.value.trim();
  if (taskName === "") return;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: taskName }),
  });

  const newTask = await response.json();
  addTaskToUI(newTask);
  taskInput.value = "";
});

async function loadTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();
  tasks.forEach(addTaskToUI);
}

function addTaskToUI(task) {
  const li = document.createElement("li");
  li.textContent = task.name;

  const delBtn = document.createElement("button");
  delBtn.textContent = "🗑️";
  delBtn.style.marginLeft = "10px";
  delBtn.style.background = "#c084fc"; // light purple
  delBtn.style.color = "white";
  delBtn.style.border = "none";
  delBtn.style.padding = "4px 8px";
  delBtn.style.borderRadius = "8px";
  delBtn.style.fontSize = "14px";
  delBtn.style.cursor = "pointer";
  delBtn.style.transition = "0.3s ease";

  delBtn.addEventListener("mouseover", () => {
    delBtn.style.background = "#9333ea"; // darker on hover
  });

  delBtn.addEventListener("mouseout", () => {
    delBtn.style.background = "#c084fc"; // original color
  });

  delBtn.addEventListener("click", async () => {
    await fetch(`${API_URL}/${task._id}`, { method: "DELETE" });
    li.remove();
  });

  li.appendChild(delBtn);
  taskList.appendChild(li);
}



loadTasks();
