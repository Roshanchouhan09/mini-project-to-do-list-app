const taskInput = document.getElementById('input-box');
const addButton = document.getElementById('add-button');
const listcontainer = document.getElementById('todo-list');


//try to load from localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

//create a dom node for a todo object and append it to the list container
function createTodoNode(todo, index) {
    const li = document.createElement('li');

//checkbox to toggle completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;
    li.appendChild(checkbox);

    const textspan = document.createElement('span');
    textspan.textContent = todo.text;
    textspan.style.margin = '0 10px';
    if (todo.completed) textspan.style.textDecoration = 'line-through';
    li.appendChild(textspan);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    li.appendChild(deleteButton);


    checkbox.addEventListener('change', () => {
        todo.completed = checkbox.checked;
        textspan.style.textDecoration = todo.completed ? 'line-through' : 'none';
        saveTodos();
    });

    textspan.addEventListener('dblclick', () => {
        const newtext = prompt('Edit todo:', todo.text);
        if (newtext !== null && newtext.trim() !== '') {
            todo.text = newtext.trim();
            textspan.textContent = todo.text;
            saveTodos();
        }
    });

    deleteButton.addEventListener('click', () => {
        todos.splice(index, 1);
        renderTodos();
        saveTodos();
    });

    return li;
}

function renderTodos() {
    listcontainer.innerHTML = '';
    todos.forEach((todo, index) => {
        listcontainer.appendChild(createTodoNode(todo, index));
    });
}

function addTodo() {
    const text = taskInput.value.trim();
    if (!text) return;
    todos.push({ text, completed: false });
    taskInput.value = '';
    renderTodos();
    saveTodos();
}

addButton.addEventListener('click', addTodo);
taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTodo();
});

renderTodos();