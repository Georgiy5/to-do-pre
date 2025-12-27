
let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks(items) {
	const tasks = localStorage.getItem('array');
	if (tasks) {
		return JSON.parse(tasks);
	}
	return items;
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");
	textElement.textContent = item;
	deleteButton.addEventListener('click', e => {
		clone.remove();
		const items = getTasksFromDOM();
		saveTasks(items);
	})
	duplicateButton.addEventListener('click', e => {
		const itemName = textElement.textContent;
		const newItem = createItem(itemName);
		listElement.prepend(newItem);
		const tasks = getTasksFromDOM();
		saveTasks(tasks)
	})
	editButton.addEventListener('click', e => {
		textElement.setAttribute('contenteditable', 'true');
		textElement.focus()
	})
	textElement.addEventListener('blur', e => {
		textElement.setAttribute('contenteditable', 'false');
		const tasks = getTasksFromDOM();
		saveTasks(tasks);
	})
	return clone;
}

function getTasksFromDOM() {
	const itemsNamesElements = Array.from(document.querySelectorAll('.to-do__item-text'));
	const tasks = [];
	itemsNamesElements.forEach(e => {
		tasks.push(e.textContent);
	})	
	return tasks;

}

function saveTasks(tasks) {
	localStorage.setItem('array', JSON.stringify(tasks))
}

items = loadTasks(items);

items.forEach((item) => {
	const itemElement = createItem(item);
	listElement.appendChild(itemElement);
});

formElement.addEventListener('submit', e => {
	e.preventDefault();
	const text = inputElement.value;
	const item = createItem(text);
	listElement.prepend(item);
	items = getTasksFromDOM();
	saveTasks(items);
	formElement.reset();
})
