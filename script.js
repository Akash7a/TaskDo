const form = document.querySelector("form");
const titleInput = document.querySelector("#titleInput");
const main = document.querySelector(".task_container");
const allTasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];

const createTasks = () => {
    allTasks.forEach((task, index) => {
        const tasks = document.createElement("div");
        tasks.classList.add("tasks");

        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.checked = task.completed;
        checkBox.addEventListener("change", () => toggleComplete(index));

        const createdTaskInput = document.createElement("input");
        createdTaskInput.type = "text";
        createdTaskInput.value = task.title;
        createdTaskInput.readOnly = true;
        

        if (task.completed) {
            createdTaskInput.classList.add("completed");
        }

        const updateTaskBtn = document.createElement("button");
        updateTaskBtn.textContent = "📝";
        updateTaskBtn.classList.add("updateBtn");
        updateTaskBtn.addEventListener("click", () => {
            if (createdTaskInput.readOnly) {
                createdTaskInput.readOnly = false;
                createdTaskInput.focus();
                createdTaskInput.select();
                updateTaskBtn.textContent = "✅";
            } else {
                createdTaskInput.readOnly = true;
                updateTaskBtn.textContent = '📝';
                updateTask(index, createdTaskInput.value);
            }
        });
        if(task.completed){
            updateTaskBtn.disabled = true;
        }

        const removeTaskBtn = document.createElement("button");
        removeTaskBtn.textContent = "❌";
        removeTaskBtn.classList.add("removeBtn");
        removeTaskBtn.addEventListener("click", () => removeTask(task.id));

        tasks.appendChild(checkBox);
        tasks.appendChild(createdTaskInput);
        tasks.appendChild(updateTaskBtn);
        tasks.appendChild(removeTaskBtn);
        main.appendChild(tasks);
    });
};

const toggleComplete = (index) => {
    allTasks[index].completed = !allTasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    removePrevTask();
    createTasks();
}
const removeTask = (id) => {
    const taskIndex = allTasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        allTasks.splice(taskIndex, 1);
        localStorage.setItem("tasks", JSON.stringify(allTasks));
        removePrevTask();
        createTasks();
    }
}
const removePrevTask = () => {
    const tasks = document.querySelectorAll(".tasks");
    tasks.forEach((task) => {
        task.remove();
    });
}

const updateTask = (index, newTitle) => {
    allTasks[index].title = newTitle;
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    removePrevTask();
    createTasks();
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (titleInput.value.trim() === "") return;
    removePrevTask();
    allTasks.push({
        id: Date.now(),
        title: titleInput.value,
        completed: false,
    });

    localStorage.setItem("tasks", JSON.stringify(allTasks));
    createTasks();
    titleInput.value = "";
});

createTasks();