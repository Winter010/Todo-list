const input = document.getElementById("task-input");
const tasksList = document.querySelector(".todo-list");
const itemsLeft = document.querySelector(".items-left");

const tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];

console.log(tasksArray);

const updateTaskCount = () =>
	(itemsLeft.innerText = `${tasksArray.length} items left`);

updateTaskCount();

const createTaskElement = task => {
	return `
			<li class="todo-list__item" id="${task.id}">
					<label>
							<input type="checkbox" name="complete-task" />
							<div class="todo-list__checkmark"></div>
							<span>${task.text}</span>
					</label>
					<div class="todo-list__remove-item" data-action="delete"></div>
			</li>
	`;
};

const addTask = event => {
	const taskText = input.value;

	if (event.key === "Enter" && taskText.trim() !== "") {
		const newTask = {
			id: Date.now(),
			text: taskText,
			isDone: false,
		};

		const taskTemplate = createTaskElement(newTask);

		tasksArray.push(newTask);
		tasksList.insertAdjacentHTML("beforeend", taskTemplate);
		input.value = "";

		updateTaskCount();
		localStorage.setItem("tasks", JSON.stringify(tasksArray));
	}
};

const deleteTask = event => {
	if (event.target.dataset.action === "delete") {
		const parentNode = event.target.closest("li");
		const index = tasksArray.findIndex(task => task.id == parentNode.id);
		tasksArray.splice(index, 1);

		parentNode.remove();
		updateTaskCount();
		localStorage.setItem("tasks", JSON.stringify(tasksArray));
	}
};

input.addEventListener("keypress", addTask);
tasksList.addEventListener("click", deleteTask);
