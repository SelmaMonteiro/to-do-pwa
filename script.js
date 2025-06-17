document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const renderTasks = () => {
    taskList.innerHTML = "";
    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.className = `task-item ${task.completed ? "completed" : ""}`;
      li.setAttribute("data-id", task.id);

      const span = document.createElement("span");
      span.textContent = task.text;
      li.appendChild(span);

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.textContent = "Remover";
      li.appendChild(deleteBtn);

      taskList.appendChild(li);
    });
  };

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
      const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
      };
      tasks.push(newTask);
      saveTasks();
      renderTasks();
      taskInput.value = "";
    }
  });

  taskList.addEventListener("click", (e) => {
    const id = e.target.closest(".task-item").getAttribute("data-id");

    if (e.target.classList.contains("delete-btn")) {
      tasks = tasks.filter((task) => task.id != id);
    } else if (e.target.tagName === "SPAN") {
      const task = tasks.find((task) => task.id == id);
      task.completed = !task.completed;
    }

    saveTasks();
    renderTasks();
  });

  renderTasks();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw.js")
      .then((registration) => {
        console.log("Service Worker registrado com sucesso:", registration);
      })
      .catch((error) => {
        console.error("Falha ao registrar o Service Worker:", error);
      });
  });
}
