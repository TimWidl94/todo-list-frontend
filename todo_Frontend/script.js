let todos = [
    
];

function addTodo(){
    let todoText = todoinput.value;
    todos.push({"title": todoText});
    todoinput.value = ``;
    addToServer(todoText);
    render();
}

function render(){
    todoList.innerHTML = '';
    todos.forEach(todo => todoList.innerHTML += `<li>${todo.title}</li>`);
}

function addToServer(todoText){
    fetch('http://127.0.0.1:3000/todos', {
        body: JSON.stringify({"title": todoText}),
        headers: {"Content-Type": "application/json;charset=UTF-8"},
        method: 'POST'
    });
}

async function loadTodos(){
    const url = `http://localhost:3000/todos`;
    let resp = await fetch(url);
    todos = await resp.json();
    render();
}